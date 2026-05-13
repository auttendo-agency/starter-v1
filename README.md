# astro-site-rebuild-template

Opinionated Astro 6 + Tailwind 4 starter used as the base for the `/site-rebuild` skill.

Distilled from real rebuilds (Vigilat, Essel Sports, Fabels Enschede). Everything they had in common is here; everything business-specific is gone.

## What's included

- Astro 6 + Tailwind 4 via `@tailwindcss/vite` (no separate `astro add tailwind` step needed)
- Paraglide JS wired up for i18n — single-locale by default, multilingual with a config flip (see below)
- `src/layouts/Base.astro` — title/description/transparentNav props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `lang` + `dir` from Paraglide runtime
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` design tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …) and the `.reveal` animation utilities
- `project.inlang/settings.json` + `messages/en.json` — all template strings live here, called via `m.*()`
- TypeScript strict, Node ≥22.12

## Bootstrapping a new project

```bash
npm create astro@latest my-site -- --template dazzled-studio/astro-site-rebuild-template
```

Astro's `--template` flag accepts any `<github-user>/<github-repo>` and clones the main branch. See the Astro docs: https://docs.astro.build/en/install-and-setup/#use-a-theme-or-starter-template

## Version pins

Astro, Tailwind, and Vite are pinned (not caretted) and an `overrides` block forces `vite@7.3.3`. Reason: newer transitive `vite@8` / `rolldown` versions hoisted via `@tailwindcss/vite` currently fail with `Missing field tsconfigPaths on BindingViteResolvePluginConfig.resolveOptions`. Bump deliberately, after verifying a build.

## Conventions

- Brand color in `--color-brand` (and `--color-brand-dark` / `--color-brand-light`)
- Surface tokens: `--color-ink` (text/dark surfaces), `--color-paper` (light surface), `--color-line` (dividers), `--color-muted` (secondary text)
- Add `class="reveal"` (optionally with `style="transition-delay: 200ms"`) to fade-up-on-scroll any element
- All images live under `public/images/` and are referenced as `/images/foo.jpg`
- No icon library, no JS framework — keep it static, Astro components only
- All user-facing copy goes in `messages/<locale>.json` and is read via `import { m } from '../paraglide/messages.js'` — never hardcode strings in components/pages, even on single-language sites

## i18n (Paraglide JS)

The template ships i18n-ready but **single-locale** (`en`). All copy lives in `messages/en.json`. Components call `m.nav_brand()`, `m.footer_tagline()`, etc. — this means turning on a second language later is a config change, not a refactor.

**Set `baseLocale` to your site's actual language — not English by default.** If you're building a Dutch site, edit `project.inlang/settings.json` to `baseLocale: "nl"`, **rename** `messages/en.json` to `messages/nl.json`, and **delete** the `en.json` file. Same story for `de`, `fr`, `es`, etc. Single-locale builds should ship exactly one `messages/<locale>.json` matching the site's real language. Keys stay in English (they're code identifiers) — only the values are localized.

### How it's wired

- `project.inlang/settings.json` — Paraglide project config (`baseLocale`, `locales`, plugin)
- `messages/<locale>.json` — one file per locale, keys are valid JS identifiers (e.g. `home_hero_headline`)
- `astro.config.mjs` — `paraglideVitePlugin({ project, outdir, strategy: ['baseLocale'] })`
- `src/paraglide/` — generated on every build/dev. Gitignored. Don't edit by hand.
- `src/layouts/Base.astro` reads `getLocale()` / `getTextDirection()` and sets `<html lang dir>`.

### Adding placeholder copy when building a new page

1. Add the key to `messages/en.json` with kebab-free, identifier-safe naming (`pricing_hero_headline`, not `pricing.hero.headline`)
2. Import `m` and call `m.pricing_hero_headline()` in the component
3. The vite plugin recompiles on save — no manual step

ICU-style interpolation is supported (`"footer_copyright": "© {year} {brand}."` → `m.footer_copyright({ year, brand })`), as is plural forms.

### Going multilingual

When the source site is multilingual (or you want to add a second language later):

1. Edit `project.inlang/settings.json`:
   ```json
   { "baseLocale": "en", "locales": ["en", "nl"], "modules": [...] }
   ```
2. Add `messages/nl.json` — same keys, translated values
3. Uncomment the `i18n` block in `astro.config.mjs` and list your locales
4. Switch the Paraglide strategy from `['baseLocale']` to `['url', 'baseLocale']` and add `urlPatterns`:
   ```js
   paraglideVitePlugin({
     project: './project.inlang',
     outdir: './src/paraglide',
     strategy: ['url', 'baseLocale'],
     urlPatterns: [{
       pattern: '/:path(.*)?',
       localized: [
         ['nl', '/nl/:path(.*)?'],
         ['en', '/:path(.*)?'],
       ],
     }],
   })
   ```
5. Add `src/middleware.ts` to set the locale per request:
   ```ts
   import { defineMiddleware } from 'astro:middleware';
   import { paraglideMiddleware } from './paraglide/server.js';

   export const onRequest = defineMiddleware((context, next) =>
     paraglideMiddleware(context.request, ({ request }) => next(request))
   );
   ```
6. For pure SSG, use `getStaticPaths()` to fan out pages over `locales`, or rely on Astro's built-in i18n routing.

See:
- Paraglide Astro example — https://github.com/opral/paraglide-js/tree/main/examples/astro
- Paraglide SSG docs — https://github.com/opral/paraglide-js/blob/main/docs/static-site-generation.md
- Astro i18n routing — https://docs.astro.build/en/guides/internationalization/
