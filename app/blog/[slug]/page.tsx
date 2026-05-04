import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

// Mock database for the purpose of this example
const POSTS = {
  'production-ready-ai-agents': {
    title: 'Building Production-Ready AI Agents: Beyond the Demo',
    description: 'Discover what it takes to transition an AI agent from a fragile demo to a robust, production-ready system capable of handling edge cases.',
    date: '2026-05-01',
    author: 'Soumojit Ash',
    content: `
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        The AI industry is currently saturated with impressive demos that fail when exposed to real-world constraints. Building a wrapper around an LLM API is simple; building an autonomous system that operates reliably without human intervention is an engineering challenge.
      </p>
      <h2 style="font-size: 28px; font-weight: 700; color: #303030; margin-top: 48px; margin-bottom: 20px; letter-spacing: -0.02em;">The Illusion of Reliability</h2>
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        Most agentic systems work under the "happy path" assumption. When inputs are clean and APIs respond quickly, the demo dazzles. However, what happens when an endpoint times out, the context window fills up, or the model hallucinates an invalid JSON payload?
      </p>
      <ul style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px; padding-left: 24px;">
        <li style="margin-bottom: 12px;"><strong>State Management:</strong> Production agents need durable state. If a process crashes mid-execution, it must be able to resume.</li>
        <li style="margin-bottom: 12px;"><strong>Tool Sandboxing:</strong> Giving agents access to write operations requires strict validation boundaries to prevent catastrophic state mutations.</li>
        <li style="margin-bottom: 12px;"><strong>Fallback Heuristics:</strong> Purely non-deterministic systems are risky. Combining LLMs with deterministic rule engines provides necessary guardrails.</li>
      </ul>
      <h2 style="font-size: 28px; font-weight: 700; color: #303030; margin-top: 48px; margin-bottom: 20px; letter-spacing: -0.02em;">Our Approach at Metaborong</h2>
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        At Metaborong, we design AI systems under the assumption that they <em>will</em> fail. By building rigorous retry mechanisms, comprehensive logging, and deterministic fallback paths, we ensure that when an LLM inevitably stumbles, the system as a whole remains stable.
      </p>
    `,
  },
  'scaling-web3-infrastructure': {
    title: 'Scaling Web3 Infrastructure for High-Volume DeFi Protocols',
    description: 'An deep dive into architectural decisions and optimization strategies for DeFi protocols handling millions in daily volume.',
    date: '2026-04-15',
    author: 'Arnab Ray',
    content: `
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        Scaling a DeFi protocol is fundamentally different from scaling Web2 infrastructure. The bottlenecks are not just database reads and writes, but RPC rate limits, blockchain finality, and smart contract execution costs.
      </p>
      <h2 style="font-size: 28px; font-weight: 700; color: #303030; margin-top: 48px; margin-bottom: 20px; letter-spacing: -0.02em;">The RPC Bottleneck</h2>
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        Relying on public RPC nodes for a production DeFi protocol is a guaranteed path to poor user experience. Implementing a load-balanced pool of private nodes, combined with aggressive caching layers (like Redis) for read-heavy operations, is critical.
      </p>
      <blockquote style="border-left: 3px solid #204AF8; padding-left: 20px; margin: 32px 0; font-style: italic; color: #676767;">
        "If your UI depends entirely on real-time chain state reads on every render, your app will feel sluggish. Indexers are not optional; they are mandatory."
      </blockquote>
      <p style="font-size: 17px; line-height: 1.7; color: #4a4a4a; margin-bottom: 24px;">
        By offloading chain-reads to an indexing solution (like The Graph or custom Postgres indexers), we decouple the frontend performance from the underlying blockchain latency.
      </p>
    `,
  }
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = POSTS[params.slug as keyof typeof POSTS]
  if (!post) return { title: 'Post Not Found | Metaborong' }

  return {
    title: \`\${post.title} | Metaborong Blog\`,
    description: post.description,
    alternates: { canonical: \`https://www.metaborong.com/blog/\${params.slug}\` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: \`https://www.metaborong.com/blog/\${params.slug}\`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    }
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = POSTS[params.slug as keyof typeof POSTS]

  if (!post) {
    notFound()
  }

  // SEO Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metaborong',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.metaborong.com/logo.png' // Adjust if needed
      }
    },
    datePublished: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': \`https://www.metaborong.com/blog/\${params.slug}\`
    }
  }

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />
      
      <main style={{ minHeight: '100vh', paddingTop: 56, background: '#fff' }}>
        <article style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px 120px' }}>
          {/* Post Header */}
          <header style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#676767', marginBottom: 24, fontFamily: 'var(--font-brand)' }}>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span>&bull;</span>
              <span>By {post.author}</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.1, color: '#111827',
            }}>
              {post.title}
            </h1>
          </header>

          {/* Post Content */}
          <div 
            style={{ display: 'flex', flexDirection: 'column' }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* Post Footer/Author bio placeholder */}
          <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f5f7ff', border: '1px solid #dde4fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#204AF8', fontSize: 20, flexShrink: 0 }}>
              {post.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#303030', marginBottom: 4 }}>{post.author}</div>
              <div style={{ fontSize: 14, color: '#676767', lineHeight: 1.5 }}>
                Engineering Team at Metaborong. Building robust AI and Web3 systems.
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
