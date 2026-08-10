import { defineConfig } from 'vitepress';

const base = process.env.DOCS_BASE || '/';

export default defineConfig({
  title: 'Learn Playwright — Movies App',
  description:
    'Hands-on Playwright workshop using the Movies app. Concepts live on playwright.dev; practice lives here.',
  base,
  srcDir: '.',
  // Flatten learn/*.md to /:page so CI can publish the whole site under /learn without /learn/learn/...
  rewrites: {
    'learn/index.md': 'course.md',
    'learn/:page.md': ':page.md',
    'learn/solutions/:page.md': 'solutions/:page.md',
    'learn/images/:page.md': 'images/:page.md',
  },
  srcExclude: [
    '**/node_modules/**',
    'movies-app/**',
    'mock-api/**',
    'tests/**',
    'playwright/**',
    'playwright-report/**',
    'test-results/**',
    'blob-report/**',
    '.git/**',
    '.github/**',
    'specs/**',
    '.tmp-tmdb-mock/**',
    'learn/solutions/**/*.ts',
    'README.md',
    'LICENSE',
    '**/package-lock.json',
  ],
  // Labs intentionally link to tests/, prompts, and repo files outside the docs corpus.
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Course', link: '/course' },
      { text: 'Reference', link: '/docs/TESTING' },
      { text: 'AI', link: '/docs/AI-TESTING' },
      {
        text: 'GitHub',
        link: 'https://github.com/debs-obrien/playwright-movies-app',
      },
    ],
    sidebar: [
      {
        text: 'Start',
        items: [
          { text: 'Course home', link: '/course' },
          { text: '00 — Start here', link: '/00-start-here' },
        ],
      },
      {
        text: 'Foundations',
        items: [
          { text: '01 — Overview & first test', link: '/01-overview' },
          { text: '02 — First test & credentials', link: '/02-first-test' },
          { text: '03 — ARIA snapshots', link: '/03-aria-snapshots' },
          { text: '04 — Debugging & traces', link: '/04-debugging' },
        ],
      },
      {
        text: 'Suite craft',
        items: [
          { text: '05 — Tags & annotations', link: '/05-tags-annotations' },
          { text: '06 — Auth & storageState', link: '/06-auth-setup' },
          { text: '07 — Fixtures & helpers', link: '/07-fixtures-helpers' },
          { text: '08 — Network mock & API', link: '/08-network-and-api' },
        ],
      },
      {
        text: 'AI-assisted',
        items: [
          { text: '09 — AI writing path', link: '/09-ai-writing-path' },
          { text: '10 — Bonus: sharding', link: '/10-bonus-sharding' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Testing guide', link: '/docs/TESTING' },
          { text: 'AI testing', link: '/docs/AI-TESTING' },
          { text: 'AGENTS.md', link: '/AGENTS' },
          { text: 'Wiki stub', link: '/docs/WIKI' },
        ],
      },
    ],
    search: { provider: 'local' },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/debs-obrien/playwright-movies-app',
      },
    ],
    outline: { level: [2, 3] },
  },
});
