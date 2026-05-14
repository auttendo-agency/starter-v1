# CLAUDE.md

Project rules for any agent working in this repo. Adhere to these — they override default behavior.

## What this is

Opinionated Astro 6 + Tailwind 4 starter, used as the base template for the `/site-rebuild` skill. Distilled from real rebuilds. Everything common is here; everything project-specific is intentionally absent.

## What's wired up

- **Astro 6 + Tailwind 4** via `@tailwindcss/vite` (no separate `astro add tailwind` step)
- **Paraglide JS** for i18n — single-locale by default (`en`), multilingual with a config flip
- **Svelte 5 + bits-ui** pre-installed for accessibility-sensitive primitives (dropdown, dialog, select, combobox, tabs, popover, etc.). bits-ui is the unstyled / headless primitive layer — same Radix-equivalent a11y, none of the shadcn visual baggage. Import directly: `import { DropdownMenu } from "bits-ui"`.
- `src/lib/utils.ts` — the `cn()` helper (clsx + tailwind-merge) for class composition
- `src/layouts/Base.astro` — `title` / `description` / `transparentNav` props, Google Fonts preconnect, scroll-reveal IntersectionObserver, `<html lang dir>` driven by `getLocale()` / `getTextDirection()`
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` project tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …) and `.reveal` animation utilities
- `project.inlang/settings.json` + `messages/en.json` — every template string lives here, called via `m.*()`
- TypeScript strict, Node ≥22.12

## Bootstrapping

```bash
npm create astro@latest my-site -- --template dazzled-studio/astro-site-rebuild-template
```

## Version pins

Astro, Tailwind, Svelte, `@astrojs/svelte`, `bits-ui`, `clsx`, `tailwind-merge`, and Vite are pinned (not caretted), and an `overrides` block forces `vite@7.3.3`. Reason: newer transitive `vite@8` / `rolldown` versions hoisted via `@tailwindcss/vite` currently fail with `Missing field tsconfigPaths on BindingViteResolvePluginConfig.resolveOptions`. Bump deliberately, after verifying a build.

## Conventions

- Brand color in `--color-brand` (and `--color-brand-dark` / `--color-brand-light`).
- Surface tokens: `--color-ink` (text/dark surfaces), `--color-paper` (light surface), `--color-line` (dividers), `--color-muted` (secondary text).
- Add `class="reveal"` (optionally with `style="transition-delay: 200ms"`) to fade-up-on-scroll any element.
- All images live under `public/images/` and are referenced as `/images/foo.jpg`.
- No icon library by default. If you need icons, install `@lucide/svelte` and import per-usage; do not pull in icon fonts.
- **All user-facing copy goes through `messages/<locale>.json` and is read via `import { m } from '../paraglide/messages.js'`. Never hardcode strings in components or pages — even on single-language sites.**

## bits-ui rules (read this before reaching for any interactive primitive)

`bits-ui` is the headless / unstyled primitive layer for Svelte 5 — the Radix-of-Svelte. It ships keyboard navigation, focus management, ARIA semantics, click-outside, escape-to-close, and all the other tedious-to-get-right accessibility plumbing. It does **not** ship any styling. You bring your own Tailwind classes rooted in DESIGN.md.

This is intentional. We do not want every site to look like the same component library. We do want every site to be accessible without hand-rolling a focus trap.

### Rule 1 — Native HTML first

Reach for bits-ui only when native HTML can't do the job well. Native equivalents that should win by default:

- FAQ / accordion → `<details><summary>...</summary>...</details>`
- Simple modal → native `<dialog>` + `showModal()`
- Plain select → `<select>`
- Disclosure (mobile menu, expandable section) → `<details>` or class toggling in a `<script>` tag
- Basic tooltip → `title` attribute or CSS-only

Reserve bits-ui for things native can't do well: **combobox**, **multi-select**, **command palette**, **dropdown menu with checkboxes / nested items**, **sheet with focus trap**, **complex form with validation**, **date picker**, **calendar**, **tabs**, **tooltip with rich content**, **popover**.

When you do use bits-ui, justify it in your work report: "Used `DropdownMenu` because the nav has nested submenus that need keyboard navigation."

### Rule 2 — Hydrate sparingly

Astro renders Svelte components server-side by default and ships zero JS. Add a `client:*` directive only when the component genuinely needs interactivity in the browser. Prefer `client:visible` over `client:load` so off-screen widgets don't block initial render. Never use `client:only` unless you can defend it in a review.

### Buttons: `.btn-*` utilities first, custom Svelte when you need more

The template ships zero-JS button utilities in `global.css` — `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-dark`. Use these for plain CTAs, hero buttons, and footer links. They don't require any Svelte component or client hydration.

Only build a `.svelte` button when you need: a disabled state with a loading spinner, icon-with-text slots, or use as a `bits-ui` trigger (e.g. for a dropdown). Even then, you're authoring the button yourself — `bits-ui` doesn't ship a styled button.

### Using a bits-ui primitive

```svelte
<!-- src/lib/components/Dropdown.svelte -->
<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={cn("btn btn-ghost", "data-[state=open]:bg-paper-warm")}>
    Menu
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class="bg-paper border border-line p-2 shadow-lg min-w-[200px]"
      sideOffset={8}
    >
      <DropdownMenu.Item class="px-3 py-2 hover:bg-paper-warm cursor-pointer">
        Item 1
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

From an `.astro` file:

```astro
---
import Dropdown from "$lib/components/Dropdown.svelte";
---
<Dropdown client:visible />
```

Style with Tailwind utilities using the project tokens (`bg-paper`, `border-line`, `text-ink`). bits-ui exposes `data-state` and `data-*` attributes on its parts — use them for state-driven styling (e.g. `data-[state=open]:rotate-180` on a chevron).

Reference: https://bits-ui.com/docs

## i18n rules (Paraglide JS)

### How it's wired

- `project.inlang/settings.json` — Paraglide project config (`baseLocale`, `locales`, plugin)
- `messages/<locale>.json` — one file per locale, keys must be valid JS identifiers (e.g. `home_hero_headline`, not `home.hero.headline`)
- `astro.config.mjs` — `paraglideVitePlugin({ project, outdir, strategy: ['baseLocale'] })`
- `src/paraglide/` — Paraglide compiler output. **Committed to git on purpose** (see "Why src/paraglide/ is committed" below). Never hand-edit; let the vite plugin regenerate it when messages or settings change, then commit the diff.
- `src/layouts/Base.astro` reads `getLocale()` / `getTextDirection()` and sets `<html lang dir>`

### Why src/paraglide/ is committed

Paraglide's compiler fetches its message-format plugin from `cdn.jsdelivr.net` at build time. Agent sandboxes (TaskRunner / `/site-rebuild`) run with a restricted egress allowlist that doesn't include third-party CDNs, so `astro build` would fail there if `src/paraglide/` were absent.

We commit the compiled output instead. Treat it like any other build artifact that has to live in the repo:

- **Never edit a file under `src/paraglide/` by hand.** It is generated. Edit `messages/<locale>.json` and let the Vite plugin recompile.
- **Never delete `src/paraglide/`** as a "cleanup" or "regenerate" step from inside the sandbox — you can't regenerate it there.
- **Do commit changes** to `src/paraglide/` that the plugin produces locally when you change messages or settings. A diff under `src/paraglide/` paired with a `messages/` diff is expected; a `src/paraglide/` diff with no matching message change is a red flag.
- Linters/typecheckers already get a free pass via the `/* eslint-disable */` header the plugin emits.

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
