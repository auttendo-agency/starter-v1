// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // i18n routing is OFF by default: the template ships single-locale.
  // To go multilingual (full steps + snippets in README, "Going multilingual"):
  //   1. Add locales to `project.inlang/settings.json` (baseLocale serves at /)
  //   2. Add a `messages/<locale>.json` per locale
  //   3. Switch paraglide `strategy` to ['url', 'baseLocale'] and add `urlPatterns`
  //      (prefixed locales first; the unprefixed baseLocale catch-all comes last)
  //   4. Move pages under `src/pages/[...locale]/` + a getStaticPaths fan-out
  //   5. Rename `src/middleware.ts.example` to `src/middleware.ts` (callback
  //      MUST be `() => next()`, not next(request) — see README for why)
  // Do NOT enable Astro's native `i18n` routing block: Paraglide `urlPatterns`
  // owns routing here, running both fights over the same routes.
  // The Vercel adapter is standard; SSG locale resolution needs no extra adapter
  // config (edgeMiddleware is only for a server-side redirect at request time).
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

  adapter: vercel(),
});