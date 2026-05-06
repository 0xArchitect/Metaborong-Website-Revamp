'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ApiError, NetworkError, api } from '@/lib/api-client'
import {
  contentJsonSchema,
  slugRegex,
  tagRegex,
  validateContentJson,
  type Block,
  type Post,
} from '@/lib/blog-schema'
import { EditorShell } from '@/components/admin/editor/editor-shell'

type SaveState =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'saved'; at: number }
  | { kind: 'error'; message: string }

type Field = 'title' | 'slug' | 'excerpt' | 'tags' | 'author_name' | 'author_url' | 'meta_title' | 'meta_description' | 'cover_image_id' | 'og_image_id' | 'content_json'

interface FormState {
  title: string
  slug: string
  excerpt: string
  tagsText: string  // comma-separated input; serialized to string[] before save
  author_name: string
  author_url: string
  meta_title: string
  meta_description: string
  cover_image_id: string
  og_image_id: string
  // The Tiptap editor owns the canonical Block[] state — held outside
  // FormState so editor re-renders don't rebuild every form input.
}

function postToFormState(p: Post): FormState {
  return {
    title:            p.title,
    slug:             p.slug,
    excerpt:          p.excerpt ?? '',
    tagsText:         p.tags.join(', '),
    author_name:      p.author_name,
    author_url:       p.author_url ?? '',
    meta_title:       p.meta_title ?? '',
    meta_description: p.meta_description ?? '',
    cover_image_id:   p.cover_image_id ?? '',
    og_image_id:      p.og_image_id ?? '',
  }
}

interface ValidationResult {
  ok: boolean
  errors: Partial<Record<Field, string>>
  parsedContent?: Block[]
  parsedTags?: string[]
}

function validate(state: FormState, blocks: Block[]): ValidationResult {
  const errors: Partial<Record<Field, string>> = {}

  const title = state.title.trim()
  if (!title) errors.title = 'Title is required.'
  else if (title.length > 200) errors.title = 'Title must be 200 characters or fewer.'
  else if (title !== state.title) errors.title = 'Title cannot have leading or trailing whitespace.'

  const slug = state.slug.trim()
  if (!slug) errors.slug = 'Slug is required.'
  else if (slug.length > 80) errors.slug = 'Slug must be 80 characters or fewer.'
  else if (!slugRegex.test(slug)) errors.slug = 'Slug must be lowercase alphanumeric segments separated by single hyphens.'

  let parsedTags: string[] | undefined
  if (state.tagsText.trim()) {
    parsedTags = state.tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    if (parsedTags.length > 10) errors.tags = 'At most 10 tags.'
    else {
      for (const t of parsedTags) {
        if (!tagRegex.test(t)) {
          errors.tags = `Tag "${t}" must be lowercase alphanumeric with hyphens only.`
          break
        }
      }
    }
  } else {
    parsedTags = []
  }

  if (!state.author_name.trim()) errors.author_name = 'Author name is required.'
  if (state.author_url.trim()) {
    try { new URL(state.author_url.trim()) } catch { errors.author_url = 'Author URL must be a valid URL.' }
  }

  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (state.cover_image_id.trim() && !uuidRe.test(state.cover_image_id.trim())) {
    errors.cover_image_id = 'Cover image ID must be a UUID.'
  }
  if (state.og_image_id.trim() && !uuidRe.test(state.og_image_id.trim())) {
    errors.og_image_id = 'OG image ID must be a UUID.'
  }

  // Validate the Tiptap-emitted Block[] against the canonical Zod schema
  // BEFORE submitting. The editor can briefly hold an empty heading or an
  // image without alt; both are caught here so save is blocked with an
  // inline error rather than bouncing off the BE 422.
  const parse = contentJsonSchema.safeParse(blocks)
  let parsedContent: Block[] | undefined
  if (!parse.success) {
    const issue = parse.error.issues[0]
    const path = issue?.path?.join('.') || ''
    errors.content_json = path
      ? `Block ${path}: ${issue.message}`
      : `Block schema error: ${issue?.message ?? 'invalid'}`
  } else {
    parsedContent = parse.data
    const enforce = validateContentJson(parsedContent)
    if (!enforce.ok) errors.content_json = enforce.message
  }

  return { ok: Object.keys(errors).length === 0, errors, parsedContent, parsedTags }
}

interface Props {
  initialPost: Post
}

