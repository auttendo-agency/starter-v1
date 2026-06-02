# Auttendo Starter v1

Opinionated Astro 6 + Tailwind 4 starter. Everything common to a new build is here; everything project-specific is left out.

## What's included

- Astro 6 + Tailwind 4 via `@tailwindcss/vite` (no separate `astro add tailwind` step needed)
- Paraglide JS wired up for i18n — single-locale Dutch (`nl`) by default, multilingual with a config flip (see below)
- `src/layouts/Base.astro` — title/description/transparentNav props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `lang` + `dir` from Paraglide runtime
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` design tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …) and the `.reveal` animation utilities
- `project.inlang/settings.json` + `messages/nl.json` — all template strings live here, called via `m.*()`
- TypeScript strict, Node ≥22.12

## Bootstrapping a new project

```bash
pnpm create astro@latest my-site -- --template auttendo-agency/starter-v1
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

The template ships i18n-ready but **single-locale**, defaulting to Dutch (`nl`). All UI copy lives in `messages/nl.json` and components call `m.nav_brand()`, `m.footer_tagline()`, etc. Routing it all through the locale file (even on a one-language site) is what makes adding a second language later a config change, not a refactor.

**All UI strings go through `messages/<locale>.json`, never hardcoded.** The one exception is long-form content (blog posts, articles, case studies): that belongs in Astro content collections (one entry per locale), not in the message file. Message files are for interface copy: nav, buttons, headings, labels, footer.

