# astro-site-rebuild-template

Opinionated Astro 6 + Tailwind 4 starter used as the base for the `/site-rebuild` skill.

Distilled from real rebuilds (Vigilat, Essel Sports, Fabels Enschede). Everything they had in common is here; everything business-specific is gone.

## What's included

- Astro 6 + Tailwind 4 via `@tailwindcss/vite` (no separate `astro add tailwind` step needed)
- `src/layouts/Base.astro` — title/description/transparentNav props, Google Fonts preconnect, scroll-reveal IntersectionObserver wired up
- `src/components/Nav.astro` — responsive nav with mobile menu and scroll-aware transparent variant
- `src/components/Footer.astro` — three-column footer skeleton
- `src/pages/index.astro` — hero placeholder
- `src/styles/global.css` — Tailwind v4 `@theme inline` design tokens (`--color-ink`, `--color-paper`, `--color-brand`, `--font-sans`, `--font-display`, …) and the `.reveal` animation utilities
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
