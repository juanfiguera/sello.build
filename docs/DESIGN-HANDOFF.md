# Handoff: Sello Landing Page

## Overview

A single-page marketing/landing site for **Sello** — an open-source protocol for independently-verifiable records of AI agent actions. Services sign encrypted "receipts" for what they observed when an agent calls them, publish those receipts to a transparency log, and the owner later verifies them with their own key, without trusting the agent's own logs.

The page's job is conversion-light: get a technical visitor excited enough to click through to the GitHub repo and read the spec. It is intentionally lean on copy and leans on graphics (an animated flow, a nested "anatomy" diagram, a comparison matrix) to carry the message. The repo and SPEC.md do the heavy lifting on detail.

Primary CTAs throughout: **View on GitHub** (`https://github.com/juanfiguera/sello`) and **Read the spec** (`https://github.com/juanfiguera/sello/blob/main/SPEC.md`).

## About the Design Files

The file in this bundle (`Sello.html`) is a **design reference created in HTML** — a working prototype that shows the intended look, layout, motion, and behavior. It is **not** production code to copy directly.

The task is to **recreate this design in the target codebase's environment**, using its established patterns and libraries. If the marketing site already lives in a framework (Next.js, Astro, plain static site, etc.), build it there using existing components and conventions. If no environment exists yet, choose the most appropriate stack for a content/marketing page — a static-site generator or a lightweight React/Astro setup is a natural fit, since the page has only one piece of real interactivity (the scroll-triggered flow animation).

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, motion, and copy are all specified here and in the HTML. Recreate the UI faithfully — exact colors, fonts, and the two signature graphics (receipt anatomy diagram, comparison matrix). The HTML source is the source of truth for any value not spelled out below.

A note on color format: the prototype uses **OKLCH** color values (e.g. `oklch(0.80 0.15 158)`). OKLCH is widely supported in current browsers. If your toolchain or browser-support matrix can't use it, convert each token to hex/RGB (approximate hex equivalents are listed in Design Tokens below) — but prefer keeping OKLCH if you can, since the palette was tuned in that space.

---

## Page Structure (top to bottom)

1. **Sticky nav** — brand + section anchors + GitHub button
2. **Hero** — headline, lead, pronunciation chip, CTAs, and an animated "verified-receipt.json" card with a wax-seal stamp
3. **The problem** — the "architectural inversion" argument, two-column
4. **How it works** — animated 4-step flow (Agent → Service → Transparency log → Owner)
5. **Anatomy of a receipt** — nested envelope diagram (COSE → HPKE → CBOR) + 3 explanatory notes
6. **What you can prove** — 4 guarantee cards + a "does not claim" strip
7. **Related work (Compare)** — 5-row comparison matrix
8. **Integration** — two columns of numbered steps (Service / Owner)
9. **CTA** — get-started commands + buttons
10. **Footer** — license line + links

---

## Screens / Views

This is a single responsive page. Below, each section is documented in turn.

### 1. Sticky Nav

- **Purpose:** persistent wayfinding + primary GitHub CTA.
- **Layout:** full-width, `position: sticky; top: 0; z-index: 50`. Inner row is max-width 1180px, `padding: 16px 40px`, `display: flex; justify-content: space-between; align-items: center`.
- **Background:** translucent page-bg via `color-mix(in oklch, var(--bg) 82%, transparent)` + `backdrop-filter: blur(14px)`. Bottom border `1px solid var(--line-soft)`.
- **Brand (left):** a circular "seal" mark (28px) + wordmark "Sello" in Space Grotesk 600, 19px.
  - The seal is pure CSS: a 28px circle with `1.5px` accent border, a `::before` 16px inner ring (`1px` accent-dim border), and a `::after` 5px solid accent dot centered. No image asset.
- **Links (right):** mono 13px anchors — "How it works", "Anatomy", "Compare", "Integrate" — color `--ink-2`, hover `--ink`. Then a ghost-style GitHub button with the GitHub mark (inline SVG, 15px).
- **Responsive:** at ≤760px the text anchors are `display: none`; only the brand and the GitHub button remain.

