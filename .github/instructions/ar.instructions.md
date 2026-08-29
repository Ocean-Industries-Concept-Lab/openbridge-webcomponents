---
applyTo: "packages/openbridge-webcomponents/src/ar/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/ar.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# AR / POI Overlay Components

The AR family renders **points of interest** over a live video or still image:
markers that track detected objects, resolve their own overlaps, and expand into
cards on interaction.

Every component here carries full class JSDoc, and Storybook autodocs surfaces
it. This file covers what no single component's JSDoc can: how the pieces
compose, and the traps that only show up across the family.

## Layering

Five levels, outermost first. Each owns exactly one concern; pushing logic up or
down the stack is the usual cause of bugs here.

```text
<obc-poi-controller>          geometry: maps detection coordinates onto the media
  └─ media slot: <video> / <img>
  └─ <obc-poi-layer-stack>    selection across layers
       └─ <obc-poi-layer>     overlap resolution + layer height
            ├─ <obc-poi-data> a target
            └─ <obc-poi-group> a cluster of targets
```

- **`obc-poi-controller`** — the only component that knows about the media. It
  observes the slotted `<video>`/`<img>`, tracks natural vs rendered size, and
  applies `fit` (`contain` | `cover`) so marker coordinates land on the right
  pixels. It also filters `detections` by `confidenceMin` and `classFilter`, and
  drives `frameIndex` for frame-by-frame playback. Nothing below it should read
  media dimensions. The projection math itself is the pure-function module
  `poi-projection/poi-projection.ts` (`computeMediaProjection`, `projectPoint`,
  `projectPointToLayer`, `projectBoxSize`), exported so applications that place
  their own targets use the same transform; the controller computes it once per
  sync pass. Each detection may carry `variant` (`data` | `vessel` | `aton`),
  `icon`, `state` and `data`; the controller creates the matching element and
  resets `state`/`data` when a later frame omits them.
