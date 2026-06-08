import type { LeafContent } from '@/lib/services/leaf-content'

const content: LeafContent = {
  pillar: 'product-studio',
  slug: 'ux-ui-web-design',

  heroLede:
    'Most products lose people not to missing features but to interfaces that feel generic, slow, or confusing. UI/UX & Web Design is the practice of researching how people actually use your product, then designing and building the interface they touch - the flows, the visual language, the components - as a living system your team owns in code, not a static file that drifts out of date the week after handoff.',

  deliverables: [
    {
      label: 'User research and flows that map how people actually move through your product.',
    },
    {
      label: 'A distinctive visual identity: type scale, colour system, spacing, and motion grammar.',
    },
    {
      label: 'A coded component library your engineers build on, not a static design file.',
    },
    {
      label: 'Responsive, accessible screens that hold up from mobile to wide desktop.',
    },
    {
      label: 'Design tokens wired into the codebase so the system stays consistent as it grows.',
    },
    {
      label: 'Full source and design files in your repository, owned by your team at handoff.',
    },
  ],

  phases: [
    {
      title: 'Research and audit',
      body: 'We start by learning how your users actually behave - interviews, a read of any analytics, and an audit of the current interface if one exists. We map the core flows and name the friction before proposing any visuals, so the work solves real usability problems rather than simply refreshing the surface.',
    },
    {
      title: 'Visual direction',
      body: 'We design two or three distinct directions for the key screens and put them in front of you live, not as flat mockups. For Absolveme that meant a dark, atmospheric, almost monastic identity with terminal-style detailing - a look chosen to fit the product, then proven on real screens before we committed to it.',
    },
    {
      title: 'System and build',
      body: 'Once a direction is chosen we build it as a real component library in code, with design tokens for colour, type, and spacing wired in. Screens are responsive and accessibility-checked as they are built. Your engineers work against the same system we design in, so nothing is lost translating from design to production.',
    },
    {
      title: 'Handoff and ownership',
      body: 'We hand over a living system, not a frozen file: the coded components, the tokens, the design source, and the documentation a new designer or engineer needs to extend it. The aim is that your team owns and grows the design after we leave, instead of calling us back for every new screen.',
    },
  ],

  techStack: [
    { name: 'Figma', category: 'Design' },
    { name: 'React', category: 'UI' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Design Tokens', category: 'System' },
    { name: 'Storybook', category: 'Component Docs' },
    { name: 'Radix UI', category: 'Accessibility' },
    { name: 'Framer Motion', category: 'Motion' },
  ],

  fit: {
    fits: [
      'Your product works but feels generic or confusing, and it is costing you conversion or retention.',
      'You want a design system your own engineers can build on, delivered in code, not a static file.',
      'You need a distinctive identity that fits your product, not a template every competitor also uses.',
    ],
    doesNotFit: [
      'You only need a logo and brand collateral - that is a brand-identity studio’s work, not ours.',
      'You want pixel-perfect execution of a finished design with no research or build - hire a contractor.',
      'You need a marketing site in a no-code builder you will edit yourself - a page builder is cheaper.',
    ],
  },

  aeoAnswer:
    'UI/UX and web design is the discipline of researching, designing, and building the interface people interact with, for teams who want a product that is clear, fast, and distinctive rather than generic. Metaborong delivers design as a coded, living system. We designed and built the frontend for Absolveme, a multi-chain Web3 product with a bold, atmospheric visual identity.',

  keyConcepts: [
    {
      term: 'UI design',
      definition:
        'UI design, or user interface design, is the craft of shaping the visual and interactive surface of a product - the layout, typography, colour, and controls a person sees and touches. It focuses on how each screen looks and responds, making the available actions clear and the interface pleasant to use.',
    },
    {
      term: 'UX design',
      definition:
        'UX design, or user experience design, is the practice of structuring how a person moves through a product so reaching their goal feels logical and effortless. It spans research, information architecture, and flows, and is concerned with the whole journey rather than the appearance of any single screen.',
    },
    {
      term: 'Design system',
      definition:
        'A design system is a single source of truth for a product’s interface: reusable components, design tokens, and the rules for using them, kept in sync between design and code. It lets a team build new screens quickly and consistently without redesigning the basics every time.',
    },
    {
      term: 'Design tokens',
      definition:
        'Design tokens are named values for the visual decisions in a design system - colours, spacing, font sizes, radii - stored once and referenced everywhere. Because the interface reads from the tokens rather than hard-coded values, changing a token updates the whole product consistently from a single place.',
    },
  ],

  relatedWork: [
    {
      descriptor: 'Absolveme - Web3 product frontend & design',
      summary:
        'We designed and built the frontend for a multi-chain Web3 product, giving it a bold, dark, atmospheric identity with terminal-style detailing, then handed the coded system to the team to run.',
      href: '/work/',
    },
  ],

  relatedServices: [
    { pillar: 'product-studio', slug: 'web-application-development' },
    { pillar: 'product-studio', slug: 'mobile-app-development' },
    { pillar: 'web3', slug: 'nft-marketplace-development' },
  ],

  faqs: [
    {
      question: 'What is the difference between UI and UX design?',
      answer:
        'UX design is about how a product works - the research, the flows, and the structure that get a user to their goal without friction. UI design is about how it looks and feels at the surface - layout, typography, colour, and the controls on each screen. Good products need both: a clear journey rendered in an interface that is pleasant and obvious to use.',
    },
    {
      question: 'What is a design system and why do I need one?',
      answer:
        'A design system is a shared library of reusable components and design tokens, kept consistent between design and code. You need one once your product has more than a handful of screens: without it, every new feature reinvents buttons, spacing, and colour, and the interface slowly drifts. With one, your team ships new screens quickly and they all look like the same product.',
    },
    {
      question: 'Do you deliver design in code or just Figma files?',
      answer:
        'Both, and the code is the point. We design in Figma, but we hand over a coded component library with design tokens wired into your codebase, plus the source files. A static Figma file drifts out of date the moment engineering starts changing things; a coded system stays the single source of truth your team actually builds against.',
    },
    {
      question: 'How long does a UI/UX engagement take and what does it cost?',
      answer:
        'A focused design-and-build engagement typically runs six to twelve weeks, depending on how many flows and screens it covers and whether we are also building the component library. Cost tracks scope and seniority rather than headcount. We give a fixed range after a short discovery, before you commit, so the budget is clear up front.',
    },
    {
      question: 'Can you redesign our existing product, or only design from scratch?',
      answer:
        'Both. For an existing product we start with an audit - what is working, where users get stuck, and what the current interface costs you - then redesign from evidence rather than taste. For a new product we design from the flows up. Either way you end with a coded design system your team owns, not a one-off facelift.',
    },
  ],

  lastReviewed: '2026-06-08',
}

export default content