### 2. Hero

- **Purpose:** state what Sello is in one line; push to GitHub.
- **Layout:** `.hero` padding `110px 0 90px`. Two-column grid `1.15fr 0.85fr`, `gap: 64px`, vertically centered. Collapses to one column at ≤940px (`gap: 48px`).
- **Background:** a faint dotted/line grid (`.bg-grid`) absolutely positioned behind, radial-masked to fade out (visible toward the top-right). 56px grid cells, `--line-soft` lines, opacity 0.5.
- **Left column content:**
  - Eyebrow: mono 12px uppercase, letter-spacing 0.16em, accent color, with a 22px leading rule (`::before`). Text: "Protocol draft · v0.1".
  - H1: Space Grotesk 600, `clamp(36px, 5.4vw, 66px)`, `max-width: 14ch`, line-height 1.05, letter-spacing -0.02em. Text: "Receipts for what your agents **actually did.**" — the phrase "actually did." is wrapped in `.hl` (accent color).
  - Lead paragraph: Hanken Grotesk, 19px, `--ink-2`, `max-width: 52ch`. Text: "The services your agent calls sign an encrypted receipt for what they observed and publish it to a transparency log. Later, you verify it with your own key. No trust in the agent's own logs required."
  - Pronunciation chip: pill (`border-radius: 999px`, `1px` soft border, `6px 14px`), mono 12.5px, `--ink-3`. Contents: "SEH-yoh · Spanish: **a seal or stamp**" (the gloss in accent color).
  - CTA row (`gap: 14px`, wraps): primary button "View on GitHub" (with GitHub SVG) → repo URL; ghost button "See how it works" → `#how`.
- **Right column — the receipt card (`.receipt`):** the hero's signature graphic.
  - Container: `border-radius: 14px`, `1px solid --line` border, background `linear-gradient(180deg, --surface 0%, --bg-2 100%)`, large soft drop shadow `0 30px 80px -30px rgba(0,0,0,0.7)`.
  - Header bar: three 9px dots (`--line`) + mono 11.5px title "verified-receipt.json", bottom border `--line-soft`, padding `13px 16px`.
  - Body: mono 14px, line-height 1.85, padding `24px 22px 30px`. Renders a JSON object with syntax coloring:
    - keys (`.k`) → `--ink-3`
    - string values (`.s`) → `oklch(0.82 0.09 200)` (a cool blue)
    - `true` (`.true`) → accent green
    ```json
    {
      "service": "example.com/tool/v1",
      "action-type": "tools/call",
      "result-status": "success",
      "verified": true
    }
    ```
  - **Wax-seal stamp (`.receipt-stamp`):** absolutely positioned to **hang off the top-right corner** of the card (`top: -22px; right: -22px`, card uses `overflow: visible`), 80×80px circle, `1.5px` accent border + accent text, a page-bg ring (`box-shadow: 0 0 0 5px var(--bg), 0 0 0 6px var(--accent-bg)`), `--bg-2` fill, rotated `-12deg`. Contains a ✓ (18px) above the words "Sello verified". Hanging it off the corner (over empty space, not the body) guarantees it never overlaps the JSON text at any viewport width. Shrinks to 62px on mobile.
- **Animations on load:**
  - JSON lines (`.rline`) fade+rise in sequentially via staggered `animation-delay` (0.15s → 0.90s in 0.15s steps), 0.4s each.
  - The stamp animates in at 1.1s: `stampIn` scales from 1.8→1.0 while fading in, keeping the -12deg rotation (slight "stamping" pop via `cubic-bezier(.2,1.4,.4,1)`).

### 3. The Problem

