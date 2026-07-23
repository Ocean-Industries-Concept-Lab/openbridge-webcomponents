# Proposal: POI components must stop mutating consumer DOM

Status: draft for design review · Owner: AR/POI component family

## Problem

Three mechanisms in the POI family physically mutate light DOM the
consumer owns:

1. **Auto-grouping** — `obc-poi-layer` creates `obc-poi-group` elements
   in the consumer's light DOM and re-parents slotted targets into and
   out of them (`updateGrouping`).
2. **Selection FLIP** — `obc-poi-layer-stack` moves selected targets
   between layer elements (`moveTargetIntoSelectedLayer`,
   `animateTargetReturnToOrigin`).
3. **Header relocation** — `PoiBase`/`obc-poi` move `slot="header"`
   children into the inner button via MutationObserver because no real
   `<slot name="header">` chain exists.

Declarative renderers (React, Vue, Lit templates) assume they own their
children; when nodes move, reconciliation throws (`removeChild` on a
node that is no longer a child) or silently rebuilds state. The
reference AR application pays ~290 lines for this: an imperative POI
registry, an error boundary that exists only to swallow the library's
DOM exceptions, and a parallel unused declarative implementation.

## Goals

- Consumer-owned DOM is never re-parented, created into, or removed by
  the library.
- Grouping, selection FLIP animation, and header rendering keep their
  current visual behavior.
- A staged migration: additive first, breaking cleanup second.

## Options considered

### A. Shadow mirrors
Layers render internal mirror elements for every slotted target and
hide the originals. Rejected: duplicates every target subtree, breaks
event targets and a11y, doubles rendering cost.

### B. Manual slot assignment (recommended end-state)
Give the stack a shadow root with `slotAssignment: 'manual'`. POI
targets become direct children of the stack; each layer exposes a
`<slot>` in the stack's shadow tree; the stack calls `slot.assign()`
to place targets — including moving a selected target into the
selected layer's slot — **without touching light DOM**. Auto-groups
become shadow-internal chrome: the group frame renders inside the
layer's shadow root, and member targets are `assign()`ed to a
group-positioned slot.

Consequences:
- API change: targets are declared as stack children with a
  `layer="<name>"` attribute instead of nested inside layer elements
  (constraint of manual assignment: only host children can be
  assigned).
- FLIP measurement is unaffected (geometry comes from assigned
  rendering position, not tree position).
- Framework-owned children become fully supported; the imperative
  registry pattern becomes unnecessary.

### C. Controller-owned generation as the only dynamic path (shipped)
The `detections` API now supports variants, icons, state, and data
rows, making the controller path expressive enough for real
applications; the controller owns every element it creates, so
framework reconciliation never sees them. Slotted POI children remain
supported for static/imperative scenarios and are documented as such
(Framework Notes in controller/stack docs).

## Recommendation

- **Now (this release line):** Option C — already implemented — plus
  the documentation warnings. Consumers get a fully supported
  framework-safe path immediately.
- **Next major:** Option B for slotted usage. Prototype the manual
  slot assignment in the stack first (selection FLIP), then move
  grouping chrome into layer shadow, then replace header relocation
  with a real `<slot name="header">` chain through
  `PoiBase → obc-poi → obc-poi-button`.

## Migration sketch (Option B)

1. `obc-poi-layer-stack` gains `slotAssignment: 'manual'` shadow root
   and named layer slots; accepts targets as direct children with
   `layer` attributes. Old nesting keeps working via a compatibility
   pass that treats layer-nested targets as before (deprecated).
2. `obc-poi-layer` grouping renders group chrome in its shadow root;
   `obc-poi-group` stays for manual grouping but auto-groups no longer
   appear in light DOM.
3. Remove header MutationObserver relocation in favor of slot
   forwarding.
4. Delete the Framework Notes warnings once slotted usage is safe.

## Test plan

- Existing visual stories must render identically through each stage.
- New regression story: framework-managed children (a Lit `repeat`
  re-rendering targets every frame) with selection + grouping active —
  fails today, must pass after stage 1/2.
- The reference AR app swaps its imperative registry for plain
  declarative rendering as the acceptance test.