- **`obc-poi-layer-stack`** — coordinates selection across sibling layers via
  `selection-mode`. Selection is a public API (`selectTarget`, `deselectTarget`,
  `clearSelection`, `selectedTargets`) plus a `selection-change` event; see
  [DOM ownership](#dom-ownership) for how it renders.
- **`obc-poi-layer`** — resolves overlaps and reports its computed height. This
  is where most layout behaviour lives. It emits `grouping-change`
  (`{clusters, front, behind, pregrouped}`, de-duplicated by signature) — the
  supported way to observe grouping; the `data-*` attributes it writes on
  targets are styling hooks, not an API.
- **`obc-poi-group`** — one cluster: collapsed trigger ↔ expanded spread.
- **`obc-poi-data` / `-vessel` / `-aton`** — individual targets. `x` and `y`
  both pass through a built-in low-pass filter (`xFilterCutoffHz` /
  `yFilterCutoffHz`, default 16 Hz, `0` disables); the controller forwards its
  own values when set.

## Overlap resolution: two strategies, not one

`obc-poi-layer`'s `overlapMode` picks between two genuinely different algorithms,
each with its own helper module. They do not share state, and a change to one
does not affect the other:

| Mode                 | Helper                                  | Behaviour                                                                                                                                                                     |
| -------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grouping` (default) | `poi-layer/poi-layer-grouping-utils.ts` | Builds overlap clusters and creates/removes **auto-groups**, preserving front / behind / pre-group states across the transition. Threshold set: enter, exit, pre, behind.     |
| `crossing`           | `poi-layer/poi-layer-crossing-utils.ts` | Leaves targets independent and continuously nudges their horizontal offsets so they stop crossing. Tracks previous positions, crossing order and last effective X per target. |

The grouping thresholds are layer CSS custom properties with real defaults:
`--obc-poi-layer-overlap-enter` 10px, `-exit` 18px (clamped to at least
`enter`), `-pre` 16px, `-behind` 10px. An explicit `0px` is respected. The
full table, including the three timing properties, is in the class JSDoc.

Auto-groups are created _by the layer_, not authored, and they are **shadow
chrome**: the `<obc-poi-group data-auto-group>` element lives in the layer's
shadow root and its members reach it by manual slot assignment (the layer's
shadow root uses `slotAssignment: 'manual'`; a nested `slot.auto-group-members`
inside each auto-group receives the cluster). Nothing is ever moved in the
consumer's light DOM. Reach auto-groups through the layer's `autoGroups`
accessor, typically after a `grouping-change` event — never by querying the
layer's children. A hand-placed `<obc-poi-group>` is respected and left alone
and keeps the light-DOM member model; `joinWhileExpanded` is the opt-in that
lets nearby targets join an already-expanded auto-group.

Consumers using a layer standalone must listen for **`layer-resize`** to keep
their own container height in sync — the layer cannot size its parent; inside
the stack / controller the container does this.

## DOM ownership

The contract every component in this family keeps: **POI components never
move, create or remove nodes in the consumer's light DOM.** Declarative
renderers (React, Vue, Lit) own the POI children they render; the library only
reads them, styles them, and assigns them to slots. Three mechanisms make that
hold:

| Concern     | How it renders without re-parenting                                                                                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headers     | `<slot name="header" slot="header">` forwarding chain from `obc-poi` / each `PoiBase` variant into `obc-poi-button`, which owns the header `state`.                                                                                                                                     |
| Selection   | The target stays a child of its home layer with `data-stack-selected`; the stack projects its button into the selected layer via `--obc-poi-button-projection-y` (and its pointer via `--obc-poi-target-projection-y`) and FLIP-animates the measured jump with the Web Animations API. |
| Auto-groups | Shadow chrome plus manual slot assignment, as described above.                                                                                                                                                                                                                          |

`poi/poi-dom-ownership.spec.ts` pins the contract (header identity, no
re-parenting on select/deselect, no light-DOM group injection, framework-style
node replacement). It is a browser spec: it runs under `npm run test:browser`
(CI `build.yml`), **not** in the `storybook` Vitest project, so
`npx vitest run --project storybook 'poi'` does not execute it. Do not run
`test:browser` locally — it hangs and leaves Chromium processes behind; rely on
CI for this file.

Anyone who located selected targets by querying the selected layer's children,
or auto-groups by querying `[data-auto-group]` in the light DOM, must switch to
`selectedTargets` / `selection-change` and `autoGroups` / `grouping-change`.

## Composition chain

A target is not one element. `obc-poi-data` extends `PoiBase` and renders:

```text
<obc-poi-data>            state + grouping attributes
  └─ <obc-poi>            positioning, line, pointer
       ├─ <obc-poi-button-data>   the interactive control
       └─ <obc-poi-line>          the leader line to the anchor point
```

`x` is the horizontal centre in layer px; `y` is the connector length in px
downward from the layer's bottom anchor (default `DEFAULT_LINE_LENGTH_PX`, 192,
shared by `obc-poi` and every variant). `projectPointToLayer` in the projection
module converts a media-space point into exactly these coordinates.

`obc-poi-object*` is the **visual marker** (icon, frame, size variant);
`obc-poi-button*` is the **interactive control**. They are different layers —
`obc-poi-object` has an `indicator` variant with no background frame at all,
which is display-only.

`poi-object/abstract-poi-object.ts` is the shared base: subclasses override only
the `icon` and `baseType` getters. New POI object variants belong there, not as
a fresh LitElement.

## Shared helper modules

| Module                             | Role                                                                                                                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `poi/poi-css-vars.ts`              | Reads touch/visual target sizes from CSS variables at runtime (`getTouchTargetSize`, `getVisualTargetSize`). Layout maths must go through these, never hard-coded px. |
| `poi/poi-visual-state.ts`          | `applyPoiVisualState` / `clearPoiVisualState` — the single place overlap visual state is written to a target.                                                         |
| `poi/poi-position.ts`              | `getEffectivePoiX` — a target's true horizontal position including any crossing offset. Both overlap strategies depend on it.                                         |
| `poi/poi-grouping-attrs.ts`        | `clearTargetGroupingAttributes` / `clearTargetGroupingStyles` — teardown when a target leaves a group. Skipping these strands attributes on the element.              |
| `poi-group/animation-utils.ts`     | Expand/collapse animation timing.                                                                                                                                     |
| `poi-projection/poi-projection.ts` | Pure media→screen projection (`cover`/`contain`), shared by the controller and exported for consumers. Its story reads the `@module` block via `moduleDocs()`.        |

## Traps

**The `header` slot is a forwarding chain, not a relocation.** `obc-poi` and
each `PoiBase` variant render `<slot name="header" slot="header">` into the
inner button; `obc-poi-button` resolves forwarded slots when it checks for
header content and re-renders on the bubbled `slotchange`. `obc-poi`'s
button-slot handler ignores `slotchange` events that bubble up from that nested
slot — without the `e.target !== e.currentTarget` guard it treats forwarded
header content as a custom button. Do not reintroduce a `MutationObserver` that
appends consumer nodes into a shadow root; that was the original React
reconciliation failure (#643).

**`positionVertical` is the `position-vertical` attribute.** The camelCase
property used to be observed as all-lowercase `positionvertical`, which the
layer had to probe in both spellings. Only the kebab-case form is observed now.

**`poi-line` reaches for raw colour primitives.** `building-blocks/poi-line/poi-line.css`
sets `--obc-poi-line-line-color: var(--base-blue-500)` and
`--obc-poi-line-outline-color: var(--base-blue-050)` — raw primitives rather
than semantic tokens. This is one of the handful of documented hot spots in the
two-layer colour model (see [`css-postcss.md`](../../docs/agents/css-postcss.md)), and it means a
consumer re-theming only the semantic layer will not repaint the POI line.

**`obc-poi-group` is the worked example of the missing-wrapper bug.** Its
`obc-poi-group-target-released` event was inferred by `cem analyze` from the
`dispatchEvent(...)` call and appeared in `custom-elements.json`, while the React
wrapper had **no binding for it at all** — because `lit labs gen` reads only
class-level JSDoc tags (issue #1109, fixed in PR #1110). The `@fires` tag is
present now. When adding an event anywhere in this family, tag it on the class:
a correct manifest is not evidence the wrappers can see it. See
[`jsdoc.md`](../../docs/agents/jsdoc.md).

**Events dispatched here bubble and compose deliberately.**
`obc-poi-group-target-released` crosses the shadow boundary so the layer can
re-insert the released target. Changing `bubbles`/`composed` on AR events breaks
layer coordination, not just consumer listeners.

## Testing

`_test-utils.ts` holds the shared AR test helpers. Overlap behaviour depends on
measured geometry, so stories that exercise grouping or crossing need stable
sizes — verify with the single-component visual test rather than the full suite:

```bash
npx vitest run --project storybook 'poi'
```

Snapshots here have a history of flipping between two renders. The cause is
`data-x-moving`, a `will-change` hint a target carries for ~120 ms after a
position update: whether it is still set at capture time changes how connector
lines and card text rasterize. `waitForStorySettle({drainTransitions: true})`
waits for the hint to expire (2 s deadline, so endlessly animating stories still
capture) — every story that groups, selects or moves targets should end its
`play` with it. Stories that animate forever carry `skip-test` (`AnimatedLayout`,
`AnimatedLayoutWithValues`, `Primary`) or `!snapshot`; that is the right tool
for a non-deterministic story, not for a flake in a settled one. One baseline,
`poi-controller › DetectionVariants`, still rasterizes in one of two
compositing states between the Docker image and this machine; it was taken from
the CI render.
