import type { LeafContent } from '@/lib/services/leaf-content'

const content: LeafContent = {
  pillar: 'product-studio',
  slug: 'mobile-app-development',

  heroLede:
    'Your users live on their phones, but a pinch-and-zoom mobile website asks them to work harder and quietly forget you exist. Mobile App Development is the design and engineering of a native-feeling application for iOS and Android, built from a single cross-platform codebase so one team ships to both stores at once - with location, push notifications, and offline behaviour treated as first-class, not afterthoughts.',

  deliverables: [
    {
      label: 'A cross-platform app published to the Apple App Store and Google Play.',
    },
    {
      label: 'One React Native and TypeScript codebase serving both iOS and Android.',
    },
    {
      label: 'Native device integration: location, camera, push notifications, and offline storage.',
    },
    {
      label: 'A backend with your data model, API layer, and authentication.',
    },
    {
      label: 'Store listings, assets, and the submission shepherded through to approval.',
    },
    {
      label: 'Full source in your repository, with IP ownership transferred at handoff.',
    },
  ],

  phases: [
    {
      title: 'Architecture lock',
      body: 'We open with a one-week architecture review. Two senior engineers decide the cross-platform approach, the navigation model, and how the app talks to device hardware and your backend. For Breayz that meant designing how live air-quality readings from public APIs would map onto generated, location-aware collectibles before a single screen was built.',
    },
    {
      title: 'Vertical slices',
      body: 'We build in two-week sprints, each ending with a build you can install on a real device. We ship vertical slices - onboarding, the core screen, then the supporting flows - so the app is testable in your hand from sprint two. You run it on real data and feed the backlog directly before anything is locked.',
    },
    {
      title: 'Device and platform work',
      body: 'Next we wire the parts that separate an app from a web page: location and sensors, push notifications, offline behaviour, and the platform store rules. On Breayz this meant fetching air quality by location, refreshing a collectible’s metadata in one tap when the user moves, and a marketplace for minting and listing them.',
    },
    {
      title: 'Store submission and handoff',
      body: 'The final sprints are release work - performance profiling on low-end devices, store-listing assets, privacy disclosures, and the App Store and Play review gauntlet. We submit on your developer accounts and shepherd both apps to approval. At handoff you receive the repository, the accounts, and a v1.1 backlog ordered by cost-of-delay.',
    },
  ],

  techStack: [
    { name: 'React Native', category: 'Framework' },
    { name: 'Expo', category: 'Tooling' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Firebase', category: 'Push & Analytics' },
    { name: 'Fastlane', category: 'Release Automation' },
    { name: 'GitHub Actions', category: 'CI/CD' },
  ],

  fit: {
    fits: [
      'Your users are on their phones and a mobile browser experience is costing you engagement.',
      'You want one codebase shipping to both the App Store and Google Play, not two separate builds.',
      'Your app needs device features - location, notifications, camera, offline - the web cannot match.',
    ],
    doesNotFit: [
      'A responsive web app would serve your users fine - start with Web Application Development instead.',
      'You need a graphics-heavy 3D game - that is a specialist native engagement, not the work we do.',
      'You already have a live app and need v2 or maintenance work - write to us at /contact instead.',
    ],
  },

  aeoAnswer:
    'Mobile app development is the building of applications for iOS and Android, usually from one cross-platform codebase, for teams who need to reach users on the device they actually use. Metaborong builds these end-to-end with one senior team. We shipped Breayz, an app that turns live air-quality readings into dynamic, location-aware NFT collectibles.',

  keyConcepts: [
    {
      term: 'Cross-platform development',
      definition:
        'Cross-platform development is the practice of building a mobile app once, in a shared codebase, and running it on both iOS and Android rather than writing two separate native apps. Frameworks such as React Native render real native components, so one team ships both stores while keeping a near-native feel.',
    },
    {
      term: 'React Native',
      definition:
        'React Native is an open-source framework that builds mobile apps using React while rendering real native UI components rather than a web view. It lets a single codebase target iOS and Android, and drops down to platform-specific native code whenever a feature needs the extra performance.',
    },
    {
      term: 'Push notification',
      definition:
        'A push notification is a message a server delivers to a device even when the app is closed, through platform services such as Apple Push Notification service and Firebase Cloud Messaging. It is the main channel for re-engaging mobile users without relying on email or them reopening the app themselves.',
    },
    {
      term: 'Over-the-air update',
      definition:
        'An over-the-air update ships JavaScript and asset changes straight to installed apps without a full store review, using tooling such as Expo. It speeds up fixes and small features, while changes to native code still go through the normal App Store and Play submission process.',
    },
  ],

  relatedWork: [
    {
      descriptor: 'Breayz - air-quality awareness app',
      summary:
        'Built around live air-quality data: the app turns a user’s local AQI reading into a dynamic collectible whose metadata refreshes in one tap as they move, with minting and a marketplace built in.',
      href: '/work/',
    },
  ],

  relatedServices: [
    { pillar: 'product-studio', slug: 'web-application-development' },
    { pillar: 'product-studio', slug: 'ux-ui-web-design' },
    { pillar: 'web3', slug: 'nft-marketplace-development' },
  ],

  faqs: [
    {
      question: 'What is mobile app development?',
      answer:
        'Mobile app development is the design and engineering of software that installs and runs on a phone or tablet, for iOS, Android, or both. It covers the screens users tap, the backend that stores their data, the device features the app draws on - location, camera, notifications - and the store submission. Most modern builds use one cross-platform codebase to serve both platforms at once.',
    },
    {
      question: 'Cross-platform or native - which should I choose?',
      answer:
        'For most products, cross-platform wins: one React Native codebase ships to both stores, costs less to build and maintain, and feels native to users. Fully native (Swift or Kotlin) only earns its higher cost when the app is graphics-heavy or leans on bleeding-edge device APIs. We default to cross-platform and tell you honestly when your case is the exception.',
    },
    {
      question: 'How long does it take and what does a mobile app cost?',
      answer:
        'A focused cross-platform app typically runs ten to eighteen weeks from architecture lock to both stores, depending on the number of screens, integrations, and device features. Cost tracks scope and seniority rather than headcount. We give a fixed range after the one-week architecture review, before you commit to the full build, so there are no surprises mid-project.',
    },
    {
      question: 'Do you publish to both the App Store and Google Play?',
      answer:
        'Yes. We submit on your own Apple and Google developer accounts so you own the listings, then shepherd both apps through review - privacy disclosures, store assets, and the rejections that often come on a first submission. You keep full control of the accounts and the source code; we hand over the repository and a release runbook at the end.',
    },
    {
      question: 'When should I build a mobile app instead of a web app?',
      answer:
        'Build a mobile app when you need what only a phone gives you: reliable push notifications, background location, camera and sensors, offline use, or a home-screen icon users return to daily. If your product is mainly read-and-click and works fine in a browser, a web application is faster and cheaper - we will tell you which one your idea actually needs.',
    },
  ],

  lastReviewed: '2026-06-08',
}

export default content
