# CLAUDE.md

Project rules for any agent working in this repo. Adhere to these — they override default behavior.

## What this is

Opinionated Astro 6 + Tailwind 4 starter, used as the base template for the `/site-rebuild` skill. Distilled from real rebuilds. Everything common is here; everything project-specific is intentionally absent.

## What's wired up

- **Astro 6 + Tailwind 4** via `@tailwindcss/vite` (no separate `astro add tailwind` step)
- **Paraglide JS** for i18n — single-locale by default (`en`), multilingual with a config flip
- `src/layouts/Base.astro` — `title` / `description` / `transparentNav` props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `<html lang dir>` driven by `getLocale()` / `getTextDirection()`
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` design tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …) and `.reveal` animation utilities
- `project.inlang/settings.json` + `messages/en.json` — every template string lives here, called via `m.*()`
- TypeScript strict, Node ≥22.12

## Bootstrapping

```bash
npm create astro@latest my-site -- --template dazzled-studio/astro-site-rebuild-template
```

## Version pins

Astro, Tailwind, and Vite are pinned (not caretted) and an `overrides` block forces `vite@7.3.3`. Reason: newer transitive `vite@8` / `rolldown` versions hoisted via `@tailwindcss/vite` currently fail with `Missing field tsconfigPaths on BindingViteResolvePluginConfig.resolveOptions`. Bump deliberately, after verifying a build.

## Conventions

- Brand color in `--color-brand` (and `--color-brand-dark` / `--color-brand-light`).
- Surface tokens: `--color-ink` (text/dark surfaces), `--color-paper` (light surface), `--color-line` (dividers), `--color-muted` (secondary text).
- Add `class="reveal"` (optionally with `style="transition-delay: 200ms"`) to fade-up-on-scroll any element.
- All images live under `public/images/` and are referenced as `/images/foo.jpg`.
- No icon library, no JS framework — keep it static, Astro components only.
- **All user-facing copy goes through `messages/<locale>.json` and is read via `import { m } from '../paraglide/messages.js'`. Never hardcode strings in components or pages — even on single-language sites.**

## i18n rules (Paraglide JS)

### How it's wired

- `project.inlang/settings.json` — Paraglide project config (`baseLocale`, `locales`, plugin)
- `messages/<locale>.json` — one file per locale, keys must be valid JS identifiers (e.g. `home_hero_headline`, not `home.hero.headline`)
- `astro.config.mjs` — `paraglideVitePlugin({ project, outdir, strategy: ['baseLocale'] })`
- `src/paraglide/` — generated on every build/dev. **Gitignored. Never edit by hand.**
- `src/layouts/Base.astro` reads `getLocale()` / `getTextDirection()` and sets `<html lang dir>`

### Rule: `baseLocale` matches the source site's language

The template ships with `baseLocale: "en"` and `messages/en.json` as a placeholder only.

**If the source/target site is Dutch, change `baseLocale` to `"nl"`, RENAME `messages/en.json` → `messages/nl.json`, and DELETE the leftover `en.json`.** Same story for German (`de`), French (`fr`), Spanish (`es`), and any other language. A single-locale build must ship exactly one `messages/<locale>.json` matching the site's actual language. Do not leave a stray English file sitting next to the real one.

Keys stay in English (they're code identifiers). Only the values get localized.

### Adding copy when building a new page

1. Add the key to `messages/<locale>.json` with an identifier-safe name (`pricing_hero_headline`, not `pricing.hero.headline`)
2. Import `m` and call `m.pricing_hero_headline()` in the component
3. The Vite plugin recompiles on save — no manual step required

ICU interpolation is supported (`"footer_copyright": "© {year} {brand}."` → `m.footer_copyright({ year, brand })`), as is plural forms.

### Going multilingual

1. Edit `project.inlang/settings.json` — add every locale to `locales`, with `baseLocale` set to the **source site's primary language** (not English by default):
   ```json
   { "baseLocale": "nl", "locales": ["nl", "en", "de"], "modules": [...] }
   ```
2. Create one `messages/<locale>.json` per locale, all mirroring the same keys.
3. Uncomment the `i18n` block in `astro.config.mjs` and list your locales there too (`prefixDefaultLocale: false` keeps the base locale at `/`).
4. Switch the Paraglide `strategy` from `['baseLocale']` to `['url', 'baseLocale']` and add `urlPatterns`:
   ```js
   paraglideVitePlugin({
     project: './project.inlang',
     outdir: './src/paraglide',
     strategy: ['url', 'baseLocale'],
     urlPatterns: [{
       pattern: '/:path(.*)?',
       localized: [
         ['en', '/en/:path(.*)?'],
         ['de', '/de/:path(.*)?'],
         ['nl', '/:path(.*)?'],
       ],
     }],
   })
   ```
5. Add `src/middleware.ts` so the locale is set per request:
   ```ts
   import { defineMiddleware } from 'astro:middleware';
   import { paraglideMiddleware } from './paraglide/server.js';

   export const onRequest = defineMiddleware((context, next) =>
     paraglideMiddleware(context.request, ({ request }) => next(request))
   );
   ```
6. For pure SSG, fan pages out over `locales` via `getStaticPaths()`, or use Astro's built-in i18n routing.
7. Use `localizeHref()` from `./paraglide/runtime.js` whenever building `<a>` tags so links automatically point at the current locale's URL.
8. Translate every key in every `messages/<locale>.json`. Pull translations directly from the corresponding pages on the source site — do not machine-translate when the original copy exists.

References:
- Paraglide Astro example — https://github.com/opral/paraglide-js/tree/main/examples/astro
- Paraglide SSG docs — https://github.com/opral/paraglide-js/blob/main/docs/static-site-generation.md
- Astro i18n routing — https://docs.astro.build/en/guides/internationalization/
- Up-to-date Paraglide docs via `ctx7 docs /opral/paraglide-js "<query>"`