- **Purpose:** make the case for why agent self-logging is untrustworthy.
- **Layout:** `.sec` (padding `96px 0`, top border `--line-soft`). Inner is `.problem-grid` — two columns `1.1fr 0.9fr`, `gap: 60px`, centered. One column at ≤880px.
- **Left:** eyebrow "The problem"; then a large display "quote" (Space Grotesk 500, `clamp(24px, 3.2vw, 38px)`, `max-width: 22ch`): "Most agent logs are written by _the same system_ whose behavior they describe." The phrase "the same system" uses class `.flag` — **a wavy underline in the danger color** (`text-decoration: underline wavy var(--danger); text-underline-offset: 6px; thickness 2px`), reading as "flagged," NOT a strikethrough. Below: a 17px `--ink-2` paragraph (`max-width: 46ch`): "If the agent, runtime, or operator is compromised, those logs can be incomplete or false. So Sello flips who holds the pen."
- **Right (`.invert` card):** mono 13.5px, `--bg-2` bg, `1px --line` border, `border-radius: 12px`, padding `26px`.
  - Label (`.lbl`): accent, mono 11px uppercase: "The architectural inversion".
  - Two rows, each `display: flex; gap: 12px`, a fixed 56px `--ink-3` label column (wide enough for "before") then text:
    - "before — agent writes **its own log**"
    - "after — service signs **the receipt it observed**" (the bold phrase in accent)
  - Footnote (`--ink-3`, 12.5px): "The service was present for the action, but sits outside the agent's logging path. It signs what it saw, and nothing it didn't."

### 4. How It Works — Animated Flow

- **Purpose:** show the end-to-end loop as a sequence.
- **Layout:** `.sec`. Section head (eyebrow "How it works" + H2 "One receipt, four hands, zero trust in the agent."). Then `.flow`: a 4-column grid (`repeat(4, 1fr)`), each node `margin: 0 8px`. Stacks to one column at ≤860px (nodes get `margin: 0 0 14px`).
- **Each node (`.node`):** `--bg-2` bg, `1px --line-soft` border, `border-radius: 12px`, padding `28px 24px 30px`.
  - Resting state: `opacity: 0.32; transform: translateY(10px)` (dimmed). Lit state adds `.lit`: full opacity, no translate, border brightens to `--line`.
  - Number chip (`.node-num`): 30px rounded square, mono 13px. When lit, it fills with accent bg + page-bg text.
  - Role label (`.role`): mono 10.5px uppercase, `--accent-dim`.
  - H3: Space Grotesk 600, 18px. Paragraph: 14px `--ink-2`.
  - Content per node:
    1. **Agent** — "Calls a service" — "Makes a request with its authorization token, carrying the owner's public key and trusted logs."
    2. **Service** — "Signs a receipt" — "Builds the receipt, encrypts it to the owner with HPKE, and signs the envelope with its own key."
    3. **Transparency log** — "Stores it" — "The signed envelope lands in an owner-trusted, append-only log that returns inclusion proofs."
    4. **Owner** — "Verifies it" — "Queries trusted logs, verifies inclusion and the signature, then decrypts with the private key."
  - Connectors: nodes 1–3 have a `.connector` (16px line + "→" glyph) on their right edge, hidden at ≤860px.
- **Animation (the key interaction):** triggered once when the flow scrolls ~40% into view (IntersectionObserver). Nodes light up sequentially at `350 + i*850` ms. A small pill token (`.flow-token`, accent outline + accent-bg) travels across, positioned over each node's top edge, relabeling at each step: `["call", "sign + seal", "store", "verify ✓"]`. After the last node it fades out (0.9s later). The token is JS-positioned relative to the flow container; reposition on resize. See the `<script>` at the bottom of the HTML for exact logic.

### 5. Anatomy of a Receipt

