# Handoff: peptide-site — kickoff, workflow, and hardware context

**Date**: 2026-08-14
**From**: Claude (session in `Online-Price-Comparator`, a sibling repo on the same machine)
**Why this file exists**: pkhunter is about to start a new session with you in *this*
repo (`peptide-site`), asking for the current static HTML/CSS/JS skeleton to be
rebuilt into a full TypeScript + React site, similar in engineering scope to
`/home/pkhunter/Repositories/Other/peptide-site`. This file carries over
the machine-wide hardware constraint and the working conventions from that other
session so you don't have to rediscover them.

---

## 1. Machine-wide hardware constraint (read this first, binding until told otherwise)

**The CPU's cooling has failed.** This is not specific to any one repo — it's a
property of the physical machine you're running on. New replacement hardware
(Ryzen 9 9950X3D + X870E Carbon) has been ordered and may already be installed by
the time you read this — **ask pkhunter to confirm current status before assuming
either way.**

### What's confirmed, as of the other session today
- `cargo build`/`npm run build`/`npm run dev`/general compiling and running the
  app are **fine** — no restriction there.
- **Never run any test-suite command** (`pytest`, `npm test`, `vitest`,
  `cypress run`, `just test`, or equivalent) **without pkhunter's explicit
  go-ahead for that specific run.** This is not theoretical: a background agent
  running tests coincided with a real crash/logout earlier today in the sibling
  `Online-Price-Comparator` session. A large box fan next to the case has
  "somewhat helped" per pkhunter but this is unverified under load and not a fix.
- Static/discovery-only checks are safe: `npm run lint`, `tsc --noEmit`,
  `vitest --run --reporter=dot --passWithNoTests` type dry-runs are *not* safe if
  they actually execute test bodies — when in doubt, prefer things that only
  parse/typecheck/collect, not things that run. If genuinely unsure whether a
  command executes tests, ask first rather than guessing.
- If a heavy command is genuinely necessary, ask first, keep it as small/short as
  possible, and be prepared for the session to end abruptly mid-command with no
  output — that's a crash, not a bug in what you ran.
- **This applies to every repo on this machine**, not just this one — if you
  delegate work to another CLI agent (see workflow below), this constraint must
  go in *every* delegation prompt explicitly, every time. Don't assume a fresh
  agent invocation already knows this.

---

## 2. Working conventions from the `Online-Price-Comparator` session (carry these over)

pkhunter has been running a specific multi-agent workflow on this machine today
that worked well. Recommend continuing it here unless told otherwise:

### Delegate implementation to other CLI agents, not more Claude subagents
This machine has `grok` (Grok Build / xAI), `codex` (OpenAI Codex CLI), and `agy`
(Gemini Antigravity CLI) installed and available via Bash. **Prefer delegating
substantial, self-contained implementation work to these tools over spawning
additional Claude subagents** (via the `Agent` tool) — Claude subagents share
this session's token budget and burn through it fast; the other CLIs are
separate tools/budgets. This repo likely has (or will get, if templated the same
way) `.agent/messages/{grok,chatgpt,gemini}_subagent_delegation.md` files
documenting the invocation syntax for each — check for them. If not present,
the syntax used successfully today:
- `grok --prompt-file <path> --cwd <dir> --always-approve --output-format plain`
- `codex exec -s workspace-write -C <dir> --skip-git-repo-check - < <prompt-file>`
- `agy --print "$(cat <prompt-file>)" --add-dir <dir> --dangerously-skip-permissions`

