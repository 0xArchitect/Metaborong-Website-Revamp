import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel Blob serves user-uploaded images from a per-store subdomain like
  // `https://<storeId>.public.blob.vercel-storage.com/<path>`. Allow any
  // subdomain of public.blob.vercel-storage.com so next/image can fetch and
  // optimise our uploads. Locked down to https + that exact host suffix so
  // a different upload origin can't be used to circumvent the allowlist.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },

  // SERVICES_PLAN.md § 2 — preserve inbound links for the `ai-agents` → `ai`
  // rename and the two Product Studio slug renames. 308 (permanent) so search
  // engines transfer authority to the new canonical URL. Order matters: list
  // the more-specific leaf redirects before the pillar-level catch-all so the
  // first match wins inside Next's routing.
  async redirects() {
    return [
      // AI taxonomy revamp — reslugged leaves (4 reframed) + 2 dropped stubs.
      {
        source: '/services/ai/ai-audit-opportunity-assessment',
        destination: '/services/ai/ai-consulting',
        permanent: true,
      },
      {
        source: '/services/ai/conversational-agents-assistants',
        destination: '/services/ai/conversational-ai-voice-agents',
        permanent: true,
      },
      {
        source: '/services/ai/agentic-ai-systems',
        destination: '/services/ai/ai-agent-development',
        permanent: true,
      },
      {
        source: '/services/ai/llm-integration-architecture',
        destination: '/services/ai/genai-apis-backend-integration',
        permanent: true,
      },
      {
        source: '/services/ai/ai-education-workshops',
        destination: '/services/ai',
        permanent: true,
      },
      {
        source: '/services/ai/ai-augmented-customer-journeys',
        destination: '/services/ai',
        permanent: true,
      },
      // Legacy `/services/ai-agents/*` → point straight at the new slugs (no chains).
      {
        source: '/services/ai-agents/agentic-ai-systems',
        destination: '/services/ai/ai-agent-development',
        permanent: true,
      },
      {
        source: '/services/ai-agents/rag-knowledge-systems',
        destination: '/services/ai/rag-retrieval-pipelines',
        permanent: true,
      },
      {
        source: '/services/ai-agents/generative-ai-development',
        destination: '/services/ai/genai-apis-backend-integration',
        permanent: true,
      },
      {
        source: '/services/ai-agents/voice-agent-integration',
        destination: '/services/ai/conversational-ai-voice-agents',
        permanent: true,
      },
      {
        source: '/services/ai-agents/ai-systems-integration',
        destination: '/services/ai/genai-apis-backend-integration',
        permanent: true,
      },
      {
        source: '/services/ai-agents/ai-workflow-automation',
        destination: '/services/ai',
        permanent: true,
      },
      {
        source: '/services/ai-agents',
        destination: '/services/ai',
        permanent: true,
      },
      {
        source: '/services/product-studio/mvp-software-development',
        destination: '/services/product-studio/mvp-development',
        permanent: true,
      },
      {
        source: '/services/product-studio/b2b-software-development',
        destination: '/services/product-studio/b2b-multi-tenant-platforms',
        permanent: true,
      },
      {
        source: '/services/web3/web3-tokenomics-design',
        destination: '/services/web3/tokenomics-design',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