- **Purpose:** show the layered structure of a receipt as a graphic.
- **Layout:** `.sec`. Head: eyebrow "Anatomy of a receipt" + H2 "Signed on the outside. Sealed on the inside." Then `.anatomy-grid` — two columns `1fr 0.85fr`, `gap: 56px`, centered; one column at ≤900px.
- **Left — nested layers diagram:** three concentric rounded boxes, each with a corner label (`.layer-tag`, absolutely positioned top-left, mono 10.5px uppercase, `top: 12px; left: 16px`). Each layer has `padding-top: 40px` to clear its tag.
  - **Outer (`.layer-cose`):** `1px solid --accent-dim` border, bg `oklch(0.80 0.15 158 / 0.06)`. Tag (accent): "COSE_Sign1 envelope · signed by the service".
  - **Middle (`.layer-hpke`):** `1px dashed oklch(0.80 0.10 200 / 0.6)` border, bg `oklch(0.80 0.10 200 / 0.05)`. Tag (cool blue `oklch(0.80 0.10 200)`): "HPKE · encrypted to the owner".
  - **Inner (`.layer-cbor`):** `1px solid --line`, `--bg-2` bg. Tag (`--ink-3`): "CBOR receipt body". Contains a key/value field list (`.cbor-fields`, mono 13px, each row `display: flex; justify-content: space-between`, dashed bottom separators except last):
    - `service` → `example.com/tool/v1`
    - `action-type` → `tools/call`
    - `result-status` → `success`
    - `sello_token_ref` → `sha256:9f3c…`
  - Below the box: a `.log-tag` strip (mono 11.5px, `--bg-2`, `1px --line-soft`, `border-radius: 8px`): "▸ published to an append-only transparency log, returning an inclusion proof" (the ▸ in accent).
- **Right — three notes (`.anatomy-notes`):** each note has a 14px rounded color swatch + a 17px H3 + a 14.5px `--ink-2` paragraph. The swatch color ties back to the matching layer:
  - accent swatch — "The signature is the service's" — "A COSE_Sign1 envelope the service signs with its own key. It never needs the owner's private key."
  - cool-blue swatch (`oklch(0.80 0.10 200)`) — "The contents are the owner's" — "The body is HPKE-encrypted to the owner's public key, so only the owner can read what happened."
  - `--ink-3` swatch — "The record is public" — "The envelope sits in a transparency log. Anyone can confirm it exists; only the owner can decrypt it."

### 6. What You Can Prove — Guarantees

- **Layout:** `.sec`. Head: eyebrow "What you can prove" + H2 "Four things an owner can verify, independently." Then `.grants` — 2-column grid (`gap: 18px`), one column at ≤760px.
- **Each card (`.grant`):** `--bg-2` bg, `1px --line-soft`, `border-radius: 12px`, padding `24px`, `display: flex; gap: 16px`. Hover: border → `--line`, `translateY(-2px)`, bg → `--surface`.
  - Check badge: 26px circle, `1.5px` accent border, accent ✓.
  - H3 17px 600 + 14px `--ink-2` paragraph:
    1. "A specific service signed it" — "The COSE signature resolves to a known service signing key."
    2. "It was encrypted for you" — "The body is sealed with HPKE to your public key. Only you read it."
    3. "It is in a trusted log" — "Inclusion is checked against the transparency log's own proof."
    4. "The body was not changed" — "Any edit after signing breaks the signature. Signed equals read."
- **"Does not claim" strip (`.limits`):** dashed `1px --line` border, `border-radius: 12px`, padding `22px 26px`, `display: flex; flex-wrap: wrap; gap: 10px 28px`. A mono uppercase label "It does not claim" (`--ink-3`), then three inline items each prefixed with a danger-colored "×":
  - "the agent called every service it should have"
  - "that every service is honest"
  - "that an open log index is complete"

### 7. Related Work — Comparison Matrix

- **Purpose:** the persuasion centerpiece — show only Sello satisfies all four properties.
- **Layout:** `.sec`. Head: eyebrow "Related work" + H2 "Others get one or two of the four. Sello combines all four." Then a `.matrix-scroll` wrapper (`overflow-x: auto`) around a `<table class="matrix">`.
- **Table mechanics (important — this is where overflow bugs live):**
  - `table-layout: fixed`, `width: 100%`, `min-width: 660px`, `border-collapse: collapse`, font 14px.
  - A `<colgroup>` sets widths: first column (`col.c-row`) **40%**, the four property columns (`col.c-prop`) **15%** each.
  - Cells: `padding: 16px 14px`, centered, bottom border `--line-soft`.
  - First column cells (`.rowh`): left-aligned, Space Grotesk 600, 15.5px. **Must NOT use `white-space: nowrap`** — the description (`.desc`, block, Hanken 12px, `--ink-3`, line-height 1.45) must wrap inside the 40% column. (The original bug: `nowrap` on the cell was inherited by `.desc`, so descriptions spilled across columns.)
  - Property marks: `.yes` = accent ✓ (700, 17px); `.no` = `--ink-3` ✕ (15px); `.na` = a faint `--line` "·" (means "not stated").
  - The Sello row (`tr.sello`): accent-bg highlight, accent row-header text, accent-dim bottom border.
