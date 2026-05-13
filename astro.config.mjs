// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

// https://astro.build/config
export default defineConfig({
  // i18n routing is OFF by default — the template ships single-locale.
  // To go multilingual:
  //   1. Add locales to `project.inlang/settings.json` (e.g. ["en", "nl"])
  //   2. Add `messages/<locale>.json` files
  //   3. Uncomment the `i18n` block below
  //   4. Switch paraglide `strategy` to ["url", "baseLocale"] and add `urlPatterns`
  //   5. Add `src/middleware.ts` (see README)
  //
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'nl'],
  //   routing: { prefixDefaultLocale: false },
  // },
  integrations: [svelte()],
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        strategy: ['baseLocale'],
      }),
    ],
  },
});
