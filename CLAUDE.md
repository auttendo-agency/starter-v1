# CLAUDE.md

Project rules for any agent working in this repo. Adhere to these — they override default behavior.

## What this is

Opinionated Astro 6 + Tailwind 4 starter, used as the base template for the `/site-rebuild` skill. Distilled from real rebuilds. Everything common is here; everything project-specific is intentionally absent.

## What's wired up

- **Astro 6 + Tailwind 4** via `@tailwindcss/vite` (no separate `astro add tailwind` step)
- **Paraglide JS** for i18n — single-locale by default (`en`), multilingual with a config flip
- **Svelte 5 + shadcn-svelte** pre-installed for interactive primitives. `components.json` configured. CLI ready: `npx shadcn-svelte@latest add <name>`. Components land in `$lib/components/ui/<name>/` and are yours to edit.
- `src/lib/utils.ts` — the `cn()` helper shadcn expects (clsx + tailwind-merge)
- `src/layouts/Base.astro` — `title` / `description` / `transparentNav` props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `<html lang dir>` driven by `getLocale()` / `getTextDirection()`
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` project tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …), shadcn semantic vars mapped onto project tokens (`--background`, `--primary`, `--ring`, `--radius` …), and `.reveal` animation utilities
- `project.inlang/settings.json` + `messages/en.json` — every template string lives here, called via `m.*()`
- TypeScript strict, Node ≥22.12

## Bootstrapping

```bash
npm create astro@latest my-site -- --template dazzled-studio/astro-site-rebuild-template
```

## Version pins

Astro, Tailwind, Svelte, `@astrojs/svelte`, `clsx`, `tailwind-merge`, `tailwind-variants`, and Vite are pinned (not caretted), and an `overrides` block forces `vite@7.3.3`. Reason: newer transitive `vite@8` / `rolldown` versions hoisted via `@tailwindcss/vite` currently fail with `Missing field tsconfigPaths on BindingViteResolvePluginConfig.resolveOptions`. Bump deliberately, after verifying a build.

shadcn-svelte components are installed on-demand and copied into `$lib/components/ui/` — they're version-controlled in this repo, not in `package.json`. To upgrade them, run `npx shadcn-svelte@latest diff <component>` and apply the diff manually, preserving your Rule 2 overrides.

## Conventions

- Brand color in `--color-brand` (and `--color-brand-dark` / `--color-brand-light`).
- Surface tokens: `--color-ink` (text/dark surfaces), `--color-paper` (light surface), `--color-line` (dividers), `--color-muted` (secondary text).
- Add `class="reveal"` (optionally with `style="transition-delay: 200ms"`) to fade-up-on-scroll any element.
- All images live under `public/images/` and are referenced as `/images/foo.jpg`.
- No icon library by default. If you need icons, install `@lucide/svelte` and import per-usage; do not pull in icon fonts.
- **All user-facing copy goes through `messages/<locale>.json` and is read via `import { m } from '../paraglide/messages.js'`. Never hardcode strings in components or pages — even on single-language sites.**

## shadcn-svelte rules (read this before using any shadcn component)

shadcn is pre-installed because forms, dropdowns, dialogs, comboboxes, and command palettes are real pain from scratch. It is **not** pre-installed so that pages get the stock shadcn look. Two hard rules:

### Rule 1 — Native HTML first

Reach for shadcn only when native HTML can't do the job well. Native equivalents that should win by default:

- FAQ / accordion → `<details><summary>...</summary>...</details>`
- Simple modal → native `<dialog>` + `showModal()`
- Plain select → `<select>`
- Disclosure (mobile menu, expandable section) → `<details>` or class toggling
- Basic tooltip → `title` attribute or CSS-only

Reserve shadcn for things native can't do well: **combobox**, **multi-select**, **command palette**, **dropdown menu with checkboxes / nested items**, **sheet with focus trap**, **complex form with validation**, **date picker**, **calendar**, **tabs with deeplinking**, **toast/sonner**.

If you reach for shadcn, justify it in the PR description or in your work report: "Used `<Combobox>` because the source had a 200-item autocomplete that native `<select>` can't handle."

### Rule 2 — Every shadcn component used must be visually overridden

The point of installing shadcn from source is that you own the files. The default styles are a starting point, not a destination. For every shadcn component referenced in any page, override the trademark visual signatures so the site does not read as "a shadcn site." Mandatory:

- **Border radius** — replace `rounded-md` defaults with the project's `--radius` via `rounded-[var(--radius)]`, or `rounded-none` for editorial sites, `rounded-full` for playful ones. Whatever the project's DESIGN.md says.
- **Focus ring** — replace `ring-ring/50` defaults with the project accent (`ring-[var(--color-brand)]` or whatever DESIGN.md calls for). Adjust ring width and offset to match the project's input style.
- **Shadow / elevation** — remove `shadow-sm` defaults unless DESIGN.md explicitly asks for elevation. Flat reads more modern. If using shadows, use the project's shadow recipe, not the default.
- **Typography in buttons/labels** — replace `font-medium` with the project's button typography (often `font-display`, `tracking-wide`, `uppercase` for editorial brands; or `font-sans font-semibold` for product UI). Match DESIGN.md.
- **Padding / height** — adjust the default `h-9 px-4` button sizing to match the project's existing `.btn` recipe (the template ships with `.btn { padding: 0.95rem 1.5rem; ... }`). Don't accept defaults silently.
- **Color usage** — verify the component uses `--primary` for primary actions, `--accent` for accents. Don't use shadcn's grey-on-grey for primary CTAs.

Edit the component files in `$lib/components/ui/<name>/<name>.svelte` directly. That's the whole point of shadcn — they're source files, not a library.

After overriding, the component should look like it was hand-rolled for this brand. If you can run `npx shadcn-svelte@latest diff <component>` and the diff is small or zero, you didn't customize enough.

### Rule 3 — Hydrate sparingly

Astro renders shadcn components server-side by default and ships zero JS. Add a `client:*` directive only when the component genuinely needs interactivity in the browser. Prefer `client:visible` over `client:load` so off-screen widgets don't block initial render. Never use `client:only` unless you have a reason that can be defended in a code review.

### Buttons: `.btn-*` utilities first, shadcn `<Button>` when you need more

The template ships zero-JS button utilities in `global.css` — `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-dark`. Use these for plain CTAs, hero buttons, and footer links. They don't require installing or hydrating a Svelte component.

Reach for shadcn `<Button>` only when you need: disabled state with loading spinner, icon slots with auto-spacing, button-as-trigger for a dropdown / dialog / popover, or `aria-expanded` driven styling. When you do install `<Button>`, override its trademark signatures per Rule 2 — including its default `rounded-lg`, `h-8`, `font-medium`, and shadow recipe.

### Installing a component

```bash
npx shadcn-svelte@latest add dropdown-menu
npx shadcn-svelte@latest add dialog
npx shadcn-svelte@latest add form input label
npx shadcn-svelte@latest add command
```

Use it from an `.astro` file:

```astro
---
import { Button } from "$lib/components/ui/button";
---
<Button client:visible>Reserve a table</Button>
```

The semantic CSS vars (`--primary`, `--background`, etc.) are already wired in `src/styles/global.css` and reference the project design tokens. You should not need to add CSS vars to make shadcn components inherit the project palette — only to override visual signatures per Rule 2.

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