- **Header columns:** "Project" | "Signed by the service" | "Encrypted to the owner" | "Public transparency log" | "Per-action receipts" (the four property headers are mono 11px uppercase, bottom-aligned, with `<br/>` line breaks).
- **Rows (project · description · then the four marks):**
  | Project | desc | signed | encrypted | public log | per-action |
  |---|---|---|---|---|---|
  | Signet | "Co-signs MCP responses, kept in operator-controlled storage" | ✓ | · | ✕ | ✓ |
  | AgentROA | "Publishes to a SCITT log, but signs operator-side and in cleartext" | ✕ | ✕ | ✓ | ✓ |
  | Agent Receipts | "Signs on the agent-platform side" | ✕ | · | · | ✓ |
  | IETF SCITT | "The COSE_Sign1 transparency framework Sello builds on" | · | · | ✓ | ✓ |
  | **Sello** | "The receiver signs, encrypts to the owner, publishes publicly" | ✓ | ✓ | ✓ | ✓ |
- **Footnote (`.matrix-foot`, mono 11.5px `--ink-3`):** "Based on the repository's own related-work summary. Fuller prior-art discussion in [SPEC.md §12](https://github.com/juanfiguera/sello/blob/main/SPEC.md)." — accuracy note: these characterizations are the repo author's own framing; "·" deliberately marks properties the summary doesn't state, to avoid asserting false negatives. Keep this attribution.

### 8. Integration

- **Layout:** `.sec`. Head: eyebrow "Integration" + H2 "Two sides. Both drop in as middleware." Then `.bridge` — a 3-column grid `1fr 88px 1fr`: two cards flanking a center **spine**. The spine literalizes "two sides of one protocol": a horizontal rail (gradient `--line → --accent-dim → --line`) with two `▸` arrows pointing right (receipt flows Service → log → Owner) and a centered `.spine-node` chip — a small accent-bordered square icon labeled "log" (the shared transparency log). At ≤720px the grid collapses to one column and the spine becomes a vertical connector between the stacked cards.
- **Each card (`.col.col-card`):** `--bg-2` bg, `1px --line-soft`, `border-radius: 14px`, padding `30px 28px`. Contains an H3 (22px) with a small mono uppercase `.tag` pill (accent text, `1px --accent-dim` border) reading "Service" / "Owner", a `--ink-3` 14px subtitle, then a numbered `.steps` ordered list.
  - Step markers: CSS counter `decimal-leading-zero` (01, 02…) in accent mono, with a vertical connector line down the left (`::after`, hidden on the last item). Each step `padding-left: 44px`. Inline `<code>` spans use accent text on `--accent-bg`, `border-radius: 4px`.
  - **Service · "Emit a receipt"** (sub: "Wraps an existing request handler."):
    1. Verify the agent's token.
    2. Read `owner_hpke_pk` and `sello_logs` from it.
    3. Build a CBOR body for the action.
    4. Encrypt it to the owner with HPKE.
    5. Sign the COSE_Sign1 envelope.
    6. Publish to a trusted log.
  - **Owner · "Verify a receipt"** (sub: "A pull-based audit tool."):
    1. Query trusted logs by `sello_token_ref`.
    2. Confirm the `sello_log_url` matches.
    3. Verify log inclusion.
    4. Resolve the signing key from `kid`.
    5. Verify the COSE signature.
    6. Decrypt and display the body.

### 9. CTA

