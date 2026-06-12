// Characterization tests for the homepage/site-wide JSON-LD exports.
// These freeze today's verified-good SEO contract — see plans/003.

import { describe, expect, it } from 'vitest'

import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  whyUsAeoSchema,
  serviceSchemas,
  organizationSchemaJson,
  websiteSchemaJson,
  faqSchemaJson,
  whyUsAeoSchemaJson,
  serviceSchemasJson,
  buildServicesOverviewBreadcrumb,
} from '@/lib/schema'
import { pillars } from '@/components/sections/services-data'

const BASE = 'https://www.metaborong.com'

// Walks an object graph and collects values of URL-bearing keys.
function collectUrls(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) {
    node.forEach((n) => collectUrls(n, out))
  } else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (['url', 'item', 'logo', '@id'].includes(key) && typeof value === 'string') {
        out.push(value)
      }
      if (key === 'sameAs' && Array.isArray(value)) {
        value.forEach((v) => typeof v === 'string' && out.push(v))
      }
      collectUrls(value, out)
    }
  }
  return out
}

describe('lib/schema exports', () => {
  it('organizationSchema has the schema.org context, type, and @id under the site origin', () => {
    expect(organizationSchema['@context']).toBe('https://schema.org')
    expect(organizationSchema['@type']).toBe('Organization')
    expect(organizationSchema['@id']).toBe(`${BASE}/#organization`)
  })

  it('websiteSchema has the schema.org context, type, and @id under the site origin', () => {
    expect(websiteSchema['@context']).toBe('https://schema.org')
    expect(websiteSchema['@type']).toBe('WebSite')
    expect(websiteSchema['@id']).toBe(`${BASE}/#website`)
  })

  it('faqSchema and whyUsAeoSchema are FAQPage nodes with non-empty mainEntity', () => {
    for (const schema of [faqSchema, whyUsAeoSchema]) {
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('FAQPage')
      expect(String(schema['@id']).startsWith(`${BASE}/#`)).toBe(true)
      expect(schema.mainEntity.length).toBeGreaterThan(0)
      for (const q of schema.mainEntity) {
        expect(q['@type']).toBe('Question')
        expect(q.name.length).toBeGreaterThan(0)
        expect(q.acceptedAnswer['@type']).toBe('Answer')
        expect(q.acceptedAnswer.text.length).toBeGreaterThan(0)
      }
    }
  })

  it('serviceSchemas has one Service node per pillar', () => {
    expect(serviceSchemas.length).toBe(pillars.length)
    for (const s of serviceSchemas) {
      expect(s['@context']).toBe('https://schema.org')
      expect(s['@type']).toBe('Service')
      expect(String(s['@id']).startsWith(`${BASE}/#service-`)).toBe(true)
    }
  })

  it('every URL field across all schema exports is absolute https; every @id is under the site origin', () => {
    const urls = collectUrls([organizationSchema, websiteSchema, faqSchema, whyUsAeoSchema, serviceSchemas])
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) {
      expect(url, `non-absolute URL: ${url}`).toMatch(/^https:\/\//)
    }
    const ids = [organizationSchema, websiteSchema, faqSchema, whyUsAeoSchema, ...serviceSchemas]
      .map((s) => s['@id'] as string)
    for (const id of ids) {
      expect(id, `@id not under site origin: ${id}`).toMatch(/^https:\/\/www\.metaborong\.com\//)
    }
  })

  it('each *Json export parses and deep-equals its object counterpart', () => {
    expect(JSON.parse(organizationSchemaJson)).toEqual(organizationSchema)
    expect(JSON.parse(websiteSchemaJson)).toEqual(websiteSchema)
    expect(JSON.parse(faqSchemaJson)).toEqual(faqSchema)
    expect(JSON.parse(whyUsAeoSchemaJson)).toEqual(whyUsAeoSchema)
    expect(serviceSchemasJson.length).toBe(serviceSchemas.length)
    serviceSchemasJson.forEach((entry, i) => {
      expect(entry.id).toBe(serviceSchemas[i]['@id'])
      expect(JSON.parse(entry.json)).toEqual(serviceSchemas[i])
    })
  })

  it('buildServicesOverviewBreadcrumb has sequential positions and absolute items', () => {
    const crumb = buildServicesOverviewBreadcrumb()
    expect(crumb['@context']).toBe('https://schema.org')
    expect(crumb['@type']).toBe('BreadcrumbList')
    crumb.itemListElement.forEach((item, i) => {
      expect(item.position).toBe(i + 1)
      expect(item.item.startsWith(`${BASE}/`)).toBe(true)
    })
  })
})
