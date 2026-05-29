# sello.build

The landing site for [Sello](https://github.com/juanfiguera/sello), a protocol
for independently-verifiable records of AI agent actions.

Live at **https://sello.build**.

Two pages sharing one design system:

- `/` — the protocol landing page.
- `/find-my` — "Find My, for AI agents," a concept framing of the protocol.

Built with [Astro](https://astro.build) as a static site. No UI framework: a
few small inline scripts drive the scroll reveal, the flow animation, and the
interactive Find My panel; everything else is server-rendered HTML and CSS.
Fonts are self-hosted via `@fontsource-variable/*`.

## Develop

```bash
pnpm install      # or npm install
pnpm dev          # dev server at http://localhost:4321
pnpm build        # static output to dist/
pnpm preview      # serve the built output
```

| Command        | Action                                    |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Dev server with HMR                       |
| `pnpm build`   | Build the static site to `dist/`          |
| `pnpm preview` | Preview the production build locally      |
| `pnpm check`   | `astro check` — type-check `.astro` files |
| `pnpm lint`    | ESLint + Prettier check                   |
| `pnpm format`  | Prettier write                            |

## Structure

```
src/
  layouts/Base.astro        <head>, fonts, global styles, reveal-on-scroll
  pages/
    index.astro             protocol landing page (/)
    find-my.astro           concept page (/find-my)
  components/
    Nav, Footer             shared, data-driven across both pages
    Hero, Problem, Flow, Anatomy, Guarantees,
    Compare, Integration, CTA              protocol sections
    findmy/
      FindMyHero, FindMyPanel, Metaphor,
      Inversion, Privacy, ConceptCTA       concept sections
    Seal.astro, icons/GitHubIcon.astro
  styles/global.css         OKLCH design tokens + shared primitives
  consts.ts                 outbound links (repo, spec, security review)
public/CNAME                custom domain for GitHub Pages
```

Shared tokens, buttons, the seal mark, the background grid, and the
reveal/section scaffolding live in `src/styles/global.css`. Each section
component owns its own scoped styles.

## Deploy

Pushes to `main` build and deploy to GitHub Pages via
`.github/workflows/deploy.yml` (the official `withastro/action`, Node 22). The
custom domain `sello.build` is set with `public/CNAME` and registered in the
repository's Pages settings; `astro.config.mjs` `site` matches it.

## License

Apache 2.0, matching the Sello project.