**If the site isn't Dutch, switch the base locale.** Edit `project.inlang/settings.json` to e.g. `baseLocale: "en"`, **rename** `messages/nl.json` to `messages/en.json`, and translate the values. Same story for `de`, `fr`, `es`, etc. A single-locale build should ship exactly one `messages/<locale>.json` matching the site's real language. Keys stay in English (they're code identifiers) — only the values are localized.

### How it's wired

- `project.inlang/settings.json` — Paraglide project config (`baseLocale`, `locales`, plugin)
- `messages/<locale>.json` — one file per locale, keys are valid JS identifiers (e.g. `home_hero_headline`)
- `astro.config.mjs` — `paraglideVitePlugin({ project, outdir, strategy: ['baseLocale'] })`
- `src/paraglide/` — generated on every build/dev. Gitignored. Don't edit by hand.
- `src/layouts/Base.astro` reads `getLocale()` / `getTextDirection()` and sets `<html lang dir>`.

### Adding placeholder copy when building a new page

1. Add the key to `messages/nl.json` with kebab-free, identifier-safe naming (`pricing_hero_headline`, not `pricing.hero.headline`)
2. Import `m` and call `m.pricing_hero_headline()` in the component
3. The vite plugin recompiles on save — no manual step

ICU-style interpolation is supported (`"footer_copyright": "© {year} {brand}."` → `m.footer_copyright({ year, brand })`), as is plural forms.

### Going multilingual

This is the exact setup proven on a live NL/EN site (Dutch default at `/`, English at `/en/`). Swap the locale codes for yours. Don't mix it with Astro's native `i18n` routing block: Paraglide `urlPatterns` is the single source of truth for routing here, and running both fights over the same paths.

**1. Declare locales** in `project.inlang/settings.json`. The `baseLocale` is the one that serves from the root with **no** URL prefix:
   ```json
   { "baseLocale": "nl", "locales": ["nl", "en"], "modules": [...] }
   ```

**2. Add a messages file per locale** (`messages/nl.json`, `messages/en.json`): same keys, translated values.

**3. Switch the Paraglide strategy** to `['url', 'baseLocale']` and add `urlPatterns`. Critical ordering: list the **prefixed** (non-base) locales first and the **unprefixed baseLocale catch-all last**, and the unprefixed pattern must map to `baseLocale`:
   ```js
   paraglideVitePlugin({
     project: './project.inlang',
     outdir: './src/paraglide',
     strategy: ['url', 'baseLocale'],
     urlPatterns: [{
       pattern: '/:path(.*)?',
       localized: [
         ['en', '/en/:path(.*)?'], // non-base locale: prefixed, listed first
         ['nl', '/:path(.*)?'],     // baseLocale: unprefixed catch-all, MUST be last
       ],
     }],
   })
   ```

**4. Move pages under `src/pages/[...locale]/`** and fan them out with `getStaticPaths`. The gotcha: baseLocale must produce an `undefined` param so it renders at `/`, not `/nl/`:
   ```js
   import { locales, baseLocale } from '../paraglide/runtime.js';

   export function getStaticPaths() {
     return locales.map((locale) => ({
       params: { locale: locale === baseLocale ? undefined : locale },
     }));
   }
   ```
   e.g. `src/pages/index.astro` becomes `src/pages/[...locale]/index.astro`, `prijzen/index.astro` becomes `[...locale]/prijzen/index.astro`.

**5. Add `src/middleware.ts`** so Paraglide resolves the locale from the URL per request. Rename the shipped `src/middleware.ts.example` — it already has the right shape:
   ```ts
   import { defineMiddleware } from 'astro:middleware';
   import { paraglideMiddleware } from './paraglide/server.js';

   export const onRequest = defineMiddleware((context, next) =>
     paraglideMiddleware(context.request, () => next()),
   );
   ```
   **The callback must be `() => next()`, not `({ request }) => next(request)`** (the form Paraglide's server-mode docs show). With a `[...locale]` catch-all + static output, passing the request de-localizes `/en/` down to `/` before Astro routes it, so the prefixed locale collapses onto the base route and the build emits a 404 at `dist/en/index.html` instead of the real `/en/` page. This was a real bug we hit; `() => next()` is the fix.

   No SSR/edge adapter is needed: middleware runs at build time during prerendering and only sets the locale. You only need an adapter (e.g. `@astrojs/vercel` with `edgeMiddleware: true`) if you want the middleware to also run a *server-side* redirect at request time.

**5b. First-visit locale redirect (optional, SSG-friendly).** `Base.astro` ships a `redirectLocale` prop that runs a tiny client-side script: on first visit to `/`, non-Dutch browsers are sent to `/en/` once (stored in `localStorage`). Set it on your base-locale homepage:
   ```astro
   <Base redirectLocale>...</Base>
   ```
   It's inert on single-locale builds. This needs no adapter (unlike a server-side `Accept-Language` redirect in middleware, which does).

**6. Emit hreflang + canonical alternates** in `Base.astro` for SEO. Derive the sibling-locale URLs from the current path:
   ```astro
   ---
   const { pathname } = Astro.url;
   const siteUrl = Astro.site ?? new URL('https://example.com');
   const nlPath = pathname.startsWith('/en') ? (pathname.slice(3) || '/') : pathname;
   const enPath = pathname.startsWith('/en') ? pathname : `/en${pathname}`;
   const nlUrl = new URL(nlPath, siteUrl).toString();
   const enUrl = new URL(enPath, siteUrl).toString();
   ---
   <link rel="canonical" href={new URL(pathname, siteUrl).toString()} />
   <link rel="alternate" hreflang="nl" href={nlUrl} />
   <link rel="alternate" hreflang="en" href={enUrl} />
   <link rel="alternate" hreflang="x-default" href={nlUrl} />
   ```

**7. (Optional) Add `@astrojs/sitemap` with i18n** so both variants are listed:
   ```js
   sitemap({ i18n: { defaultLocale: 'nl', locales: { nl: 'nl-NL', en: 'en-US' } } })
   ```

See:
- Paraglide Astro example: https://github.com/opral/paraglide-js/tree/main/examples/astro
- Paraglide SSG docs: https://github.com/opral/paraglide-js/blob/main/docs/static-site-generation.md
- Astro i18n routing: https://docs.astro.build/en/guides/internationalization/
