# Auttendo Starter v1

Opinionated Astro 6 + Tailwind 4 starter. Everything common to a new build is here; everything project-specific is left out.

## What's included

- Astro 6 + Tailwind 4 via `@tailwindcss/vite` (no separate `astro add tailwind` step needed)
- Paraglide JS wired up for i18n — single-locale Dutch (`nl`) by default, multilingual with a config flip (see below)
- `src/layouts/Base.astro` — title/description/transparentNav props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `lang` + `dir` from Paraglide runtime, Auttendo badge script (replace `data-site` before launch)
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

## Forms

Forms post to the Auttendo forms endpoint, which stores the (encrypted) submission and emails the site owner. No backend, no API key in the page: it is a plain HTML `<form>`. The endpoint accepts `multipart/form-data` only (no JSON body), and it reflects CORS headers on both success and error responses, so a `fetch()` from the site can read the result and show errors gracefully.

**Only add a form when the site genuinely needs one** (a contact, reservation, or newsletter form). A "contact" page that only shows an email address and phone number does not need a form.

**The pattern is progressive enhancement.** The markup is a normal `<form>` with a `_redirect`, so with JavaScript disabled it does a native POST and the browser is sent back to `/PAGE_PATH?sent=1`. The script below upgrades that to an AJAX submit: it strips `_redirect` (so the endpoint returns JSON instead of a 302), then shows an inline success or a specific error without a full page reload.

```html
<form action="https://dash.auttendo.com/api/forms/SLUG" method="POST">
  <input type="hidden" name="_token" value="FORM_TOKEN">
  <input type="hidden" name="_form" value="FORM_NAME">
  <input type="hidden" name="_redirect" value="/PAGE_PATH?sent=1">
  <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">

  <!-- your fields here -->

  <button type="submit">Verstuur</button>
  <p data-form-status hidden role="status" aria-live="polite"></p>
</form>
```

Drop this `<script>` once per page that has a form (or lift it into `Base.astro` if the site has several). It binds every Auttendo form on the page:

```html
<script>
  for (const form of document.querySelectorAll('form[action*="/api/forms/"]')) {
    const status = form.querySelector('[data-form-status]');
    const show = (msg) => { if (status) { status.hidden = false; status.textContent = msg; } };
    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return; // let native validation handle it
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      if (btn) btn.disabled = true;
      const data = new FormData(form);
      data.delete('_redirect'); // ask for a JSON result instead of a 302
      try {
        const res = await fetch(form.action, { method: 'POST', body: data });
        if (res.ok) { form.reset(); form.hidden = true; show('Bedankt, we nemen snel contact op!'); return; }
        if (res.status === 429) show('Te veel verzoeken. Wacht even en probeer het opnieuw.');
        else if (res.status === 422) show('Controleer je gegevens en probeer het opnieuw.');
        else show('Er ging iets mis. Probeer het later opnieuw.');
      } catch {
        show('Kan nu geen verbinding maken. Probeer het later opnieuw.');
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }
  // No-JS fallback path: the native _redirect lands here with ?sent=1.
  if (new URLSearchParams(location.search).get('sent') === '1') {
    const f = document.querySelector('form[action*="/api/forms/"]');
    if (f) { f.hidden = true; const s = f.querySelector('[data-form-status]'); if (s) { s.hidden = false; s.textContent = 'Bedankt, we nemen snel contact op!'; } }
  }
</script>
```

The four hidden inputs are the contract:

- **`SLUG`** : this site's Auttendo slug (same value as the badge `data-site`).
- **`_token`** : a per-site HMAC issued by the platform. You cannot compute it locally; it is provisioned during onboarding. Leave the literal value in place.
- **`_form`** : a short lowercase identifier for *this* form (`contact`, `reservation`, `newsletter`, `callback`). Letters, digits, `_`, `-`, max 32 chars. Labels the submission in the owner's notification email.
- **`_redirect`** : a relative path (must start with `/`) used by the no-JS fallback. The script deletes it before the AJAX POST so the endpoint returns `{ "ok": true }` JSON instead of a 302.
- **`_gotcha`** : spam honeypot. Leave it exactly as written (offscreen, `aria-hidden`). Bots fill it; those submissions are silently dropped (and report success).

The endpoint returns JSON `{ "ok": true }` on success and `{ "ok": false, "error": "..." }` with the matching status on failure (`422` validation, `429` rate-limited, `403` blocked origin/bad token). All carry CORS headers, so the `fetch()` above can read them.

Field rules:

- Use descriptive lowercase `name` attributes: `full_name`, `email`, `phone`, `message`, `preferred_date`. For checkbox/multi-select groups use the `name[]` suffix (`services[]`).
- **Always include a field named `email`** when collecting one : the endpoint uses it as the Reply-To so the owner can just hit reply.
- Max 50 fields, 10 KB per value. The endpoint is rate-limited per site and per IP.
- No `type="file"` / `enctype="multipart/form-data"`, and no multi-step forms (use one form with visual sections). File upload is not supported.
- The `action` must be the absolute `https://dash.auttendo.com/...` URL : a relative path 404s. CORS is locked to the site's own production and preview domains, so the form only works from the deployed site.

## Conventions

- Brand color in `--color-brand` (and `--color-brand-dark` / `--color-brand-light`)
- Surface tokens: `--color-ink` (text/dark surfaces), `--color-paper` (light surface), `--color-line` (dividers), `--color-muted` (secondary text)
- Add `class="reveal"` (optionally with `style="transition-delay: 200ms"`) to fade-up-on-scroll any element
- All images live under `public/images/` and are referenced as `/images/foo.jpg`
- No icon library, no JS framework — keep it static, Astro components only
- All user-facing copy goes in `messages/<locale>.json` and is read via `import { m } from '../paraglide/messages.js'` — never hardcode strings in components/pages, even on single-language sites
- The Auttendo badge in `Base.astro` ships with `data-site="REPLACE_ME"`; set it to this site's slug before launch. The loader is not SRI-pinned (no `integrity` attribute), so there is no hash to maintain when `v1.js` is rotated.

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
