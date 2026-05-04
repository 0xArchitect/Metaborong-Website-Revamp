import type { Metadata } from 'next'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Insights on Web3 & AI Agents',
  description:
    'Read our latest insights on building production-grade Web3 protocols, AI agents, and custom software.',
  alternates: { canonical: 'https://www.metaborong.com/blog' },
  openGraph: {
    title: 'Blog | Metaborong',
    description: 'Read our latest insights on building production-grade Web3 protocols and AI agents.',
    url: 'https://www.metaborong.com/blog',
  },
}

const POSTS = [
  {
    slug: 'production-ready-ai-agents',
    title: 'Building Production-Ready AI Agents: Beyond the Demo',
    excerpt: 'Discover what it takes to transition an AI agent from a fragile demo to a robust, production-ready system capable of handling edge cases.',
    date: '2026-05-01',
    category: 'AI Agents',
  },
  {
    slug: 'scaling-web3-infrastructure',
    title: 'Scaling Web3 Infrastructure for High-Volume DeFi Protocols',
    excerpt: 'An deep dive into architectural decisions and optimization strategies for DeFi protocols handling millions in daily volume.',
    date: '2026-04-15',
    category: 'Web3 / Blockchain',
  }
]

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      
      <main style={{ minHeight: '100vh', paddingTop: 56 }}>
        {/* Header Section */}
        <header style={{ background: '#f5f7ff', padding: '96px 40px 64px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
              background: '#fff', border: '1px solid #e5e7eb', borderRadius: 4,
              padding: '5px 12px', fontSize: 12, color: '#676767', letterSpacing: '0.02em', width: 'fit-content',
            }}>
              <span style={{ width: 7, height: 7, background: '#204AF8', borderRadius: 2, flexShrink: 0, display: 'inline-block' }} />
              Engineering Blog
            </div>
            <h1 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700,
              letterSpacing: '-0.04em', lineHeight: 1.05, color: '#303030', marginBottom: 16,
            }}>
              Insights on Building <span style={{ color: '#204AF8' }}>Production Systems</span>
            </h1>
            <p style={{ fontSize: 18, color: '#676767', lineHeight: 1.6, maxWidth: 600 }}>
              Technical deep dives, architecture decisions, and hard-earned lessons from building high-stakes AI and Web3 infrastructure.
            </p>
          </div>
        </header>

        {/* Posts List */}
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {POSTS.map(post => (
              <article key={post.slug} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#999999' }}>
                  <span style={{ fontWeight: 600, color: '#204AF8' }}>{post.category}</span>
                  <span>&bull;</span>
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: '#303030', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#204AF8'} onMouseLeave={(e) => e.currentTarget.style.color = '#303030'}>
                    {post.title}
                  </Link>
                </h2>
                <p style={{ fontSize: 16, color: '#676767', lineHeight: 1.65 }}>
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} style={{ fontSize: 14, fontWeight: 600, color: '#204AF8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                  Read Article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
