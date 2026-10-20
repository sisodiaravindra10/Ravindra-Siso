// Every visible string lives here. Nothing is invented: launches, ranks, points, dates and
// case facts come from the current ravindra-siso.vercel.app and the written case studies.
import type { ImageMetadata } from 'astro';
import portrait from '../assets/photos/portrait.jpg';
import jodhpur from '../assets/photos/jodhpur.jpg';
import bike from '../assets/photos/bike.jpg';
import chitReceipt from '../assets/shots/chit-receipt.png';
import chitDark from '../assets/shots/chit-dark.png';
import receipt from '../assets/shots/receipt.png';
import crewUi from '../assets/shots/crew-ui.png';
import crewSpecies from '../assets/shots/crew-species.png';
import notchUi from '../assets/shots/notch-ui.png';
import workZopSite from '../assets/shots/work-zopdev-site.png';
import workZopKit from '../assets/shots/work-zopdev-brandkit.png';
import workYes from '../assets/shots/work-yesbank.png';
import workCeat from '../assets/shots/work-ceat.png';

export const site = {
  name: 'Ravindra Sisodia',
  first: 'Ravindra',
  last: 'Sisodia',
  role: 'Designer and AI engineer',
  titleRole: 'designer and AI engineer',
  url: 'https://ravindra-siso.vercel.app',
  description:
    'Ravindra Sisodia designs brands and builds the apps they live inside. Three Mac apps in Product Hunt top tens, product design for Zop.Dev and YES Bank.',
  email: 'sisodia.ravindra10@gmail.com',
  based: 'Bengaluru, India',
  origin: { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243, tz: 'Asia/Kolkata' },
  socials: [
    { label: 'Instagram', handle: '@ravindrasiso', href: 'https://www.instagram.com/ravindrasiso/' },
    { label: 'GitHub', handle: 'sisodiaravindra10', href: 'https://github.com/sisodiaravindra10' },
    { label: 'LinkedIn', handle: 'ravindra-sisodia', href: 'https://www.linkedin.com/in/ravindra-sisodia/' },
    { label: 'Dribbble', handle: 'sisodiaravindra', href: 'https://dribbble.com/sisodiaravindra' },
    { label: 'Behance', handle: 'ravindrasisodia', href: 'https://www.behance.net/ravindrasisodia' },
  ],
  nav: [
    { label: 'Work', href: '/work/' },
    { label: 'Story', href: '/#story' },
    { label: 'Contact', href: '/#contact' },
  ],
  photos: { portrait, jodhpur, bike },
};

export const hero = {
  meta: 'Designer and AI engineer. I build brands, and the apps they live inside.',
  where: 'Jodhpur-born, Bengaluru-based.',
  proof: 'Three Mac apps, three Product Hunt top tens, seven weeks.',
  cta: 'Email me',
};

export type Launch = {
  slug: string;
  rank: number;
  title: string;
  one: string;
  body: string;
  stack: string[];
  points: number;
  week: string;
  date: string;
  dateLabel: string;
  siteHref: string;
  phHref: string;
  image: ImageMetadata;
  imageAlt: string;
  extra?: string;
};

