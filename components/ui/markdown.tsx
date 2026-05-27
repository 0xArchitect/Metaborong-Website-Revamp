import React from 'react'
import { fromMarkdown } from 'mdast-util-from-markdown'

export function Markdown({ content }: { content: string }) {
  const tree = fromMarkdown(content)

  function renderNode(node: any, index: number): React.ReactNode {
    switch (node.type) {
      case 'root':
        return <>{node.children.map((c: any, i: number) => renderNode(c, i))}</>
      case 'paragraph':
        return (
          <p key={index} className="mb-[28px] text-[17px] sm:text-[18px] leading-[1.75] text-dark/80 tracking-[-0.015em] font-medium">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </p>
        )
      case 'heading':
        const HeadingTag = `h${node.depth}` as any
        const classes =
          node.depth === 2
            ? 'mt-[64px] mb-[24px] text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.025em] text-dark'
            : 'mt-[40px] mb-[16px] text-[20px] font-bold tracking-[-0.02em] text-dark'
        return (
          <HeadingTag key={index} className={classes}>
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </HeadingTag>
        )
      case 'text':
        return node.value
      case 'strong':
        return (
          <strong key={index} className="font-bold text-dark">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </strong>
        )
      case 'emphasis':
        return (
          <em key={index} className="italic text-dark">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </em>
        )
      case 'list':
        const ListTag = node.ordered ? 'ol' : 'ul'
        return (
          <ListTag key={index} className="mb-[28px] pl-[24px] list-disc flex flex-col gap-[12px] text-[17px] sm:text-[18px] leading-[1.75] text-dark/80 font-medium tracking-[-0.015em]">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </ListTag>
        )
      case 'listItem':
        return (
          <li key={index} className="pl-[8px]">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </li>
        )
      case 'link':
        return (
          <a key={index} href={node.url} className="text-brand underline decoration-brand/30 hover:decoration-brand transition-colors">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </a>
        )
      default:
        // Ignore unrecognized nodes like HTML comments for safety.
        return null
    }
  }

  return <div className="markdown-body">{renderNode(tree, 0)}</div>
}
