# Compass & Heading Center Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the spec at `docs/superpowers/specs/2026-07-23-compass-heading-center-content-design.md` — center readouts and HDG/COG arrow styles for `obc-compass`/`obc-heading`, a shared arrow module, a shared center-readout helper (with pitch-roll/compass-sector migration), and the CCRP vessel asset.

**Architecture:** New shared modules (`course-arrows`, `center-readout`) absorb existing per-instrument art/markup verbatim; instruments stay thin wrappers around `obc-watch`; all new behavior is opt-in with defaults that reproduce today's pixels. The only intentional visual diffs are the pitch-roll/compass-sector readout-markup migration.

**Tech Stack:** Lit 3 + TypeScript strict, PostCSS-free inline `css` for these components, Storybook + Vitest/Playwright visual snapshots.

## Global Constraints

- Working dir for all commands: `packages/openbridge-webcomponents/` unless noted. Branch: `feat/compass-heading-center-content`.
- Import `customElement` from `../../decorator.js`, never `lit/decorators.js`.
- No inline comments unless the code is impossible to understand otherwise; positive boolean names; `@availableWhen` on conditional props (syntax per AGENTS.md § 3).
- DO NOT touch: `watch/watch.ts` (except nothing), `svghelpers/radial-frame.ts`, `svghelpers/arc-frame.ts`, `watch/advice.ts`, setpoint layer. `watch/vessel.ts` gets one additive entry only (Task 7).
- Test cycle here = visual snapshots, not unit tests: `npx vitest run --project storybook '<name>'`; update baselines only via `--update` on the named component, then ALWAYS re-run without `--update` to confirm stability.
- Zero-diff gate: after Tasks 2–3 the suites for compass, heading, compass-sector, pitch-roll, rudder, gauge-radial, rot-sector must pass unchanged. Diffs are allowed ONLY in Tasks 5–6 (pitch-roll, compass-sector) and for brand-new stories.
- SVG rules: 512/center-256 coordinate space with `rotate(angle) translate(-256,-256)` wrappers, CSS-variable colors, `vector-effect="non-scaling-stroke"` on hairline strokes.
- Figma export steps use MCP `get_design_context` on the exact node IDs given; strip fills to the CSS variables named in each step. Where a step says "moved verbatim", copy the existing source range byte-for-byte — the repo, not this plan, is the source of truth for moved art (retyping long path data here would invite transcription drift; the byte-identical requirement makes the in-repo text authoritative).
- Commit after every task (Conventional Commits, `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer).

---

### Task 1: Baseline gate

**Files:** none (verification only)

- [ ] **Step 1: Run the targeted suites for the seven affected components**

Run (from `packages/openbridge-webcomponents/`):
```bash
npx vitest run --project storybook 'compass' 'heading' 'compass-sector' 'pitch-roll' 'rudder' 'gauge-radial' 'rot-sector'
```
Expected: all PASS (green baseline). Note: the `'compass'` filter also matches compass-sector/compass-flat stories — that is fine, more coverage.

- [ ] **Step 2: If anything fails, STOP** — the branch starts dirty; report instead of proceeding.

---

### Task 2: Shared arrow module (existing styles) + legacy shims

**Files:**
- Create: `src/navigation-instruments/course-arrows/course-arrows.ts`
- Modify: `src/navigation-instruments/compass/arrow.ts` (becomes shim)
- Modify: `src/navigation-instruments/heading/arrow.ts` (becomes shim)

**Interfaces:**
- Produces: `HdgArrowStyle {arrowHead, needle, vector, beamLine}`, `CogArrowStyle {arrowHead, needle, vector, velocityVector}` (vector/beamLine/velocityVector members declared now, art in Task 3), `hdgArrow(style, angle, priority=Priority.regular, radiusOffset=0): SVGTemplateResult`, `cogArrow(style, angle, priority=Priority.regular, radiusOffset=0): SVGTemplateResult`.
- Consumers unchanged: `compass.ts`, `heading.ts`, `compass-sector.ts` keep importing `{arrow, ArrowStyle}` from their current paths.

- [ ] **Step 1: Create `course-arrows.ts`**

```ts
import {SVGTemplateResult, svg} from 'lit';
import {Priority} from '../types.js';

export enum HdgArrowStyle {
  arrowHead = 'arrowHead',
  needle = 'needle',
  vector = 'vector',
  beamLine = 'beamLine',
}

export enum CogArrowStyle {
  arrowHead = 'arrowHead',
  needle = 'needle',
  vector = 'vector',
  velocityVector = 'velocityVector',
}

function arrowColor(priority: Priority): string {
  return priority === Priority.enhanced
    ? 'var(--instrument-enhanced-secondary-color)'
    : 'var(--instrument-regular-secondary-color)';
}

export function hdgArrow(
  style: HdgArrowStyle,
  angle: number,
  priority: Priority = Priority.regular,
  radiusOffset = 0
): SVGTemplateResult {
  const colorName = arrowColor(priority);
  switch (style) {
    case HdgArrowStyle.arrowHead:
      return svg`/* body moved VERBATIM from compass/arrow.ts HDG branch
                    (current lines 21-27: the <g transform="rotate(${'${angle}'})
                    translate(-256, ${'${-256 - radiusOffset}'})"> block) */`;
    case HdgArrowStyle.needle:
      return svg`/* body moved VERBATIM from heading/arrow.ts HDG branch
                    (current lines 20-29, incl. mask id
                    path-1-outside-1_18306_91613 unchanged) */`;
    case HdgArrowStyle.vector:
    case HdgArrowStyle.beamLine:
      return svg``; // implemented in Task 3
  }
}

export function cogArrow(
  style: CogArrowStyle,
  angle: number,
  priority: Priority = Priority.regular,
  radiusOffset = 0
): SVGTemplateResult {
  const colorName = arrowColor(priority);
  switch (style) {
    case CogArrowStyle.arrowHead:
      return svg`/* body moved VERBATIM from compass/arrow.ts COG branch
                    (current lines 29-41, incl. mask id
                    path-1-outside-1_133_32856 unchanged) */`;
    case CogArrowStyle.needle:
      return svg`/* body moved VERBATIM from heading/arrow.ts COG branch
                    (current lines 31-42, incl. mask id
                    path-1-outside-1_18306_91642 unchanged) */`;
    case CogArrowStyle.vector:
    case CogArrowStyle.velocityVector:
      return svg``; // implemented in Task 3
  }
}
```
The moved bodies keep their exact template text (`${angle}`, `${colorName}`, `${-256 - radiusOffset}` interpolations already line up: compass art uses `radiusOffset`, heading art has none and gains none — its `translate(-256,-256) rotate(...) scale(0.98)` wrapper is preserved untouched; `radiusOffset` is accepted and unused for center-anchored styles).

- [ ] **Step 2: Turn `compass/arrow.ts` into a shim**

```ts
import {SVGTemplateResult} from 'lit';
import {Priority} from '../types.js';
import {
  CogArrowStyle,
  HdgArrowStyle,
  cogArrow,
  hdgArrow,
} from '../course-arrows/course-arrows.js';

/** @deprecated Import `hdgArrow`/`cogArrow` from `course-arrows` instead. */
export enum ArrowStyle {
  HDG = 'HDG',
  COG = 'COG',
}

/** @deprecated Import `hdgArrow`/`cogArrow` from `course-arrows` instead. */
export function arrow(
  style: ArrowStyle,
  angle: number,
  priority: Priority = Priority.regular,
  radiusOffset = 0
): SVGTemplateResult | SVGTemplateResult[] {
  if (style === ArrowStyle.HDG) {
    return hdgArrow(HdgArrowStyle.arrowHead, angle, priority, radiusOffset);
  } else if (style === ArrowStyle.COG) {
    return cogArrow(CogArrowStyle.arrowHead, angle, priority, radiusOffset);
  }
  return [];
}
```

- [ ] **Step 3: Turn `heading/arrow.ts` into the analogous shim** (delegates to `HdgArrowStyle.needle` / `CogArrowStyle.needle`; signature stays `(style, angle, priority?)` — no `radiusOffset` param, exactly as today).

- [ ] **Step 4: Typecheck + zero-diff verification**

```bash
npm run typecheck && npx vitest run --project storybook 'compass' 'heading' 'compass-sector'
```
Expected: typecheck clean; ALL snapshots PASS with zero diffs (byte-identical refactor). If any pixel diff appears, the move was not verbatim — fix before proceeding.

- [ ] **Step 5: Commit** — `refactor(instruments): extract shared course-arrows module behind legacy arrow shims`

---

### Task 3: New arrow art (HDG vector/beamLine, COG vector/velocityVector)

**Files:** Modify: `src/navigation-instruments/course-arrows/course-arrows.ts`

**Interfaces:** fills the four enum branches left empty in Task 2; no signature changes.

- [ ] **Step 1: Export the four Figma variants' vector data**

Call MCP `get_design_context` (with `skillNames: figma-design-to-code`) on file `Tb5GjGfYoVIUrhXThL51A2`, nodes:
`18306:91621` (HDG Vector), `18306:91630` (HDG Beam-line), `18306:91650` (COG Vector), `18306:91656` (COG velocity vector).
Download each returned art asset (`curl -sL -o <name>.svg "<asset url>"`) into the session scratchpad; the art layers are the children named `shape`/`Shape` (ignore the ghost vessel/context layers). Reference geometry already verified: HDG ensemble spans y≈96→413 with beam crossbar ≈ x223–289 at y=256 and a center mark at (256,256); COG shaft runs y=256→~140 with open head tip near y≈96–135, head ≈ x240–272; the velocity vector stacks a second identical open head above the first.

- [ ] **Step 2: Implement the four branches**

Adaptation rules applied to the exported paths (complete wrapper shown; `d`/geometry attributes come from the Step 1 exports):

```ts
    case HdgArrowStyle.vector:
    case HdgArrowStyle.beamLine: {
      const withHead = style === HdgArrowStyle.vector;
      return svg`
        <g transform="rotate(${angle}) translate(-256, -256)">
          <!-- fore line, beam crossbar, center mark, dotted astern line:
               exported geometry from 18306:91621/91630, stroke=${'${colorName}'},
               dotted astern via stroke-dasharray from the export,
               vector-effect="non-scaling-stroke" on 1px strokes -->
          ${withHead
            ? svg`<path d="<exported arrowhead path>" fill=${colorName}
                    stroke="var(--border-silhouette-color)" stroke-width="1"
                    vector-effect="non-scaling-stroke"/>`
            : svg``}
        </g>
      `;
    }
```

```ts
    case CogArrowStyle.vector:
    case CogArrowStyle.velocityVector: {
      const doubleHead = style === CogArrowStyle.velocityVector;
      return svg`
        <g transform="rotate(${angle}) translate(-256, -256)">
          <!-- dashed shaft + open arrowhead from 18306:91650/91656,
               stroke=${'${colorName}'}, dash pattern from the export -->
          ${doubleHead ? svg`<path d="<second head path>" .../>` : svg``}
        </g>
      `;
    }
```
Requirements: no hard-coded hex colors (only `${colorName}` and `--border-silhouette-color`); dash patterns and stroke widths copied from the export; open arrowheads are stroked (`fill="none"`), matching the screenshots archived during design review; `radiusOffset` intentionally unused (center-anchored).

- [ ] **Step 3: Verify** — `npm run typecheck && npm run lint:eslint`; expected clean. (Visual verification lands with the Task 8–9 stories; the existing suites cannot change because nothing calls the new branches yet — re-run `npx vitest run --project storybook 'compass'` once to prove it: PASS, zero diffs.)

- [ ] **Step 4: Commit** — `feat(instruments): add vector, beam-line and velocity-vector arrow styles`

---

### Task 4: Shared center-readout helper

**Files:** Create: `src/navigation-instruments/readout/center-readout.ts`

**Interfaces (produced — later tasks depend on these exact names):**

```ts
export enum CompassReadoutSource { hdg = 'hdg', cog = 'cog', rot = 'rot' }

export interface CompassCenterReadout {
  source: CompassReadoutSource;
  label?: string;
  unit?: string;
  fractionDigits?: number;
  size?: ReadoutSize;
}

export interface CenterReadoutEntry {
  value: number | null;
  label: string;
  unit: string;
  fractionDigits?: number;
  size?: ReadoutSize;          // default large
  priority?: ReadoutPriority;
  centerValue?: boolean;
  centerMeta?: boolean;
}

export function resolveCompassCenterReadouts(
  readouts: CompassCenterReadout[],
  ctx: {
    heading: number;
    courseOverGround: number;
    rateOfTurnDegreesPerMinute?: number;
    priorityFor: (source: CompassReadoutSource) => ReadoutPriority;
  }
): CenterReadoutEntry[];

export function renderCenterReadouts(entries: CenterReadoutEntry[]): TemplateResult;

export const centerReadoutStyles: CSSResult;
```

- [ ] **Step 1: Implement the module**

```ts
import {CSSResult, TemplateResult, css, html, nothing} from 'lit';
import {
  ReadoutPriority,
  ReadoutSize,
  ReadoutStacking,
} from './readout.js';
import {renderInstrumentReadout} from './instrument-readout.js';

/* enums/interfaces exactly as in the Interfaces block above */

const SOURCE_DEFAULTS: Record<
  CompassReadoutSource,
  {label: string; unit: string}
> = {
  [CompassReadoutSource.hdg]: {label: 'HDG', unit: 'DEG'},
  [CompassReadoutSource.cog]: {label: 'COG', unit: 'DEG'},
  [CompassReadoutSource.rot]: {label: 'ROT', unit: '°/min'},
};

export function resolveCompassCenterReadouts(readouts, ctx) {
  return readouts.map((readout, index) => {
    const defaults = SOURCE_DEFAULTS[readout.source];
    let value: number | null;
    switch (readout.source) {
      case CompassReadoutSource.hdg:
        value = ctx.heading;
        break;
      case CompassReadoutSource.cog:
        value = ctx.courseOverGround;
        break;
      case CompassReadoutSource.rot:
        value = ctx.rateOfTurnDegreesPerMinute ?? null;
        break;
    }
    return {
      value,
      label: readout.label ?? defaults.label,
      unit: readout.unit ?? defaults.unit,
      fractionDigits: readout.fractionDigits ?? 0,
      size: readout.size ?? (index === 0 ? ReadoutSize.large : ReadoutSize.medium),
      priority: ctx.priorityFor(readout.source),
    };
  });
}

function renderEntry(entry: CenterReadoutEntry): TemplateResult {
  const size = entry.size ?? ReadoutSize.large;
  return renderInstrumentReadout({
    value: entry.value ?? undefined,
    label: entry.label,
    unit: entry.unit,
    fractionDigits: entry.fractionDigits,
    priority: entry.priority,
    size,
    stacking:
      size === ReadoutSize.large ? ReadoutStacking.inline : ReadoutStacking.stacked,
    centerValue: entry.centerValue ?? false,
    centerMeta: entry.centerMeta ?? false,
  });
}

export function renderCenterReadouts(entries: CenterReadoutEntry[]): TemplateResult {
  const [first, ...rest] = entries;
  if (!first) {
    return html`${nothing}`;
  }
  return html`
    <div class="center-readout-group">
      ${renderEntry(first)}
      ${rest.length > 0
        ? html`
            <div class="center-readout-divider"></div>
            <div class="center-readout-secondary-row">
              ${rest.map((entry) => renderEntry(entry))}
            </div>
          `
        : nothing}
    </div>
  `;
}

export const centerReadoutStyles: CSSResult = css`
  .center-readout-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    gap: 8px;
  }

  .center-readout-divider {
    align-self: stretch;
    height: 1px;
    background: var(--border-divider-color);
  }

  .center-readout-secondary-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
  }
`;
```
(The dash for a `null` value comes from `obc-readout` itself: `renderInstrumentReadout` maps `value ?? null`.)

- [ ] **Step 2: Verify** — `npm run typecheck`; expected clean.

- [ ] **Step 3: Commit** — `feat(instruments): add shared center-readout cluster helper`

---

### Task 5: Migrate pitch-roll onto the helper (intentional small diffs)

**Files:** Modify: `src/navigation-instruments/pitch-roll/pitch-roll.ts` (markup ~lines 215-231, `renderReadout` ~236-249, styles ~769-786)

**Interfaces:** public API unchanged (`hasReadout`, `pitchLabel`, `rollLabel`, `unit`, `fractionDigits`).

- [ ] **Step 1: Replace the readout cluster**

Markup replacement (both readouts stay `size: large`, matching today):
```ts
${this.hasReadout
  ? html`<div class="readout">
      ${renderCenterReadouts([
        {
          value: this.pitch,
          label: this.pitchLabel,
          unit: this.unit,
          fractionDigits: this.fractionDigits,
          size: ReadoutSize.large,
          priority: this.priorityFor(PitchRollPriorityElement.pitch),
        },
        {
          value: this.roll,
          label: this.rollLabel,
          unit: this.unit,
          fractionDigits: this.fractionDigits,
          size: ReadoutSize.large,
          priority: this.priorityFor(PitchRollPriorityElement.roll),
        },
      ])}
    </div>`
  : nothing}
```
Delete the private `renderReadout` method and the `.readout-group`/`.readout-divider` CSS blocks; keep `.readout` (flex-center positioning). Append `centerReadoutStyles` to the component styles: `static override styles = [centerReadoutStyles, css\`…existing…\`]`. Add the imports (`renderCenterReadouts`, `centerReadoutStyles`, `ReadoutSize`).
Note: the second entry now renders inside `.center-readout-secondary-row` — with `size: large` explicitly set, visual change is limited to the new 8px gaps.

- [ ] **Step 2: Run, inspect, update baselines**

```bash
npx vitest run --project storybook 'pitch-roll'
```
Expected: `WithReadout` / `ZoomedInWithReadout` FAIL with small diffs (gap spacing). Inspect the diff images (`__vis__/…/__diffs__`) — only readout-cluster spacing may differ; anything else (vessel, arcs, zoom) is a regression: fix first. Then:
```bash
npx vitest run --project storybook --update 'pitch-roll' && npx vitest run --project storybook 'pitch-roll'
```
Expected: final run PASS (stable new baselines).

- [ ] **Step 3: Commit** — `refactor(pitch-roll): render center readouts via shared cluster helper` (mention intentional baseline updates in the body).

---

### Task 6: Migrate compass-sector onto the helper (intentional small diffs)

**Files:** Modify: `src/navigation-instruments/compass-sector/compass-sector.ts` (~lines 553-565)

**Interfaces:** public API unchanged (`hasReadout`, `label`, `unit`, `fractionDigits`); the computed `top: ${this._readoutTopPercent}%` wrapper stays.

- [ ] **Step 1: Replace the single-readout markup**

```ts
${this.hasReadout
  ? html`<div class="readout" style="top: ${this._readoutTopPercent}%">
      ${renderCenterReadouts([
        {
          value: this.heading,
          label: this.label,
          unit: this.unit,
          fractionDigits: this.fractionDigits,
          size: ReadoutSize.large,
          priority: this.priorityFor(CompassSectorPriorityElement.hdg),
          centerValue: true,
          centerMeta: true,
        },
      ])}
    </div>`
  : nothing}
```
Append `centerReadoutStyles` to the component's styles array and add imports. Remove the now-unused direct `renderInstrumentReadout` import if nothing else uses it.

- [ ] **Step 2: Run, inspect, update baselines** — same command sequence as Task 5 with `'compass-sector'`. Expected: `WithReadout` may diff by the group wrapper only; zoom stories must not change outside the readout box.

- [ ] **Step 3: Commit** — `refactor(compass-sector): render readout via shared cluster helper`

---

### Task 7: CCRP vessel asset (additive)

**Files:** Modify: `src/navigation-instruments/watch/vessel.ts`

- [ ] **Step 1: Export Figma node `208:29931`** (PSV Top, `ccrp=true`) via `get_design_context`; download the hull SVG asset.

- [ ] **Step 2: Add the enum member + template**

Insert alphabetically among existing members: `psvTopCcrp = 'psv-top-ccrp'` in `VesselImage`, and a `vesselImages[VesselImage.psvTopCcrp]` template in the same 160×160 box as `psvTop`. Inspect `psvTop`'s template first and reuse its exact color tokens; dashed outline via `stroke-dasharray` values from the export. No other entries change.

- [ ] **Step 3: Verify** — `npm run typecheck && npx vitest run --project storybook 'watch'`; expected clean/zero diffs (nothing renders the new member yet).

- [ ] **Step 4: Commit** — `feat(watch): add CCRP vessel image (psv-top-ccrp)`

---

### Task 8: Extend `obc-heading`

**Files:**
- Modify: `src/navigation-instruments/heading/heading.ts`
- Modify: `src/navigation-instruments/heading/heading.stories.ts`

**Interfaces:**
- Consumes: `hdgArrow`/`cogArrow` + style enums (Task 2/3), `CompassCenterReadout`/`CompassReadoutSource`/`resolveCompassCenterReadouts`/`renderCenterReadouts`/`centerReadoutStyles` (Task 4), `VesselImage`/`VesselImageSize` (watch), `WatchCircleType`.
- Produces: new public props `vesselImage`, `centerReadouts`, `hdgArrowStyle`, `cogArrowStyle`; re-exports `{CompassCenterReadout, CompassReadoutSource, HdgArrowStyle, CogArrowStyle}`.

- [ ] **Step 1: Properties + derived face**

```ts
/** Vessel silhouette shown in the center, rotating with heading. Hidden while `centerReadouts` is non-empty. */
@property({type: String}) vesselImage: VesselImage | undefined;
/** Center readouts replacing the vessel; first entry on top, others below the divider. */
@property({type: Array, attribute: false})
centerReadouts: CompassCenterReadout[] = [];
/** HDG arrow style (default `needle`, today's look). */
@property({type: String}) hdgArrowStyle: HdgArrowStyle = HdgArrowStyle.needle;
/** COG arrow style (default `needle`, today's look). */
@property({type: String}) cogArrowStyle: CogArrowStyle = CogArrowStyle.needle;

private get hasCenterReadouts(): boolean {
  return this.centerReadouts.length > 0;
}

private get watchCircleType(): WatchCircleType {
  return this.vesselImage !== undefined || this.hasCenterReadouts
    ? WatchCircleType.double
    : WatchCircleType.single;
}
```
`priorityFor` gains a source overload mapping `CompassReadoutSource.hdg|cog` onto `HeadingPriorityElement.hdg|cog` and returning `Priority.regular` for `rot` (heading has no ROT element or input; a `rot` entry renders a dash — documented on `centerReadouts`).

- [ ] **Step 2: Render changes**

In `render()`: pass `.watchCircleType=${this.watchCircleType}`; add `.vessels=${this.vesselImage !== undefined && !this.hasCenterReadouts ? [{size: VesselImageSize.medium, vesselImage: this.vesselImage, transform: \`rotate(\${this.heading}deg)\`}] : []}`; replace the two `arrow(...)` calls with `hdgArrow(this.hdgArrowStyle, this.heading + (this.getRotation() ?? 0), this.priorityFor(HeadingPriorityElement.hdg))` and the COG analogue; after the overlay `<svg>` add:
```ts
${this.hasCenterReadouts
  ? html`<div class="center-readout-overlay">
      ${renderCenterReadouts(
        resolveCompassCenterReadouts(this.centerReadouts, {
          heading: this.heading,
          courseOverGround: this.courseOverGround,
          priorityFor: (source) => this.readoutPriorityFor(source),
        })
      )}
    </div>`
  : nothing}
```
Styles: append `centerReadoutStyles` plus
```css
.center-readout-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
```
(the overlay div joins `.container > *` absolute stacking).

- [ ] **Step 3: JSDoc + docs fix (user-approved)** — replace the bare `@stable` class JSDoc with the compass-standard block (summary, Features, Usage Guidelines, Example, `@ignition-base-*`, `@stable`); inline docs + `@availableWhen` on every conditional prop (`vesselImage`: none needed — multi-path? it is gated only by `centerReadouts==[]`, so document with `@availableWhen centerReadouts==[]`… NOT valid syntax per AGENTS — use prose in the doc line instead since array-emptiness conditions are not in the `@availableWhen` grammar; keep `@availableWhen` for the setpoint family already inherited).

- [ ] **Step 4: Stories** — meta `tags: ['autodocs', '6.0']`; argTypes: `hdgArrowStyle`/`cogArrowStyle` `select` over enum values, `vesselImage` `select` over `topVessels`, `centerReadouts` `object`. New stories:

```ts
export const WithVessel: Story = {
  args: {vesselImage: VesselImage.psvTop, hdgArrowStyle: HdgArrowStyle.arrowHead, cogArrowStyle: CogArrowStyle.arrowHead},
};
export const WithCenterReadout: Story = {
  args: {
    centerReadouts: [
      {source: CompassReadoutSource.hdg},
      {source: CompassReadoutSource.cog, size: ReadoutSize.large},
    ],
    hdgArrowStyle: HdgArrowStyle.arrowHead,
    cogArrowStyle: CogArrowStyle.arrowHead,
    priority: Priority.enhanced,
  },
};
export const WithVectorArrows: Story = {
  args: {vesselImage: VesselImage.psvTopCcrp, hdgArrowStyle: HdgArrowStyle.vector, cogArrowStyle: CogArrowStyle.vector},
};
```

- [ ] **Step 5: Verify**

```bash
npm run typecheck && npm run lint && npx vitest run --project storybook 'heading'
```
Expected: existing heading stories PASS with zero diffs (defaults unchanged); the three new stories fail as "no baseline" → add + confirm:
```bash
npx vitest run --project storybook --update 'heading' && npx vitest run --project storybook 'heading'
```
Then `npm run analyze` (new props → manifest).

- [ ] **Step 6: Commit** — `feat(heading): vessel, center readouts and arrow styles; document component`

---

### Task 9: Extend `obc-compass`

**Files:**
- Modify: `src/navigation-instruments/compass/compass.ts`
- Modify: `src/navigation-instruments/compass/compass.stories.ts`

**Interfaces:** consumes the same modules as Task 8; produces `hdgArrowStyle` (default `HdgArrowStyle.arrowHead`), `cogArrowStyle` (default `CogArrowStyle.arrowHead`), `centerReadouts`; re-exports the shared types like heading.

- [ ] **Step 1: Properties** — same block as Task 8 Step 1 minus `vesselImage` (already exists) and minus the derived face (compass stays `triple`); defaults `arrowHead`/`arrowHead`. `readoutPriorityFor(source)` maps hdg/cog/rot onto the existing `CompassPriorityElement` members. Vessel hiding: change the `.vessels=` binding to `${this.hasCenterReadouts ? [] : [ …existing entry… ]}`. `rateOfTurnDegreesPerMinute` feeds the resolver context.

- [ ] **Step 2: Render** — replace `arrow(ArrowStyle.HDG|COG, …)` with `hdgArrow(this.hdgArrowStyle, …)`/`cogArrow(this.cogArrowStyle, …)` (same angle/priority expressions); add the same `.center-readout-overlay` block and styles as Task 8 Step 2.

- [ ] **Step 3: JSDoc** — Features gains "Center readouts" and "Arrow styles" bullets; `vesselImage` doc gains the hidden-while-readouts note; `CompassCenterReadout` fields documented at the type (Task 4 file).

- [ ] **Step 4: Stories** — argTypes additions like Task 8; new stories:

```ts
export const WithCenterReadout: Story = {
  args: {centerReadouts: [{source: CompassReadoutSource.hdg}]},
};
export const WithTwoPrimaryReadouts: Story = {
  args: {centerReadouts: [
    {source: CompassReadoutSource.hdg},
    {source: CompassReadoutSource.cog, size: ReadoutSize.large},
  ]},
};
export const WithPrimarySecondaryReadouts: Story = {
  args: {centerReadouts: [
    {source: CompassReadoutSource.hdg},
    {source: CompassReadoutSource.cog},
  ]},
};
export const WithThreeReadouts: Story = {
  args: {centerReadouts: [
    {source: CompassReadoutSource.hdg},
    {source: CompassReadoutSource.cog},
    {source: CompassReadoutSource.rot},
  ]},
};
export const MapGraphics: Story = {
  args: {
    vesselImage: VesselImage.psvTopCcrp,
    hdgArrowStyle: HdgArrowStyle.vector,
    cogArrowStyle: CogArrowStyle.arrowHead,
    rotType: RotType.bar,
    rotPosition: RotPosition.innerCircle,
    rateOfTurnDegreesPerMinute: 20,
    showLabels: true,
    tickmarksInside: false,
  },
};
export const WithHdgArrowStyles / WithCogArrowStyles — a render() story laying
four <obc-compass> side by side, one per enum value (pattern: SizingPlayground's
render-function style), tags: ['skip-test'] only if the ROT animation makes
them unstable; otherwise snapshot them.
```

- [ ] **Step 5: Verify** — same sequence as Task 8 Step 5 with `'compass'`; existing compass stories must be zero-diff; MapGraphics baseline compared visually against the archived Figma screenshot (`node 4668:71176`) for composition sanity (vessel dashed, HDG vector w/ beam crossbar + dotted astern, COG open arrowhead, ROT bar on band). Run `npm run analyze`.

- [ ] **Step 6: Commit** — `feat(compass): center readouts, arrow styles and map-graphics recipe`

---

### Task 10: Finalize, full gate, PR

- [ ] **Step 1: Full verification**

```bash
npm run lint && npm run typecheck && npm run analyze && npx vitest run --project storybook 'compass' 'heading' 'compass-sector' 'pitch-roll' 'rudder' 'gauge-radial' 'rot-sector'
```
Expected: all green; `git status` clean except intended files; `custom-elements.json` regenerated (git-ignored — do not commit it).

- [ ] **Step 2: Push + PR**

```bash
git push -u origin feat/compass-heading-center-content
gh pr create --base develop --title "feat(instruments): compass & heading center readouts, arrow styles and map graphics" --body-file <condensed spec>
```
PR body = condensed spec (per user request): Summary bullets (§ 1), the `centerReadouts`/arrow-style API blocks, the migration + snapshot-diff note (§ 3), the zoomToFitArc/compass-sector analysis (§ 9), Figma node table (§ 2), ending with the required `🤖 Generated with [Claude Code](https://claude.com/claude-code)` footer.

---

## Self-review notes (performed at write time)

- Spec coverage: § 4→Tasks 2–3; § 5→Task 4; § 3 migration→Tasks 5–6; § 8→Task 7; § 7→Task 8; § 6→Task 9; § 10 stories→Tasks 8–9; § 11→Tasks 1, 10. `doubleThin` check (spec § 7) folded into Task 8 Step 5 visual review.
- Verbatim-move steps intentionally reference in-repo line ranges instead of duplicating ~200 lines of path data — the byte-identical requirement makes the repo text authoritative (rationale in Global Constraints).
- Type consistency: `resolveCompassCenterReadouts` ctx uses optional `rateOfTurnDegreesPerMinute` (absent on heading), `priorityFor` returns `ReadoutPriority` (= `Priority`) in both consumers.