export const launches: Launch[] = [
  {
    slug: 'chit',
    rank: 3,
    title: 'Chit',
    one: 'A printed receipt of your day in Claude Code.',
    body: 'Parses the session transcripts Claude Code writes to disk and prints what you shipped, grouped by project and ready to paste.',
    stack: ['Swift', 'Transcript parsing', '777 KB, no network'],
    points: 226,
    week: '#26 of the week',
    date: '2026-09-26',
    dateLabel: 'Sep 26, 2026',
    siteHref: 'https://chit.zopcloud.zop.dev/',
    phHref: 'https://www.producthunt.com/products/chit-2',
    image: chitReceipt,
    imageAlt: "Chit's receipt window listing a day of Claude Code work by project",
  },
  {
    slug: 'crew',
    rank: 7,
    title: 'Crew',
    one: 'A tiny crew of monsters for your Claude Code agents.',
    body: 'Listens to Claude Code hook events and gives every running chat and subagent its own pixel monster along the bottom of your screen.',
    stack: ['SwiftUI', 'Claude Code hooks', 'Multi-agent tracking'],
    points: 141,
    week: '#45 of the week',
    date: '2026-08-07',
    dateLabel: 'Aug 7, 2026',
    siteHref: 'https://crew-deskmates.vercel.app/crew/',
    phHref: 'https://www.producthunt.com/products/crew-a-tiny-crew-for-claude-code',
    image: crewUi,
    imageAlt: 'A Crew monster waiting under a permission bubble that reads Bash, git push origin main, with Allow and Deny buttons',
  },
  {
    slug: 'notchling',
    rank: 8,
    title: 'Notchling',
    one: 'A little creature that lives in your MacBook notch.',
    body: 'Follows your cursor, dozes when you go idle, and carries any file you drop into its mouth. Live weather, drawn frame by frame.',
    stack: ['SwiftUI', 'Canvas and TimelineView', 'Drag and drop'],
    points: 138,
    week: '#53 of the week',
    date: '2026-09-01',
    dateLabel: 'Sep 1, 2026',
    siteHref: 'https://notchling.zopcloud.zop.dev/',
    phHref: 'https://www.producthunt.com/products/notchling-lives-in-your-notch',
    image: notchUi,
    imageAlt: 'Notchling peering out of the MacBook notch with three dropped files on its shelf',
    extra: 'Product Hunt newsletter',
  },
];

export const ships = {
  title: 'The launches are the output. The system behind them is the real work.',
  items: [
    {
      head: 'My own design skill',
      text: '/rav is a Claude Code skill with a core spec and eight reference playbooks for layout, motion, colour and copy. It carries my taste into every build.',
      href: 'https://rav-skill.zopcloud.zop.dev',
    },
    {
      head: 'Hooks, not polling',
      text: "Crew wires Claude Code's UserPromptSubmit, Stop, PreToolUse and SubagentStop events into one shell script, so every chat and subagent appears the moment it starts.",
    },
    {
      head: 'Agents that review agents',
      text: "Notchling's weather scenes went through an eight-agent panel: one subagent per screenshot plus a coherence judge, scoring against a written brief before release.",
    },
    {
      head: 'Transcripts as data',
      text: "Chit and my daily worklog read Claude Code's own session transcripts, so the record of what I shipped writes itself every evening.",
    },
  ],
};

export type Work = {
  n: string;
  title: string;
  kind: string;
  year: string;
  href?: string;       // external
  slug?: string;       // internal case page
  preview?: string;    // public path for the cursor preview
  featured?: boolean;
};

// Order is his: the twelve from the current site, then the written Zop.Dev cases, then the launches.
export const works: Work[] = [
  { n: '01', title: 'Zop.Dev marketing site', kind: 'Brand, web', year: '2026', href: 'https://zop-dev-website-v3.vercel.app/', slug: 'zopdev-homepage', preview: '/img/previews/zopdev-site.jpg', featured: true },
  { n: '02', title: 'Zop.Dev brand kit', kind: 'Brand, identity', year: '2026', href: 'https://zop-dev-brandkit-v1.vercel.app/', slug: 'brand-kit', preview: '/img/previews/zopdev-brandkit.jpg', featured: true },
  { n: '03', title: 'YES Bank app UI', kind: 'Product', year: '2023', href: 'https://screenroot.com/work/yes-bank-app-ui-design/', slug: 'banking-ux', preview: '/img/previews/yesbank.jpg', featured: true },
  { n: '04', title: 'CEAT Tyres website', kind: 'Web', year: '2023', href: 'https://screenroot.com/work/ceat-tyre-website-design/', preview: '/img/previews/ceat.jpg', featured: true },
  { n: '05', title: 'Strand Life Sciences', kind: 'Web, marketing', year: '2024', href: 'https://us.strandls.com/', preview: '/img/thumbs/thumb-strand.jpg' },
  { n: '06', title: 'VOC Automotive', kind: 'Web, marketing', year: '2025', href: 'https://vocautomotive.com/', preview: '/img/thumbs/thumb-voc.jpg' },
  { n: '07', title: 'Federate', kind: 'Identity, web', year: '2025', href: 'https://federate.one/' },
  { n: '08', title: 'Tata Capital website', kind: 'Web', year: '2022', href: 'https://screenroot.com/work/tata-capital-website-design/', preview: '/img/thumbs/thumb-tata-capital.jpg' },
  { n: '09', title: 'ZopNight Tetris Cloud', kind: 'Concept, web', year: '2026', href: 'https://zop-night-tetris-cloud.vercel.app/', preview: '/img/thumbs/thumb-zopnight-tetris.jpg' },
  { n: '10', title: 'Zop.Dev brand launch plan', kind: 'Brand, strategy', year: '2026', href: 'https://zop-branding-launch-plan.vercel.app/', preview: '/img/thumbs/thumb-launch-plan.jpg' },
  { n: '11', title: 'Lyke', kind: 'Product, web', year: '2026', href: 'https://lyke-eosin.vercel.app/', preview: '/img/thumbs/thumb-lyke.jpg' },
  { n: '12', title: 'Contrast Check', kind: 'Tool, web', year: '2025', href: 'https://contrast-check-v1.vercel.app/', preview: '/img/thumbs/thumb-contrast-check.jpg' },
  { n: '13', title: 'Recommendation engine', kind: 'Product, Zop.Dev', year: '2025', slug: 'recommendation-engine', featured: true },
  { n: '14', title: 'Onboarding, 20 to 7 minutes', kind: 'Product, Zop.Dev', year: '2025', slug: 'onboarding', featured: true },
  { n: '15', title: 'Design in code', kind: 'Workflow, Zop.Dev', year: '2025', slug: 'design-in-code' },
  { n: '16', title: 'Design system', kind: 'System, Zop.Dev', year: '2025', slug: 'design-system' },
  { n: '17', title: 'Chit', kind: 'Mac app, launch', year: '2026', slug: 'chit', preview: '/img/previews/chit.jpg' },
  { n: '18', title: 'Crew', kind: 'Mac app, launch', year: '2026', slug: 'crew', preview: '/img/previews/crew.jpg' },
  { n: '19', title: 'Notchling', kind: 'Mac app, launch', year: '2026', slug: 'notchling', preview: '/img/previews/notchling.jpg' },
];