Write delegation prompts as complete, standalone briefs (the target agent shares
none of this conversation's context) — include exact contracts/interfaces
in full, exact file-path constraints (which files it may/may not touch, to avoid
collisions with concurrent work), the thermal/no-tests constraint verbatim, and
a request for it to actually verify its own work (run the dev server, curl it,
call the function directly) before reporting done. Review delegated work
yourself before trusting/committing it — treat it like a PR, not a trusted merge.
Real example from today: a delegated scraper's selectors were never actually
verified against live content (the target site was blocked in that agent's
sandbox), and it honestly said so rather than fabricating a fixture — but it
meant a manual verification pass was still needed before shipping.

### Git workflow
- Commit in small, logical, dependency-ordered steps (one concern per commit),
  not one giant commit — makes history readable and matches how pkhunter has
  asked for this before.
- Conventional Commits style (`feat(scope): ...`, `fix(scope): ...`,
  `docs(scope): ...`, `style: ...`), body explaining *why*, not just what.
- End every commit message with:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01NzT9drdwewmSc6Tc186cp6
  ```
  (swap in this session's actual URL when you have one).
- Only commit when explicitly asked; never push without explicit instruction.
- Validate before every commit: linter + typechecker clean (not full test runs,
  per the constraint above) + a real functional smoke-check where feasible
  (actually run the dev server, hit the page, check it renders — not just "it
  compiles").
- Watch for a pre-commit-hook-vs-local-tool version mismatch: today's session
  hit real churn where the locally-installed lint tool and the separately
  pinned pre-commit-hook version disagreed on formatting, causing repeated
  "fixed 1 error" loops on commit. If that happens, let the pre-commit hook's
  own auto-fix be authoritative (re-add + re-commit) rather than fighting it
  with the local tool's opinion.

### Memory / auto-memory system
If you have a persistent memory system available in this session (check for a
`memory/` dir path in your system prompt), the sibling session saved two
feedback memories worth checking for / replicating here if relevant:
1. Prefer delegating to grok/codex/agy over spawning Claude subagents (see above).
2. Never run test suites on this machine without explicit go-ahead (see §1).

---

## 3. What this repo actually is right now

`peptide-site` is currently a **static, vanilla HTML/CSS/JS skeleton** for
"PepCore Labs" — a research-peptide e-commerce site. No React, no TypeScript, no
build step at all today; `index.html` loads `style.css` and `script.js` directly,
`products.js` defines global `PRODUCTS`/`CATS` arrays consumed by `script.js`.

- `index.html` (484 lines) — full page markup: age-gate modal, announcement bar,
  header with cart/search icons, hero section, marquee, best-sellers carousel,
  catalog grid section, testing/analysis section, FAQ, footer.
- `products.js` (79 lines) — `CATS` (7 categories: GLP-1 Agonists, Growth
  Hormone & Antiaging, Cosmetic & Longevity, Healing & Recovery, Advanced Weight
  Loss, Specialty Blends & NAD+, Lab Essentials) and `PRODUCTS` (~65 products,
  each with name/category/icon-slug/variants-as-[size,price] pairs).
- `script.js` (259 lines) — vanilla DOM logic: age-gate (sessionStorage-gated),
  header scroll state, best-sellers carousel scroll buttons, catalog
  render/filter, cart (add/remove/qty, presumably localStorage-backed — verify),
  search toggle. All plain `document.getElementById`/event-listener style, no
  framework.
- `style.css` (504 lines) — hand-written CSS, BEM-ish class names
  (`.bs-card`, `.cart-drawer`, `.variant-row`, etc.), Inter font via Google Fonts.
- `assets/` — ~65 procedurally-generated SVG "vial" icons, one per product
  (gradient placeholder graphics, not real product photography).
- `tools/make_vials.py` — the Python generator script that produced those SVGs
  (gradient stop pairs per product, output to `assets/`). Not part of the
  site's runtime; a one-off asset-generation tool. Keep if you need to
  regenerate/add more product icons in the new stack; otherwise just port the
  already-generated SVGs as static assets.
- `README.md` — currently just the title, no content.
- `.agent/AGENTS.md` — **stale, wrong for this repo.** It's a verbatim copy of
  `peptide-site`'s AGENTS.md (references "Hyperion Corporation",
  Next.js App Router `app/content/<section>/`, VGP/graph-visualization product
  messaging — none of which applies here). This needs a full rewrite once the
  real architecture is decided, same class of issue as was found and fixed in
  `Online-Price-Comparator`'s own `.agent/AGENTS.md` earlier today. **Don't
  follow its current instructions** — they describe a different project.

No git history worth preserving carefully: 2 commits (`first commit`,
`Website files`), this is greenfield product work.

---

## 4. The reference project: `peptide-site`

Verified today (real `package.json`/directory listing, not just its AGENTS.md
claims):

| Component | Reality |
| --- | --- |
| Next.js | 14, App Router, `output: 'export'` (static export to `out/`, deployed to GitHub Pages) |
| React / TypeScript | 18 / 5, `strict: true` |
| Styling | Tailwind CSS 3 |
| Tests | Vitest (`test/unit/`, `test/integration/` with MSW) + Cypress (`test/cypress/e2e/`, `test/cypress/smoke/`) |
| Structure | `app/` (routes/layouts), `src/{configs,constants,enums,frameworks,graphql,hooks,interfaces,libraries,simulations,styles,utils}/`, `lib/` (build-time content loading), `public/`, `assets/` |
| Also present | `astro`, `aurelia`, `framer-motion`, `@tanstack/react-form`, a separate Docusaurus `docs/website/`, a `notebooks/` Python/uv workspace, `infra/` (docker/nginx/ansible/terraform), multi-forge CI (`.github/`, `.gitlab/`, `.gitea/`, `.forgejo/`) |

**Important scope-calibration flag for you to resolve with pkhunter, don't just
assume:** peptide-site is a *multi-framework showcase* site for a
software company whose product is dev tooling — the astro islands, Aurelia,
GraphQL, `simulations/`, Docusaurus docs site, and Python notebooks workspace
all exist because that's literally what Hyperion sells/demonstrates. None of
that is inherently relevant to a peptide e-commerce storefront. When pkhunter
says "similar in scope," clarify whether that means:
- (a) **engineering rigor/completeness bar** — Next.js+TS+React+Tailwind, a real
  test pyramid (unit/integration/e2e), CI, docs, multi-forge support, clean
  module boundaries — *without* literally replicating astro/aurelia/graphql/
  simulations/notebooks (my default read, given this is a shop, not a tooling
  demo), or
- (b) something closer to a literal structural clone including the extra
  frameworks, for consistency across pkhunter's repos.

Ask before committing to a stack shape — this materially changes `package.json`
and the whole module layout.

---

## 5. Content/domain sensitivity note (not a refusal, just awareness)

This is an existing, already-scoped business skeleton (not something you're
originating) — the existing copy already frames everything correctly as
"Research Use Only," EU-based, lab-testing/purity-focused, no dosage/medical-use
instructions for humans. When porting/extending content:
- Preserve that framing exactly; don't introduce human-dosing instructions,
  medical claims, or language implying the products are approved/safe for human
  consumption — stay consistent with the existing "research use only" positioning
  already established in `index.html`.
- Your job here is primarily the technical port (React/TS architecture,
  component structure, cart/catalog logic, build tooling) — if asked to write
  substantial new marketing/product copy, that's a reasonable thing to flag back
  to pkhunter for review rather than freelancing extensively on compliance-
  adjacent language.

---

## 6. Suggested first steps for the new session

1. Read this file, then read the current skeleton (`index.html`, `products.js`,
   `script.js`, `style.css`) in full yourself — this summary is not a substitute.
2. Ask pkhunter the scope-calibration question in §4 before writing any
   `package.json`/scaffolding — it's a real fork in the road, not a detail.
3. Ask whether to reuse the generated placeholder SVG vial icons as-is (port
   them into the new stack's `public/`/`assets/`) or whether real product
   imagery is planned later.
4. Confirm the age-gate/cart/localStorage behavior in `script.js` is the
   intended UX to preserve (vs. a chance to redesign) before porting it 1:1.
5. Rewrite `.agent/AGENTS.md` for real once the stack is decided (not urgent
   day one, but don't leave it describing Hyperion/VGP indefinitely — same
   category of trap that wasted early time in a previous session on a sibling
   repo).
6. Treat §1 (hardware) as binding until pkhunter says otherwise.

No React/TypeScript code exists yet in this repo — you're starting the actual
rebuild from a working static reference, not from nothing.
