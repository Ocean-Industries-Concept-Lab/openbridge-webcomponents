---
name: testing-visual
description: Storybook config, visual snapshot baselines, and the vue-demo Playwright suite
globs:
  - packages/openbridge-webcomponents/.storybook/**
  - packages/openbridge-webcomponents/__vis__/**
  - packages/vue-demo/e2e/**
---

# Visual Testing and Storybook Config

## Run one component, not the suite

The full snapshot suite is slow and its failures are hard to attribute. Always
scope to the component you changed:

```bash
npx vitest run --project storybook 'component-name'
```

**Updating baselines — the filter must come BEFORE `--update`:**

```bash
npx vitest run --project storybook 'component-name' --update   # correct
npx vitest run --project storybook --update 'component-name'   # WRONG
```

Written after the flag, the name is consumed as the flag's value and the **full
suite runs in update mode**, silently rewriting unrelated flaky baselines. This
is the single most damaging mistake in this area.

Always re-run without `--update` afterwards to confirm the new baselines are
stable.

## Baselines are environment-sensitive

```text
__vis__/linux/__baselines__/    committed — what CI compares against
__vis__/linux/__results__/      local output, gitignored
__vis__/darwin/__baselines__/   macOS, NOT committed
```

Only the Linux baselines ship. Regenerating on macOS produces diffs CI will
reject.

**Prefer the CI path:** comment `/update-snapshots` on the pull request. The
`update-snapshots.yml` workflow regenerates inside the same Docker image CI
uses and pushes the result to the PR branch. Locally, the Docker route is
`npm run test-storybook:docker` — see
[IMPLEMENTATION_GUIDELINES.md § Docker Testing](../../IMPLEMENTATION_GUIDELINES.md#docker-testing)
and [`ci-and-release.md`](ci-and-release.md).

## Storybook config

`.storybook/` holds `main.ts`, `preview.tsx`, `manager.ts` (sidebar badges for
the lifecycle tags), `openbridgeTheme.ts`, and `vitest.setup.ts`, which wires the
snapshot project.

Two facts that bite:

- **Run `npm run analyze` before testing a new component's stories.** Storybook
  resolves story args to element properties through `custom-elements.json`;
  without it the args silently never reach the element.
- **Lifecycle badges are derived, never hand-written.** `meta.tags` mirrors the
  class JSDoc — see [`jsdoc.md`](jsdoc.md). Tooling tags (`autodocs`,
  `skip-test`, `!snapshot`) and version tags (`6.0`, `6.1`) stay hand-written.

Use `skip-test` to exclude a story from snapshot testing — appropriate for
anything genuinely non-deterministic rather than papering over a flake.

## vue-demo Playwright suite

`packages/vue-demo/e2e/` runs from that package:

```bash
npm run test:visual          # compare against committed baselines
npm run test:visual:update    # regenerate after an intended change
npm run test:visual           # ALWAYS re-run to confirm stability
```

- `e2e/visual/` is its own Playwright project (`--project=visual`); the
  functional suite `e2e/mainpage.spec.ts` ignores it and needs no baselines.
- **Determinism is engineered in** `e2e/visual/helpers.ts`: it freezes `Date`
  via `page.clock`, neutralises `setInterval` and `requestAnimationFrame` so
  simulations render a fixed first frame, stubs external data (weather, logos,
  QR), blocks other external origins, waits for network idle, and captures with
  `animations: 'disabled'` so transitions inside shadow DOM settle. New routes
  must go through these helpers or they will flake.
- **`/ecdis` and `/ar` are deliberately skipped** — a live WebGL map with an AIS
  stream, and CDN HLS video, cannot be frozen into a deterministic frame.
- Baselines live in `e2e/visual/__screenshots__/<platform>/` and are
  environment-sensitive in the same way as the core suite.

## Live harness stories (not snapshots)

Some behaviour cannot be pinned by a snapshot because it only appears at a
container shape, a zoom level or a resize sequence that no single story
captures. For those there are **live harness stories**: they measure the DOM on
an interval and print their own PASS/FAIL, and they carry `skip-test` so they
add no baselines.

`skip-test` is narrower than it sounds — it is a tag exclusion on the Storybook
**snapshot project** (`tags.exclude` in `vitest.config.ts`) and nothing else.
These stories are still bundled by `build_storybook`, still type-checked and
still linted, so a module-scope error in one breaks CI like any other file.

- **Building Blocks → Chart Sizing Battleground** — every chart subject
  (`gauge-trend` in five configurations, line/area graph, `automation-tank` in
  its chart modes, the bar and gauge building blocks) across nine container
  shapes, six zoom levels, and a resize sweep that counts distinct rendered
  sizes per step to catch a layout that rings instead of settling. Check it
  after any change to chart sizing or `chart-common.css`; see
  `line-area-charts.md` for the invariants it guards.

When adding one, keep the interval probes per-story and clear them before
starting new ones — a rerender otherwise leaves two probe loops running and the
readouts fight each other.

## Stuck browsers

Spawned Chromium processes sometimes hang and stall a run. Kill the strays and
re-run scoped to the single component rather than retrying the whole suite.