export type Figure = { src: ImageMetadata; alt: string; caption: string };
export type Fact = { n: string; label: string };
export type Section = { heading: string; text: string; facts?: Fact[] };
export type Case = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  year: string;
  role: string;
  hero?: ImageMetadata;
  heroAlt?: string;
  seed: number;            // procedural cover when there is no hero image
  sections: Section[];
  figures?: Figure[];
  outcome: string;
  links?: { label: string; href: string }[];
};

export const cases: Case[] = [
  {
    slug: 'chit',
    title: 'Chit',
    summary: 'A printed receipt of your day in Claude Code. #3 Product of the Day, 226 points.',
    client: 'Own product',
    year: '2026',
    role: 'Design, Swift, launch',
    hero: chitReceipt,
    heroAlt: "Chit's receipt window listing a day of Claude Code work grouped by project",
    seed: 3.1,
    sections: [
      { heading: 'Context', text: 'Claude Code writes a transcript of every session to disk and nobody reads them. At the end of a day of shipping with agents, the record of what actually got done was scattered across projects and windows.', facts: [{ n: '777 KB', label: 'app size, no network' }, { n: 'Sep 26', label: 'launched, 2026' }] },
      { heading: 'Idea', text: 'Treat the transcripts as data and print a receipt. Chit parses them, groups the work by project, and prints what you shipped in a window shaped like a thermal receipt, ready to paste into a task sheet or a standup.' },
      { heading: 'Craft', text: 'The receipt is monospaced and dithered like real thermal paper. Each project is a header with a count; each line carries the time it happened. Lock, replay and copy are the only controls. The parser runs locally and the app never touches the network.' },
    ],
    figures: [
      { src: receipt, alt: 'A single Chit receipt, torn edge at the top, listing the day by project', caption: 'The receipt. One day, grouped by project, with a time on every line.' },
      { src: chitDark, alt: "Chit's dark dashboard view of the same day", caption: 'The same day in the dark window.' },
    ],
    outcome: '#3 Product of the Day and #26 of the week on Product Hunt, 226 points.',
    links: [{ label: 'chit.zopcloud.zop.dev', href: 'https://chit.zopcloud.zop.dev/' }, { label: 'Product Hunt', href: 'https://www.producthunt.com/products/chit-2' }],
  },
  {
    slug: 'crew',
    title: 'Crew',
    summary: 'One pixel monster per running Claude Code agent, along the bottom of your screen. #7 Product of the Day.',
    client: 'Own product',
    year: '2026',
    role: 'Design, SwiftUI, launch',
    hero: crewUi,
    heroAlt: 'A Crew monster under a permission bubble asking to allow a git push',
    seed: 1.7,
    sections: [
      { heading: 'Context', text: 'Running several Claude Code chats and subagents at once means you lose track of which one is thinking, which one is waiting for a permission, and which one finished. The terminal gives you nothing peripheral.', facts: [{ n: '6', label: 'species of monster' }, { n: '4', label: 'hook events wired' }] },
      { heading: 'Idea', text: 'Give every agent a body. Crew listens to Claude Code hook events and draws one creature per live chat or subagent on a borderless strip along the bottom of the screen. A creature appears the moment a session starts, works while a tool runs, and asks you when a permission is pending.' },
      { heading: 'Craft', text: 'A five-line shell shim hands each hook event to the app binary, which parses the JSON on stdin and keeps one marker file per agent. A watcher in the app diffs that directory and renders the strip. The hook path can never block a session: every failure is silent and the exit status is zero. The clock runs at 60 fps while something moves and drops to 24 at rest.' },
    ],
    figures: [
      { src: crewSpecies, alt: 'The six Crew species: ember, sprout, breeze, boulder, puddle and spark, in idle, blink, sleep and walk frames', caption: 'Six species. Each chat gets the same creature every time, seeded from its project.' },
    ],
    outcome: '#7 Product of the Day and #45 of the week on Product Hunt, 141 points. About seven and a half thousand lines of Swift, no dependencies outside macOS.',
    links: [{ label: 'crew-deskmates.vercel.app', href: 'https://crew-deskmates.vercel.app/crew/' }, { label: 'Product Hunt', href: 'https://www.producthunt.com/products/crew-a-tiny-crew-for-claude-code' }],
  },
  {
    slug: 'notchling',
    title: 'Notchling',
    summary: 'A little creature that lives in the MacBook notch. #8 Product of the Day and the Product Hunt newsletter.',
    client: 'Own product',
    year: '2026',
    role: 'Design, SwiftUI, launch',
    hero: notchUi,
    heroAlt: 'Notchling looking out of the notch with three dropped files on its shelf',
    seed: 2.4,
    sections: [
      { heading: 'Context', text: 'The notch is dead space that every MacBook owner stares at all day. Nothing lives there.', facts: [{ n: '8', label: 'agents on the review panel' }, { n: 'Sep 1', label: 'launched, 2026' }] },
      { heading: 'Idea', text: 'Put a creature in it. Notchling reads the real notch geometry from the screen, draws itself around it, follows your cursor with its eyes, dozes when you go idle, and carries any file you drop into its mouth on a small shelf.' },
      { heading: 'Craft', text: 'Everything is drawn frame by frame on a Canvas inside a TimelineView, including live weather scenes for your city. Before release, each weather scene went through an eight-agent panel: one subagent per screenshot plus a coherence judge, scoring against a written brief.' },
    ],
    outcome: '#8 Product of the Day, #53 of the week, 138 points, and a mention in the Product Hunt newsletter.',
    links: [{ label: 'notchling.zopcloud.zop.dev', href: 'https://notchling.zopcloud.zop.dev/' }, { label: 'Product Hunt', href: 'https://www.producthunt.com/products/notchling-lives-in-your-notch' }],
  },
  {
    slug: 'recommendation-engine',
    title: 'Recommendation engine',
    summary: 'Cloud cost recommendations as a ranked list of actions with money attached. $53.5K annualised on the first account.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Product designer, front end',
    seed: 4.2,
    sections: [
      { heading: 'Context', text: 'Enterprise accounts run tens of thousands of cloud resources. Idle, oversized, mis-tiered. The waste hides in plain sight and auditing it by hand takes days, so nobody does.', facts: [{ n: '20K+', label: 'resources per account' }, { n: 'days', label: 'to audit by hand' }] },
      { heading: 'Idea', text: 'The first sketch was a dashboard. It was killed, because a dashboard makes the person do the analysis and they still do not know what to do on Monday. What shipped is a ranked list: one sentence, one number, one verb. Approve, modify or ignore.' },
      { heading: 'Craft', text: 'The hard part was not the recommendation, it was earning the press on Apply. Every card carries its evidence: which resources, what time window, what exactly changes, and what happens if it is wrong. Apply is two clicks with a diff preview in between, an argument the engineer won.', facts: [{ n: '1', label: 'surface, not many' }, { n: '$', label: 'context always visible' }] },
    ],
    outcome: 'About $53.5K annualised savings on the first account, across 20K+ resources.',
  },
  {
    slug: 'onboarding',
    title: 'Onboarding, 20 to 7 minutes',
    summary: 'Fourteen screens became four. Median time to value dropped 65 percent.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Lead designer, research and testing',
    seed: 5.5,
    sections: [
      { heading: 'Context', text: 'Heat maps and session replays showed three drop-off points. Each was a fork that asked a question users could not answer yet.', facts: [{ n: '3', label: 'drop-off forks' }, { n: '14 to 4', label: 'screens' }] },
      { heading: 'Idea', text: 'Defer every decision. Each fork became a default. Show the product first; move the power-user options behind one Advanced toggle. Nine inputs became five and the flow became linear.' },
      { heading: 'Craft', text: 'Five-user moderated sessions, three rounds. Median time dropped from twenty minutes to seven and completion rose past ninety percent.', facts: [{ n: '3', label: 'rounds of testing' }, { n: '90%+', label: 'completion' }] },
    ],
    outcome: 'Sixty-five percent faster. Fewer screens, fewer forks, fewer decisions before value.',
  },
  {
    slug: 'design-in-code',
    title: 'Design in code',
    summary: 'Figma tokens and markdown specs that Claude Code reads, so a screen ships in the same session it is designed.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Product designer',
    seed: 6.1,
    sections: [
      { heading: 'Context', text: 'The usual loop from design to engineering costs days. Every handoff is a translation and something is lost in each one.', facts: [{ n: '3 to 5 days', label: 'before' }, { n: '~60 min', label: 'after' }] },
      { heading: 'Idea', text: 'Tokens are the contract. Figma variables and per-component markdown form one vocabulary that designers and AI agents both read. The MCP layer feeds tokens, components and intent to Claude Code, which writes the screen in Tailwind and React.' },
      { heading: 'Craft', text: 'Seventy-five to eighty percent production fidelity in the same session, then a human pass. One less translation layer, and the design file stays the source of truth.' },
    ],
    outcome: 'Days to minutes. The team ships faster and the design system stops drifting.',
  },
  {
    slug: 'design-system',
    title: 'Design system',
    summary: 'Thirty-eight core tokens, twenty modules, zero off-system overrides. One source for designers and agents.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Systems designer',
    seed: 7.3,
    sections: [
      { heading: 'Context', text: 'Twenty product modules, from the recommendation engine to onboarding, built by people and by agents. Without one vocabulary, every module drifts a little.', facts: [{ n: '38', label: 'core tokens' }, { n: 'OKLCH', label: 'colour model' }] },
      { heading: 'Idea', text: 'Tokens before components. Colour, space, radius, type and motion are variables first; components are the second layer. Each component ships with a markdown file that is the API: designers read it and Claude Code reads it.' },
      { heading: 'Craft', text: 'Twenty-plus modules shipped from the same vocabulary with no off-system overrides. The system scales without translation because the documentation is the input, not an afterthought.', facts: [{ n: '20+', label: 'modules' }, { n: '0', label: 'overrides' }] },
    ],
    outcome: 'One source of truth that both designers and agents read.',
  },
  {
    slug: 'zopdev-homepage',
    title: 'Zop.Dev homepage',
    summary: 'Build. Deploy. Govern. Three verbs, three sub-brands, every cloud. A homepage that says one thing.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Lead designer',
    hero: workZopSite,
    heroAlt: 'The Zop.Dev homepage hero with the headline Build. Deploy. Govern.',
    seed: 8.8,
    sections: [
      { heading: 'Context', text: 'A multi-cloud operating layer with three sub-brands and a crowded category where every homepage says enterprise-grade.', facts: [{ n: '3', label: 'clouds: AWS, Azure, GCP' }, { n: '3', label: 'sub-brands' }] },
      { heading: 'Idea', text: 'The headline is the product. Build, deploy, govern: the three verbs are the three sub-brands and the cross-cloud promise. ZopNight for infrastructure in blue, ZopDay for the signature surface in orange, ZopCloud for outcomes in green. Each owns a section; none competes for the umbrella.' },
      { heading: 'Craft', text: 'Provenance over adjectives. The hero ends with three vendor logos, two compliance seals and four founder alumni names. Each item is a real fact. Orange stays under ten percent of the surface.', facts: [{ n: '2', label: 'seals: SOC 2, ISO 27001' }, { n: '0', label: 'fluff words' }] },
    ],
    outcome: 'Three verbs, every cloud, locked colours, real provenance. Built to ship.',
    links: [{ label: 'Live site', href: 'https://zop-dev-website-v3.vercel.app/' }],
  },
  {
    slug: 'banking-ux',
    title: 'Banking, made legible',
    summary: 'Mobile banking for YES Bank and ICICI at ScreenRoot. One verb per screen, WCAG AA, millions of customers.',
    client: 'ScreenRoot, for YES Bank and ICICI Bank',
    year: '2024',
    role: 'UI designer',
    hero: workYes,
    heroAlt: 'YES Bank mobile app screens',
    seed: 9.4,
    sections: [
      { heading: 'Context', text: 'RBI guidelines, accessibility law, regional copy. Compliance is the floor, not the ceiling. A good banking UI exceeds it quietly.', facts: [{ n: 'AA', label: 'WCAG contrast and focus' }, { n: '2024', label: 'RBI guidelines' }] },
      { heading: 'Idea', text: 'One verb per screen. Transfer, pay, confirm. Each screen names a single action and explains the consequence in one line. Density without clutter.' },
      { heading: 'Craft', text: 'Security is quiet. Trust signals stay small and consistent: data and verbs reassure, padlocks and warnings shout. Copy never exceeds three lines.', facts: [{ n: '1', label: 'primary action per screen' }, { n: '0', label: 'scare badges' }] },
    ],
    outcome: 'Mobile banking that disappears into the task, shipped to millions of customers across two major banks.',
    links: [{ label: 'ScreenRoot case', href: 'https://screenroot.com/work/yes-bank-app-ui-design/' }],
  },
  {
    slug: 'brand-kit',
    title: 'Brand kit, in browser',
    summary: 'Twenty-nine templates, thirty-four icons, three validators and zero backend. Every team ships on-brand without waiting on design.',
    client: 'Zop.Dev',
    year: '2025',
    role: 'Product designer, front end',
    hero: workZopKit,
    heroAlt: 'The Zop.Dev brand kit tool with its template strip',
    seed: 10.6,
    sections: [
      { heading: 'Context', text: 'A growing team producing social posts, decks and press material faster than one designer could review them.', facts: [{ n: '29', label: 'templates' }, { n: '34', label: 'icons' }] },
      { heading: 'Idea', text: 'One tab strip, five jobs: templates, tokens, icons, presets, press kit. Each surface is a different brand job behind one shell, built as a single HTML file with no server.' },
      { heading: 'Craft', text: 'Three inline validators fire while you type: an em-dash count, a banned-word list and a contrast ratio. The export button stays disabled until the design earns it. Single slides export as PNG at native resolution, carousels as multi-page PDF, the whole kit as a ZIP, all in the browser.', facts: [{ n: '3', label: 'inline checks' }, { n: '0', label: 'backend services' }] },
    ],
    outcome: 'Twenty-nine templates and nothing off-brand ships.',
    links: [{ label: 'Live kit', href: 'https://zop-dev-brandkit-v1.vercel.app/' }],
  },
];

export const story = [
  {
    place: 'Jodhpur, Rajasthan.',
    lines: ['the place', 'where I grew', 'with design.'],
    photo: jodhpur,
    alt: 'Mehrangarh Fort above the blue houses of Jodhpur',
  },
  {
    place: 'Pixels by day, petrol by dusk.',
    lines: ['the only thing', 'that empties', 'my head.'],
    photo: bike,
    alt: 'A Royal Enfield on a desert road at dusk',
  },
];

export const contact = {
  title: 'Pitch me something impossible.',
  note: "Inbox open. Reply within 24 hours, most days. Slower on Sundays. That's a feature.",
  now: 'An AI engineer who also ships the design. Three Mac apps launched, looking for the next one to build end-to-end.',
};

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
export const nextCase = (slug: string) => {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
};
export const workFor = (slug: string) => works.find((w) => w.slug === slug);