- **Layout:** `.cta`, centered, padding `110px 0 120px`, top border. Has its own centered, radial-masked `.bg-grid`.
- **Content:** eyebrow "Start here" (centered) → H2 (`clamp(30px, 4vw, 50px)`, `max-width: 18ch`) "Get one verified receipt working end to end." → 18px `--ink-2` paragraph (`max-width: 50ch`) "Skip Rekor, MCP middleware, and CLI polish for now. Land the local loop first. Everything else gets easier from there."
- **Commands card (`.cta-cmds`):** max-width 560px, `--bg-2`, `1px --line`, `border-radius: 12px`. Three rows (`.cmd`, `justify-content: space-between`, mono 14px, divided by `--line-soft`): the command on the left (the `node` keyword in accent via `.p`), a `--ink-3` description on the right.
  - `node --run demo` → "local end-to-end demo"
  - `node --run test` → "dependency-free tests"
  - `node --run bench -- --json` → "size & performance"
- **Buttons (`.cta-btns`, centered, wrap):** primary "View the repository" (GitHub SVG) → repo; ghost "Read the spec →" → SPEC.md.
- **Closing line:** mono 12.5px `--ink-3`: "Early draft. Issues and pull requests welcome. Adversarial review is the point."

### 10. Footer

- **Layout:** top border, padding `40px 0 60px`, inner `.foot-inner` `display: flex; justify-content: space-between; flex-wrap: wrap`.
- **Left:** a small 22px seal mark + mono 12px `--ink-3` license line: "Apache 2.0 · Service-signed encrypted receipts for AI agent actions".
- **Right (`.foot-links`):** mono 12px links (hover → accent): "GitHub", "SPEC.md", "Security review", "Top ↑".

---

## Interactions & Behavior

- **Scroll reveal:** every element with class `.reveal` starts `opacity: 0; translateY(18px)` and animates to visible (0.7s, `cubic-bezier(.2,.7,.3,1)`) when it crosses 12% into the viewport (IntersectionObserver, unobserved after firing). In a framework, reproduce with an intersection hook or a library like Framer Motion's `whileInView`.
- **Flow animation:** the centerpiece. Fires once at 40% visibility; sequential node light-up + traveling token (see Section 4). Must be idempotent (play once) and reposition the token on window resize.
- **Receipt card load animation:** staggered JSON line reveals + a delayed stamp "pop." These are pure CSS keyframe animations on page load (`.rline` / `stampIn`).
- **Hover states:** nav links (`--ink-2`→`--ink`), buttons (primary brightens + `translateY(-1px)`; ghost gets border + surface bg), guarantee cards (lift + brighten), footer links (→ accent).
- **Smooth scrolling:** `html { scroll-behavior: smooth }` for the in-page anchor nav.
- **All external links** open in a new tab (`target="_blank" rel="noopener"`).

## State Management

Minimal. The only stateful behavior is "has the flow animation already played" (a single boolean guard) and the IntersectionObservers. No data fetching, no forms, no routing beyond in-page hash anchors. In a component framework, the flow animation can be a small self-contained component with a `played` ref.

## Responsive Behavior

- Hero grid 2→1 col at ≤940px.
- Problem grid 2→1 at ≤880px; integration cols 2→1 at ≤880px; anatomy 2→1 at ≤900px.
- Flow 4→1 col at ≤860px (connectors hidden).
- Guarantees 2→1 at ≤760px; nav text links hidden at ≤760px.
- Comparison table stays at `min-width: 660px` and scrolls horizontally inside `.matrix-scroll` on narrow screens.
- At ≤640px: base font 16px, `.wrap`/nav padding 22px, reduced section/hero/CTA padding, stamp shrinks to 62px, hero lead 17px.

## Design Tokens

### Colors (OKLCH, with approximate hex)

