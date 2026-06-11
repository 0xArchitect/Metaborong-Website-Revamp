import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

// Site chrome for pillar hubs and leaf service pages. The `/services` index
// mounts its own Nav/Footer, so this layout is scoped to `[pillar]` to avoid
// double-rendering it. The fixed Nav (56px) is cleared by the leaf breadcrumb's
// top padding.
export default function PillarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