export function EditPostForm({ initialPost }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const [state, setState] = useState<FormState>(() => postToFormState(initialPost))
  const [post, setPost] = useState<Post>(initialPost)
  const [blocks, setBlocks] = useState<Block[]>(initialPost.content_json)
  const [save, setSave] = useState<SaveState>({ kind: 'idle' })
  const [statusBusy, setStatusBusy] = useState<'publish' | 'unpublish' | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteBusy, setDeleteBusy] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [confirmSlug, setConfirmSlug] = useState('')
  const [savedToastAt, setSavedToastAt] = useState(0)

  const dirty = useMemo(() => {
    const baseline = postToFormState(post)
    if (JSON.stringify(state) !== JSON.stringify(baseline)) return true
    return JSON.stringify(blocks) !== JSON.stringify(post.content_json)
  }, [state, post, blocks])

  const validation = useMemo(() => validate(state, blocks), [state, blocks])
  const slugLocked = post.status === 'published' || !!post.published_at

  // Autosave: debounced 2s after the last edit. Skips if validation fails
  // so the textarea's red border + inline error are the user's signal,
  // not a noisy server 422.
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!dirty || !validation.ok) return
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
    autosaveTimerRef.current = setTimeout(() => {
      void runSave({ silent: true })
    }, 2000)
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, dirty, validation.ok])

  // Browser unload guard — warn if navigating away with unsaved changes.
  useEffect(() => {
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (!dirty) return
      e.preventDefault()
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  // Global Cmd/Ctrl+S → save now. The editor pane also binds this for
  // when focus is inside Tiptap; we mirror it at window-level for the
  // form fields above.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 's') {
        e.preventDefault()
        void runSave()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation.ok, dirty])

  const setField = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }))
    },
    [],
  )

  async function runSave({ silent = false }: { silent?: boolean } = {}): Promise<boolean> {
    if (!validation.ok) {
      if (!silent) setSave({ kind: 'error', message: 'Fix the highlighted fields before saving.' })
      return false
    }
    setSave({ kind: 'saving' })
    const patch: Partial<Post> = {
      title:             state.title,
      excerpt:           state.excerpt.trim() || null,
      tags:              validation.parsedTags ?? [],
      author_name:       state.author_name.trim(),
      author_url:        state.author_url.trim() || null,
      meta_title:        state.meta_title.trim() || null,
      meta_description: state.meta_description.trim() || null,
      cover_image_id:    state.cover_image_id.trim() || null,
      og_image_id:       state.og_image_id.trim() || null,
      content_json:      validation.parsedContent ?? [],
    }
    if (!slugLocked) patch.slug = state.slug.trim()

    try {
      const res = await api.patch<{ post: Post }>(`/api/admin/posts/${post.id}`, patch)
      setPost(res.post)
      setState(postToFormState(res.post))
      setBlocks(res.post.content_json)
      setSave({ kind: 'saved', at: Date.now() })
      setSavedToastAt(Date.now())
      return true
    } catch (err) {
      const message =
        err instanceof NetworkError ? 'Network error, try again.' :
        err instanceof ApiError ? err.message :
        'Save failed.'
      setSave({ kind: 'error', message })
      return false
    }
  }

  async function handlePublish() {
    if (statusBusy) return
    if (!validation.ok) {
      setSave({ kind: 'error', message: 'Fix the highlighted fields before publishing.' })
      return
    }
    if (dirty) {
      const ok = await runSave({ silent: true })
      if (!ok) return
    }
    setStatusBusy('publish')
    const prevStatus = post.status
    setPost((p) => ({ ...p, status: 'published' }))
    try {
      const res = await api.post<{ post: Post }>(`/api/admin/posts/${post.id}/publish`)
      setPost(res.post)
      setState(postToFormState(res.post))
      setBlocks(res.post.content_json)
      router.refresh()
    } catch (err) {
      setPost((p) => ({ ...p, status: prevStatus }))
      const message =
        err instanceof NetworkError ? 'Network error, try again.' :
        err instanceof ApiError ? err.message :
        'Publish failed.'
      setSave({ kind: 'error', message })
    } finally {
      setStatusBusy(null)
    }
  }

  async function handleUnpublish() {
    if (statusBusy) return
    setStatusBusy('unpublish')
    const prevStatus = post.status
    setPost((p) => ({ ...p, status: 'draft' }))
    try {
      const res = await api.post<{ post: Post }>(`/api/admin/posts/${post.id}/unpublish`)
      setPost(res.post)
      setState(postToFormState(res.post))
      setBlocks(res.post.content_json)
      router.refresh()
    } catch (err) {
      setPost((p) => ({ ...p, status: prevStatus }))
      const message =
        err instanceof NetworkError ? 'Network error, try again.' :
        err instanceof ApiError ? err.message :
        'Unpublish failed.'
      setSave({ kind: 'error', message })
    } finally {
      setStatusBusy(null)
    }
  }

  async function handleDelete() {
    if (deleteBusy) return
    if (confirmSlug.trim() !== post.slug) return
    setDeleteBusy(true)
    setDeleteError(null)
    try {
      await api.delete<{ ok: true }>(`/api/admin/posts/${post.id}`)
      startTransition(() => {
        router.push('/admin')
        router.refresh()
      })
    } catch (err) {
      const message =
        err instanceof NetworkError ? 'Network error, try again.' :
        err instanceof ApiError ? err.message :
        'Delete failed.'
      setDeleteError(message)
      setDeleteBusy(false)
    }
  }

  const errs = validation.errors

  return (
    <>
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-[16px]">
        <SaveIndicator state={save} dirty={dirty} validationOk={validation.ok} onRetry={() => runSave()} />
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex h-[26px] items-center rounded-sm border px-2 text-[10px] font-medium uppercase tracking-[0.12em] ${
              post.status === 'published'
                ? 'border-[#10b981]/30 bg-[#ecfdf5] text-[#047857]'
                : 'border-border bg-bg-subtle text-gray'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
            role="status"
            aria-label={`Status: ${post.status}`}
          >
            {post.status}
          </span>
          {post.status === 'published' ? (
            <button
              type="button"
              onClick={handleUnpublish}
              disabled={statusBusy !== null}
              className="inline-flex h-[36px] items-center rounded-md border border-border bg-white px-3 text-[13px] font-medium text-dark transition-colors duration-150 hover:border-brand/30 disabled:opacity-60 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {statusBusy === 'unpublish' ? 'Unpublishing…' : 'Unpublish'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              disabled={statusBusy !== null || !validation.ok}
              className="inline-flex h-[36px] items-center rounded-md bg-brand px-3 text-[13px] font-semibold text-white transition-opacity duration-150 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {statusBusy === 'publish' ? 'Publishing…' : 'Publish'}
            </button>
          )}
          <button
            type="button"
            onClick={() => runSave()}
            disabled={save.kind === 'saving' || !dirty || !validation.ok}
            className="inline-flex h-[36px] items-center rounded-md border border-border bg-white px-3 text-[13px] font-medium text-dark transition-colors duration-150 hover:border-brand/30 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {save.kind === 'saving' ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => { setShowDelete(true); setConfirmSlug('') }}
            className="inline-flex h-[36px] items-center rounded-md border border-transparent px-3 text-[13px] font-medium text-gray transition-colors duration-150 hover:border-[#fda29b] hover:text-[#b42318] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Delete
          </button>
        </div>
      </div>

      {savedToastAt > 0 && save.kind === 'saved' ? (
        <div role="status" aria-live="polite" className="rounded-md border border-[#10b981]/30 bg-[#ecfdf5] px-3 py-2 text-[12px] tracking-[-0.005em] text-[#047857]">
          Saved {relativeTime(save.at)}
        </div>
      ) : null}

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-[20px] rounded-xl border border-border bg-white p-[24px] md:grid-cols-2">
        <Field label="Title" id="f-title" error={errs.title}>
          <input
            id="f-title"
            type="text"
            maxLength={200}
            value={state.title}
            onChange={(e) => setField('title', e.target.value)}
            className={inputClass(!!errs.title)}
          />
        </Field>

        <Field
          label="Slug"
          id="f-slug"
          error={errs.slug}
          hint={slugLocked ? 'Slug locked — this post is published.' : '/blog/<slug>'}
        >
          <input
            id="f-slug"
            type="text"
            value={state.slug}
            onChange={(e) => setField('slug', e.target.value)}
            disabled={slugLocked}
            aria-readonly={slugLocked || undefined}
            className={inputClass(!!errs.slug, slugLocked)}
          />
        </Field>

        <Field label="Excerpt" id="f-excerpt" error={errs.excerpt} className="md:col-span-2">
          <textarea
            id="f-excerpt"
            rows={3}
            value={state.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            className={textareaClass(false)}
          />
        </Field>

        <Field label="Tags" id="f-tags" error={errs.tags} hint="Comma-separated. lowercase-with-hyphens.">
          <input
            id="f-tags"
            type="text"
            value={state.tagsText}
            onChange={(e) => setField('tagsText', e.target.value)}
            placeholder="defi, web3, custody"
            className={inputClass(!!errs.tags)}
          />
        </Field>

        <Field label="Author name" id="f-author" error={errs.author_name}>
          <input
            id="f-author"
            type="text"
            value={state.author_name}
            onChange={(e) => setField('author_name', e.target.value)}
            className={inputClass(!!errs.author_name)}
          />
        </Field>

        <Field label="Author URL" id="f-author-url" error={errs.author_url}>
          <input
            id="f-author-url"
            type="url"
            value={state.author_url}
            onChange={(e) => setField('author_url', e.target.value)}
            placeholder="https://"
            className={inputClass(!!errs.author_url)}
          />
        </Field>

        <Field label="Meta title" id="f-meta-title" error={errs.meta_title}>
          <input
            id="f-meta-title"
            type="text"
            value={state.meta_title}
            onChange={(e) => setField('meta_title', e.target.value)}
            className={inputClass(!!errs.meta_title)}
          />
        </Field>

        <Field label="Meta description" id="f-meta-desc" error={errs.meta_description}>
          <input
            id="f-meta-desc"
            type="text"
            value={state.meta_description}
            onChange={(e) => setField('meta_description', e.target.value)}
            className={inputClass(!!errs.meta_description)}
          />
        </Field>

        <Field
          label="Cover image ID"
          id="f-cover"
          error={errs.cover_image_id}
          hint="UUID. Image picker UI lands in M4."
        >
          <input
            id="f-cover"
            type="text"
            value={state.cover_image_id}
            onChange={(e) => setField('cover_image_id', e.target.value)}
            placeholder="00000000-0000-0000-0000-000000000000"
            className={inputClass(!!errs.cover_image_id)}
          />
        </Field>

        <Field
          label="OG image ID"
          id="f-og"
          error={errs.og_image_id}
          hint="UUID. Falls back to cover when unset."
        >
          <input
            id="f-og"
            type="text"
            value={state.og_image_id}
            onChange={(e) => setField('og_image_id', e.target.value)}
            placeholder="00000000-0000-0000-0000-000000000000"
            className={inputClass(!!errs.og_image_id)}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center justify-between">
          <p
            className="text-[12px] font-medium uppercase tracking-[0.08em] text-gray"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Content
          </p>
          {errs.content_json ? (
            <p role="alert" className="text-[12px] text-[#b42318] tracking-[-0.005em]">{errs.content_json}</p>
          ) : (
            <p className="text-[11px] text-gray-light tracking-[-0.005em]">Type / to insert a block.</p>
          )}
        </div>
        <EditorShell
          basePost={post}
          initialBlocks={post.content_json}
          onBlocksChange={setBlocks}
          onSaveShortcut={() => { void runSave() }}
          liveOverlay={{
            title: state.title,
            excerpt: state.excerpt.trim() || null,
            tags: validation.parsedTags ?? post.tags,
            author_name: state.author_name.trim() || post.author_name,
            author_url: state.author_url.trim() || null,
            meta_title: state.meta_title.trim() || null,
            meta_description: state.meta_description.trim() || null,
            cover_image_id: state.cover_image_id.trim() || null,
            og_image_id: state.og_image_id.trim() || null,
          }}
        />
      </div>

      {showDelete ? (
        <DeleteModal
          slug={post.slug}
          confirmSlug={confirmSlug}
          onTyped={setConfirmSlug}
          busy={deleteBusy}
          error={deleteError}
          onCancel={() => { if (!deleteBusy) setShowDelete(false) }}
          onConfirm={handleDelete}
        />
      ) : null}
    </>
  )
}

// ── Tiny presentational helpers ─────────────────────────────────────────────

function Field({
  label, id, hint, error, children, className,
}: {
  label: string
  id: string
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-[6px] ${className ?? ''}`}>
      <label
        htmlFor={id}
        className="text-[12px] font-medium uppercase tracking-[0.08em] text-gray"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[12px] text-[#b42318] tracking-[-0.005em]">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-gray-light tracking-[-0.005em]">{hint}</p>
      ) : null}
    </div>
  )
}

function inputClass(invalid: boolean, locked: boolean = false): string {
  return [
    'h-[40px] w-full rounded-md border bg-white px-3 text-[14px] tracking-[-0.005em] text-dark',
    'transition-colors duration-150 placeholder:text-gray-light',
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    invalid ? 'border-[#b42318]' : 'border-border hover:border-brand/30',
    locked ? 'cursor-not-allowed bg-bg-subtle text-gray' : '',
  ].join(' ')
}

function textareaClass(invalid: boolean): string {
  return [
    'w-full rounded-md border bg-white px-3 py-2 text-[14px] tracking-[-0.005em] text-dark',
    'transition-colors duration-150 placeholder:text-gray-light',
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    invalid ? 'border-[#b42318]' : 'border-border hover:border-brand/30',
  ].join(' ')
}

function relativeTime(at: number): string {
  const delta = Math.max(0, Date.now() - at)
  const sec = Math.floor(delta / 1000)
  if (sec < 5) return 'just now'
  if (sec < 60) return `${sec}s ago`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  return `${hr}h ago`
}

function SaveIndicator({
  state, dirty, validationOk, onRetry,
}: {
  state: SaveState
  dirty: boolean
  validationOk: boolean
  onRetry: () => void
}) {
  const [, force] = useState(0)
  useEffect(() => {
    if (state.kind !== 'saved') return
    const id = setInterval(() => force((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [state.kind])

  if (state.kind === 'error') {
    return (
      <div role="alert" className="flex items-center gap-2 text-[12px] text-[#b42318] tracking-[-0.005em]">
        <span className="inline-block h-2 w-2 rounded-full bg-[#b42318]" aria-hidden="true" />
        {state.message}
        <button
          type="button"
          onClick={onRetry}
          className="ml-2 rounded-md border border-[#fda29b] px-2 py-[2px] text-[11px] font-semibold text-[#b42318] hover:bg-[#fef3f2] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Retry
        </button>
      </div>
    )
  }
  if (state.kind === 'saving') {
    return (
      <div className="flex items-center gap-2 text-[12px] text-gray tracking-[-0.005em]">
        <span aria-hidden="true" className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-gray/30 border-t-gray" />
        Saving…
      </div>
    )
  }
  if (state.kind === 'saved') {
    return (
      <div className="flex items-center gap-2 text-[12px] text-gray tracking-[-0.005em]">
        <span className="inline-block h-2 w-2 rounded-full bg-[#10b981]" aria-hidden="true" />
        Saved {relativeTime(state.at)}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 text-[12px] text-gray-light tracking-[-0.005em]">
      <span className="inline-block h-2 w-2 rounded-full bg-gray-subtle" aria-hidden="true" />
      {dirty ? 'Unsaved changes' : validationOk ? 'Up to date' : 'Fix validation errors to save'}
    </div>
  )
}

function DeleteModal({
  slug, confirmSlug, onTyped, busy, error, onCancel, onConfirm,
}: {
  slug: string
  confirmSlug: string
  onTyped: (v: string) => void
  busy: boolean
  error: string | null
  onCancel: () => void
  onConfirm: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !busy) onCancel()
      if (e.key === 'Tab') {
        const order = [inputRef.current, cancelRef.current, confirmRef.current].filter(Boolean) as HTMLElement[]
        if (!order.length) return
        const idx = order.indexOf(document.activeElement as HTMLElement)
        if (idx < 0) return
        e.preventDefault()
        const next = (idx + (e.shiftKey ? -1 : 1) + order.length) % order.length
        order[next].focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [busy, onCancel])

  const matches = confirmSlug.trim() === slug

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="edit-delete-title" className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/60 px-4">
      <div className="w-full max-w-[440px] rounded-xl border border-border bg-white p-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
        <h2 id="edit-delete-title" className="mb-[6px] text-[18px] font-bold tracking-[-0.025em] text-dark">
          Delete this post?
        </h2>
        <p className="mb-[20px] text-[14px] leading-[1.5] text-gray tracking-[-0.005em]">
          This is permanent. To confirm, type the slug{' '}
          <code className="rounded-sm bg-bg-subtle px-1 py-[1px] text-[12px] text-dark" style={{ fontFamily: 'var(--font-mono)' }}>{slug}</code>{' '}
          below.
        </p>
        <input
          ref={inputRef}
          type="text"
          value={confirmSlug}
          onChange={(e) => onTyped(e.target.value)}
          aria-label="Type the slug to confirm"
          className="mb-[12px] h-[40px] w-full rounded-md border border-border bg-white px-3 text-[14px] tracking-[-0.005em] text-dark placeholder:text-gray-light focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          placeholder={slug}
        />
        {error ? (
          <div role="alert" className="mb-[12px] rounded-md border border-[#fda29b] bg-[#fef3f2] px-3 py-2 text-[12px] text-[#b42318] tracking-[-0.005em]">
            {error}
          </div>
        ) : null}
        <div className="flex justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="inline-flex h-[36px] items-center rounded-md border border-border bg-white px-3 text-[13px] font-medium text-dark transition-colors duration-150 hover:border-brand/30 disabled:opacity-60 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            disabled={busy || !matches}
            className="inline-flex h-[36px] items-center rounded-md bg-[#b42318] px-3 text-[13px] font-semibold text-white transition-opacity duration-150 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
