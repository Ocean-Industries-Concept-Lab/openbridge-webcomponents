---
applyTo: "packages/openbridge-webcomponents/src/**,!packages/openbridge-webcomponents/src/icons/**,!packages/openbridge-webcomponents/src/generated/**,!packages/openbridge-webcomponents/src/manual-icon/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/working-method.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Working Method

The family docs say how each subsystem works. This one says how to approach a
change before the first edit, so that a fix in one file does not become a
regression in five others.

## The scale, and why a local fix is not a fix

| What                                               | Count       |
| -------------------------------------------------- | ----------- |
| Custom elements (`@customElement`, icons excluded) | 283         |
| Generated icon elements                            | 2 099       |
| Story files / committed Linux baselines            | 281 / 2 481 |
| Component CSS files                                | 228         |

Half a pixel matters ([IMPLEMENTATION_GUIDELINES.md § AI](../../IMPLEMENTATION_GUIDELINES.md#-ai)),
and a component is rarely alone: it has a compact twin, an orientation mirror,
a shared renderer, or three siblings that copied its first version. A change
applied to the file in front of you leaves the siblings where they were and
turns one behaviour into two — and the snapshots only catch the drift in the
components you re-ran. A Figma frame is a request to look, not a licence to
paste.

## Search before you write

Work down the list and stop at the first hit. Each step is a search, not a
judgement call.

1. **The helper exists.** The hubs, by number of importing files:

   | Helper                                                                               | For                                                                   | Importers                                                               |
   | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
   | `svghelpers/setpoint-mixin.ts`, `setpoint-bundle.ts`, `setpoint.ts`                  | setpoint properties, marker drawing, angular distance                 | 15 / 7 / 5                                                              |
   | `svghelpers/radial-frame.ts`                                                         | radial viewBox, container measurement, `observeInnerBox()`            | 15                                                                      |
   | `svghelpers/math.ts`                                                                 | `clamp`, `clampPercent`, `normalizeAngle`, `degToRad`, `radToDeg`     | 39                                                                      |
   | `svghelpers/arc-frame.ts`, `stroke-aware.ts`                                         | arc normalisation and zoom-to-fit; half-pixel non-scaling strokes     | 5 / 2                                                                   |
   | `charthelpers/` (`constants.ts`, `canvas-layout.ts`, `chart-common.css`)             | Chart.js layout, labels, the shared chart CSS                         | 5                                                                       |
   | `charthelpers/label-threshold.ts`                                                    | the chart resize observer: rebuild on a label-threshold crossing      | 5                                                                       |
   | `navigation-instruments/readout/readout-formatters.ts`                               | value formatting and the figure-dash placeholder (imports nothing)    | the readout stack                                                       |
   | `building-blocks/{instrument-linear,external-scale,circular-progress,readout-block}` | the pieces instruments compose                                        | 9 / 9 / 6 / 5                                                           |
   | `navigation-instruments/watch/watch.ts`                                              | everything more than one radial instrument draws                      | 6                                                                       |
   | `internal/tree-roving-navigator.ts`                                                  | roving tabindex for tree hosts                                        | 2                                                                       |
   | `src/mixins/*.css`                                                                   | PostCSS mixins — global, no import (`postcss.config.mjs` `mixinsDir`) | `font-body` 52, `font-label` 36, `card` 5, `scrollbar` 2, `readout-*` 2 |

   A `Math.min(Math.max(…))`, a `((a % 360) + 360) % 360`, a `* Math.PI / 180`
   or a hand-rolled `ResizeObserver` in a new file means this step was skipped:
   the first three are `svghelpers/math.ts`, the chart observer is
   `charthelpers/label-threshold.ts`.

2. **The sibling exists.** `npm run new:component` writes a blank element, an
   empty CSS file and a one-story file; it copies nothing. The next step is
   the nearest sibling — same directory, same base name with another suffix
   (`-indicator`, `-flat`, `-horizontal`), same Figma page. Read it whole
   ([`building-blocks.md`](../../docs/agents/building-blocks.md)) and start from its structure,
   its mixins, its story set and its JSDoc.

3. **The pattern exists elsewhere.** Search `src/` for the Figma property
   name, the CSS token, the event name and the JSDoc phrase; search
   `docs/agents/` for the family; run `git log -S'<symbol>'` for the last
   change to the same thing, and read the tracker (next section).

4. **Nothing exists.** Write it in the shared home — `svghelpers/`,
   `charthelpers/`, `src/mixins/`, or the family's `*-shared.ts` — with a
   spec, and import it. A local copy "for now" is how the table below was
   born.

## The history is part of the codebase

Decisions are DRY too. Rule 18 in `AGENTS.md` puts every design record in
the PR body and every open question in an issue, so the reasons behind the
code live in the tracker, not in comments — and a task that skips them
re-litigates a settled choice or rebuilds a parked PR. Before starting, and
before proposing anything, read the tracker for the component and the
family, months back, open and closed. Titles first — a listing costs a few
hundred tokens:

```bash
gh issue list --state all --search "<component>" --limit 40
gh pr list --state all --search "<component>" --limit 40
gh pr list --state merged --limit 60            # the last few months by eye
git log --oneline --since='3 months ago' -- src/<family>/
```

Then dig only where a title or description touches the task: `gh pr view N`
for the design record and its Alternatives section, `gh issue view N
--comments` for the decision and the cross-links, `gh pr diff N` when the
change itself matters. A closed issue is a decision; a closed unmerged PR is
a parked design with a tracking issue in its last comment; a merged PR's
"Follow-ups" is the list of what was deliberately not done. Cite what you
found as a trailing `(#1234)` and build on it — or say in the PR body why
this task departs from it.

## Known duplication — do not add to it

The copies a search would have prevented were folded into their homes
(#1210): `svghelpers/math.ts`, `charthelpers/label-threshold.ts`,
`src/mixins/readout.css`, `src/mixins/indeterminate-slide.css`, and the
`scrollbar` mixin applied where its body had been re-typed. One copy
remains, on purpose; never make a second:

| Copied                  | Where                                                                                                                                               | Until                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| a trimmed readout block | `automation/transmitter-button/transmitter-readout.ts`, with its own sign-aware hinted zeros (#1097 brings them to the block); the dash matches now | `obc-readout-block` leaves `@experimental`; then delete the module (#1209) |

`formatNumericValue` is the readout formatter (`readout-formatters.ts`); the
chart-side one is `formatChartNumber` (`charthelpers/canvas-layout.ts`).

## Fix the family, not the member

| Family              | Members                                                                               | Rule                                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compact twins       | ten `<name>` / `<name>-indicator` pairs                                               | no shared base class; consistency is a manual obligation, and a value-to-angle controller is imported, never re-derived ([`instrument-indicators.md`](../../docs/agents/instrument-indicators.md)) |
| Orientation mirrors | `bar-vertical` / `bar-horizontal`, `gauge-vertical` / `gauge-horizontal`              | ~85 lines differ out of ~500; the horizontal bar already carries `@availableWhen` tags the vertical lacks — change both, run both ([`building-blocks.md`](../../docs/agents/building-blocks.md))   |
| Round / flat        | `watch` / `watch-flat`, `compass` / `compass-flat`                                    | structurally different; reason twice, copy nothing                                                                                                                                                 |
| Coupled axes        | `pitch`, `roll`, `pitch-roll`, `pitch-roll-heave`, `pitch-roll-yaw`, `surge-sway-yaw` | each owns its `buildFrame` contract ([`watch-radial-instruments.md`](../../docs/agents/watch-radial-instruments.md))                                                                               |
| Rate of turn        | `rate-of-turn`, `rot-linear`, `rot-sector`, `rot-indicator`                           | one controller, four renderings                                                                                                                                                                    |
| Circular charts     | `pie`, `donut`, `polar`, `radial-bar`                                                 | one resize story, `observeLabelThreshold()` in `charthelpers/label-threshold.ts`                                                                                                                   |
| Readout stack       | `textbox` → `readout-block` → `readout-list-item` → `readout-list`, and `readout`     | a lower layer reaches every layer above it ([`readout-components.md`](../../docs/agents/readout-components.md))                                                                                    |
| Wrappers            | `-react`, `-vue`, `-ng`, `-svelte`                                                    | generated; `npm run wrappers`                                                                                                                                                                      |

A change is finished when every member of the family was either changed or
deliberately left alone with the reason in the PR body, and the snapshots of
all of them were re-run — the members you did not touch are the ones that
tell you something.

## Figma is the target, the code is the precedent

The design lives in the main OpenBridge 6.1 file, `kQMFf24Y1ry43HJWOStqd8`
(`https://www.figma.com/design/kQMFf24Y1ry43HJWOStqd8/OpenBridge-6.1?node-id=<id>`);
icons live in `IkDwOtza6OdjLbIdWA7mI7`
([IMPLEMENTATION_GUIDELINES.md § PostCSS](../../IMPLEMENTATION_GUIDELINES.md#-postcss)).
The Figma MCP and the plugin need Dev Mode, which some seats only get on a
personal copy of the file — so links from a copy circulate. Node ids are the
same in every copy: in a PR or issue, cite the node id on the main file (the
URL above) or the bare id, never a copy's link, and take only the id from a
link you receive.

Aim for 1:1 with that file and verify it the way
[`testing-visual.md`](../../docs/agents/testing-visual.md) describes: the cropped baseline
against every variant value. When the file and the code disagree, the order
of authority is:

1. **Generated artefacts follow Figma.** Icons, `variables.css`, `fonts.css`,
   `figmavariables.json`, `course-arrows-art.ts` — regenerate, never hand-edit
   ([`generated-code.md`](../../docs/agents/generated-code.md)).
2. **Deliberate code geometry and behaviour stay.** The ring radii in
   `watch.ts` sit 4 units inside the 6.1 canvas radii and icons anchor to the
   code band edges; the legacy `(176 + basePadding) * 2` viewBox is
   reproduced byte-identically
   ([`watch-radial-instruments.md`](../../docs/agents/watch-radial-instruments.md)). The pop-up
   readout keeps the value and fades the setpoint — the Figma variant that
   hides the value is an animation convenience of the design file
   ([`readout-components.md`](../../docs/agents/readout-components.md)). The state chip hugs its
   text because the 4 px padding Figma draws would shift layout on a live
   state change (`readout.css`).
3. **Figma names are not API names.** `Type9` became `capFiveBlade`
   (`watch/propeller.ts`); the `Type` and `Style` axes became `priority` and
   `barStyle` (`gauge-valve.ts`); the readout stack has its own vocabulary
   map ([`readout-components.md`](../../docs/agents/readout-components.md)). Name the property
   for what it does, and record the Figma axis in the JSDoc.
4. **A pasted SVG is edited, never shipped as is** — colour tokens,
   `vector-effect="non-scaling-stroke"`, fragments (`AGENTS.md` § 6). The
   generic vessel outline is a hand conversion because the Figma export bakes
   in a scaling inside stroke (`watch/vessels/generic-top.ts`).

Where the code wins, the disagreement is written at the site as
`TODO(designer): …` — what Figma shows, what the code does, why — and the
family doc carries the settled rule. Where nothing in the code decides it,
the design decides; a missing design is a `TODO(designer)` too, not a guess.

## Stop when something is missing

Brute force starts the moment a step cannot be done as intended. When that
happens, stop: say what is missing, what you would do with it, and wait for
input. Do not route around it, guess, or continue on a lesser path and
mention it at the end. Finish everything that does not depend on the answer
first, then ask once, with the options and a recommendation
(`AGENTS.md` § 2).

Tools and access:

- The Figma MCP or plugin is not authenticated, or the node needs Dev Mode
  the seat does not have — no design reading from screenshots or memory;
  ask for access or for the node's export.
- `FIGMA_TOKEN` is unset — `npm run download:icons` cannot run; an icon is
  never hand-drawn or copied from a screenshot.
- `OPENAI_API_KEY` is unset — `script/docgen` cannot run; do not draft the
  JSDoc "by hand instead" without saying so.
- `gh` is missing or unauthenticated — the tracker check (§ History) and the
  PR cannot be done; do not skip the check.
- No browser, Docker or devcontainer — no baselines to commit.

Decisions:

- The Figma file does not define the state, size or variant — `TODO(designer)`
  at the site, and ask; nothing is invented.
- The issue does not settle the API shape, the breaking change, or which
  family members to touch — ask with a short list of options.
- A review comment contradicts a verified finding — say so with the evidence
  (§ History); neither flip-flop nor silently ignore it.
- Two docs disagree — ask which is current instead of picking one.

## Accessibility, forwards and backwards

[`a11y.md`](../../docs/agents/a11y.md) is the bar for new interactive components and for any
existing one a change touches. Its § 9 says what runs automatically (nothing
yet, #1208) and which seven components to look at first.

## Pull requests

A Conventional Commits title that names what shipped; the template's sections
in order; up to three screenshots at the top — before / after, the variant
sweep, the story at 2× — so a reviewer sees the change before reading it. No
names or handles anywhere
([`coding-standards.md` § Writing style](../../docs/agents/coding-standards.md)). The
Verification section names the snapshot filters that ran and the a11y § 8
items checked.

## Model choice

Use the most capable current model your tool offers for anything that reads
the codebase or the design — implementation, review, the comment pass
([IMPLEMENTATION_GUIDELINES.md § AI](../../IMPLEMENTATION_GUIDELINES.md#-ai)).
A faster tier is for mechanical steps: formatting, `agents:sync`, regenerating
wrappers. `script/docgen` pins an OpenAI default; pass `OPENAI_MODEL` to the
current one ([`docgen.md`](../../docs/agents/docgen.md)).

## Open

- Retire `transmitter-readout.ts` onto `obc-readout-block` once its API settles (#1209, #1097).
- Automated accessibility checks (#1208).
