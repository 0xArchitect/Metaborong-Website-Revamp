import { Boxes, Brain, LayoutGrid } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PillarCard } from "@/components/ui/pillar-card";

export function ServicesSection() {
  return (
    <section className="section-pad" style={{ background: "var(--color-ink)" }}>
      <div className="container-x">
        <SectionHeader
          theme="dark"
          eyebrow="WHAT WE BUILD"
          title="Three pillars. One studio."
          body="Metaborong builds Web3 platforms, AI agents for blockchain, and zero-to-one products from a single delivery-focused team."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3 grid-cols-1">
          <PillarCard
            pillar="WEB3"
            pillarColor="var(--color-accent)"
            icon={Boxes}
            title="Web3 Development"
            description="DeFi protocols, decentralised exchanges, lending platforms, custom wallets, and token launches — built secure, audited, and ready for mainnet."
            services={["DeFi protocols", "DEX & lending", "Crypto wallets", "Token & smart contracts", "Web3 consulting"]}
            href="/services/web3/"
            ctaLabel="Explore Web3"
          />

          <PillarCard
            pillar="AI"
            pillarColor="var(--color-accent-2)"
            icon={Brain}
            title="AI Agent Development"
            description="Autonomous agents for DeFi automation, AI-powered smart contract auditing, and AI-driven governance — the AI-in-Web3 frontier neither legacy agency owns."
            services={["AI agents for DeFi", "AI smart contract audit", "AI DAO governance", "AI trading agents", "Agentic workflows"]}
            href="/services/ai-agents/"
            ctaLabel="Explore AI Agents"
          />

          <PillarCard
            pillar="PRODUCT"
            pillarColor="var(--color-brand)"
            icon={LayoutGrid}
            title="Product Studio"
            description="Founders bring an idea, Metaborong ships it. Telegram MiniApps, SaaS products, Web2-to-Web3 migrations, and design-led product launches."
            services={["Telegram MiniApps", "SaaS products", "Web2 → Web3 migration", "Design + product strategy", "Founding-team execution"]}
            href="/services/product-studio/"
            ctaLabel="Explore Product Studio"
          />
        </div>
      </div>
    </section>
  );
}