| Token              | OKLCH                         | ~Hex      | Use                             |
| ------------------ | ----------------------------- | --------- | ------------------------------- |
| `--bg`             | `oklch(0.165 0.006 240)`      | `#101316` | page background                 |
| `--bg-2`           | `oklch(0.195 0.007 240)`      | `#15181c` | cards, raised panels            |
| `--surface`        | `oklch(0.215 0.008 240)`      | `#191d21` | hover / gradient top            |
| `--surface-2`      | `oklch(0.245 0.009 240)`      | `#1e2227` | (reserved)                      |
| `--line`           | `oklch(0.30 0.010 240)`       | `#272c31` | borders                         |
| `--line-soft`      | `oklch(0.26 0.009 240)`       | `#21262b` | subtle dividers                 |
| `--ink`            | `oklch(0.95 0.004 240)`       | `#eef0f2` | primary text                    |
| `--ink-2`          | `oklch(0.78 0.006 240)`       | `#b3b8bd` | secondary text                  |
| `--ink-3`          | `oklch(0.60 0.008 240)`       | `#7e858c` | muted/labels                    |
| `--accent`         | `oklch(0.80 0.15 158)`        | `#33d39a` | verified green — accents, CTAs  |
| `--accent-dim`     | `oklch(0.55 0.11 158)`        | `#1f8c66` | dim accent borders              |
| `--accent-bg`      | `oklch(0.80 0.15 158 / 0.10)` | —         | accent tint fills               |
| `--danger`         | `oklch(0.70 0.13 35)`         | `#e07a5f` | the "flag" underline, ✕, limits |
| cool blue (inline) | `oklch(0.80 0.10 200)`        | `#52c4d6` | HPKE layer + JSON strings       |

The palette is disciplined: a single cool-neutral dark scale, one accent (verified green), one danger hue, and one supporting cool-blue used only for the "encrypted" layer and JSON string values. Don't introduce additional hues.

### Typography

- **Display / headings:** "Space Grotesk", weights 400/500/600/700. Tight: `letter-spacing: -0.02em`, `line-height: 1.05` for large headings.
- **Body:** "Hanken Grotesk", weights 400/500/600. Base 17px, line-height 1.6.
- **Mono (labels, code, eyebrows, technical UI):** "JetBrains Mono", weights 400/500/600.
- Loaded from Google Fonts (see the `<link>` in `<head>`). In a real codebase, self-host these or use the project's font pipeline.
- Eyebrows/labels pattern: mono, ~11–12px, uppercase, `letter-spacing` ~0.12–0.16em, accent or muted.

### Spacing & Radius

- Container max-width **1180px**, side padding 40px (22px mobile).
- Section vertical padding **96px** (60px mobile); hero `110px/90px`; CTA `110px/120px`.
- Common gaps: 14–18px (cards/buttons), 48–64px (major columns).
- Border radius: buttons **7px**, small chips/badges **5–8px**, cards/panels **12px**, receipt card **14px**, pills **999px**.

### Shadows

- Receipt card: `0 30px 80px -30px rgba(0,0,0,0.7)` plus a hairline inset `0 0 0 1px rgba(255,255,255,0.02)`.
- Stamp ring: `0 0 0 4px var(--accent-bg)`.

### Motion

- Reveal: 0.7s `cubic-bezier(.2,.7,.3,1)`.
- Flow node light-up: staggered `350 + i*850ms`; token travel 0.55s `cubic-bezier(.4,0,.2,1)`.
- Stamp pop: 0.6s `cubic-bezier(.2,1.4,.4,1)` at 1.1s delay.
- Hover transitions: ~0.18–0.2s.

## Assets

- **No raster/image assets.** The only graphics are:
  - The **GitHub mark** — an inline SVG (16×16 viewBox) repeated in the nav, hero, and CTA buttons. Copy it from the HTML or use the project's icon set.
  - The **seal mark** — pure CSS (concentric circles), no file.
  - The **bg grid**, **receipt card**, **anatomy layers**, **comparison matrix**, and **flow** — all CSS/markup, no images.
- If the real site wants an OpenGraph/social image, that's net-new (the repo currently uses GitHub's auto-generated OG image).
- Fonts: Space Grotesk, Hanken Grotesk, JetBrains Mono (Google Fonts).

## Files

- `Sello.html` — the complete design reference (single self-contained file; all CSS in a `<style>` block in `<head>`, all JS in a `<script>` at the end of `<body>`). This is the source of truth for any detail not captured above.
