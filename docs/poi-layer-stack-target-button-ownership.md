# POI Stack Target and Button Ownership

## Purpose

This document records the intended behavior for AR POI stacking, selection, and
layer switching so the implementation can be aligned with the desired mental
model.

The goal is to match these product intentions:

- Computer vision detections must stay pinned to the correct target location.
- Selecting a POI may visually move the button into another layer.
- Moving the button between layers must not reinterpret or offset the target Y.
- The line should connect the target and the button, not define either of them.
- DOM reparenting should not be used as an implicit coordinate system.

## Problem Summary

The current code mixes three concerns:

1. Geometry ownership
2. Visual layer placement
3. DOM movement and animation compensation

This makes the Y-axis logic hard to reason about.

Today, the vertical model in `obc-poi` is effectively:

- The host is vertically positioned from `buttonY`
- The target anchor is then reconstructed relative to the button
- The final target ends up at `y` only because the math cancels out

That cancellation is mathematically valid, but it hides ownership. Once a POI is
reparented into another layer, the code becomes difficult to reason about because
the DOM structure starts affecting how the final screen position is recovered.

## Current Model

The current implementation behaves roughly like this on the Y axis:

- `y` is treated as the absolute target position
- `buttonY` is treated as the absolute button position
- the host is moved by `buttonY`
- the target anchor is moved by `y - buttonY`
- the line and pointer are derived from the difference

In formula form:

```text
hostY = buttonY
targetAnchorY = y - buttonY
finalTargetScreenY = hostY + targetAnchorY = y
```

This means the implementation is correct only if all of the following remain
true:

- the host transform is reliable
- the internal target-anchor transform is reliable
- the parent layer change does not alter the meaning of those transforms

That is exactly the area that becomes fragile during stack selection and DOM
reparenting.

## Intended Model

The desired behavior is better expressed by separating the POI into two
different endpoints:

- Target endpoint
- Button endpoint

The connector line is then computed between those endpoints.

This means the Y-axis should be understood as:

- `targetY` is the computer vision detection point
- `buttonY` is the visual button position in the active layer context
- neither one should silently derive the other
- the line spans between them

This is not the same as the current model, where the host position is used as a
transport mechanism for one endpoint and the other endpoint is reconstructed
inside the component.

## Chosen Direction

The chosen direction is the "split ownership" model, referred to in discussion
as option 2:

- The target stays in its source layer and keeps its absolute `x` and `y`
- The button is visually projected into the selected layer
- The line connects the stable target point to the projected button point
- Layer switching must affect button rendering, not target interpretation

This matches the intended product behavior better than moving the entire POI as a
single unit.

## Why This Direction Was Chosen

### 1. The target is the source of truth

The target represents a detection or observed point in the image/layer space.
That point must remain stable unless the underlying image or detection changes.

Because of that:

- target `x/y` must not change because of selection
- target `x/y` must not change because the button moves to another layer
- target `x/y` must not be derived from button placement

### 2. The button belongs to interaction and visual hierarchy

The button can belong to the selected layer, top layer, or another UI context.
That is an interaction and visual concern, not a target-geometry concern.

Because of that:

- button placement can change when selection changes
- button placement can change when layers change
- button placement should be explicit, not hidden in host transforms

### 3. The line is derived geometry

The line should not own coordinates. It should simply connect:

- target point
- button point

Because of that:

- the line should be recalculated from the two endpoints
- the line should not be used to recover target placement
- the line should not act as an ownership boundary

### 4. DOM placement should not redefine coordinates

Reparenting an element in the DOM is a rendering concern. It should not change
the meaning of target coordinates.

Because of that:

- switching layers must not imply new target Y
- measuring rects after DOM movement should be animation support only
- DOM structure must not become the hidden source of position truth

## Ownership Rules

These rules define the intended long-term model.

### Target ownership

The target owns:

- `x`
- `y`
- target anchor position

The target does not own:

- selected-layer button placement
- stack animation state
- visual reparenting policy

### Button ownership

The button owns:

- visual button position in the current layer context
- selected-layer appearance and interactivity
- layer-specific projection

The button does not own:

- target detection coordinates
- target anchor identity

### Connector ownership

The connector owns:

- line geometry between button and target
- pointer geometry if needed

The connector does not own:

- target truth
- button truth

### Stack ownership

The stack owns:

- selection state
- which layer the button projection belongs to
- animation between visual states

The stack should not own:

- target coordinate meaning
- target anchor truth

## Why The Current Y Model Feels Wrong

The current formula:

```text
hostY = buttonY
targetAnchorY = y - buttonY
```

is mathematically correct if the only goal is to end up with the target at `y`.
However, it creates two problems:

### 1. It hides the true ownership

The target appears to be absolute, but is actually reconstructed from a host that
was positioned by the button.

This makes it difficult to answer a simple question:

"Which part of the component truly owns the target position?"

### 2. It becomes fragile when the host is moved between layers

When the whole POI is reparented, the host's visual context changes. The target
can still be mathematically reconstructed, but now the final screen result
depends on:

- host transforms
- internal target-anchor transforms
- parent layer layout
- post-move animation compensation

That is too many moving parts for something that should behave as a stable
detection point.

## Why Option 1 Was Rejected

Option 1 was the simpler refactor:

- keep the POI as one unit
- anchor the host at the target
- place the button relative to the target

This is cleaner than the current design, but it does not fully satisfy the
intended layer behavior because the button still lives inside the same component
tree as the target.

That means it does not naturally express:

- target staying in source layer
- button belonging to selected layer
- connector spanning across layer contexts

Option 1 improves clarity, but it still treats the POI as one rendering unit.
The intended behavior needs the target and the button to be separable across
layers.

## What Option 2 Means In Practice

Option 2 does not mean the target itself moves into the selected layer.

It means:

- the target remains where the source data says it is
- the button gets a selected-layer rendering
- the line bridges the two

This can be implemented as either:

- separate render nodes for target and button
- a projection/proxy model for the button only
- a stack-controlled selected-layer button representation

The important part is the ownership, not the exact rendering mechanism.

## Consequences For Animation

Current stack animation measures the anchor before and after DOM reparenting and
compensates using rect deltas. That makes animation depend on a layout shift that
already happened.

Under the chosen direction:

- target location should already be stable
- button projection should already know which layer it belongs to
- animation should interpolate visual button movement
- animation should not be responsible for recovering correct target placement

In other words:

- geometry correctness first
- animation second

Not the other way around.

## Consequences For X And Y Axis Logic

The X and Y axes do not need to be symmetric.

That is acceptable and matches the intended product behavior.

### X axis

The current mental model for X is:

- target and button usually share a common base X
- `buttonOffsetX` and `targetOffsetX` allow deviation

This is mostly a shared-axis model with optional offsets.

### Y axis

The intended mental model for Y is:

- target Y is stable detection truth
- button Y is stable visual layer truth
- the line spans between them

This is a dual-endpoint model, not a shared-origin model.

The axes serving different semantic needs is fine. The implementation should make
that explicit instead of forcing both axes into the same ownership pattern.

## Design Principles Going Forward

The following principles should guide implementation changes:

1. Target coordinates are authoritative.
2. Button placement is authoritative within the active visual layer.
3. The connector is derived, never authoritative.
4. DOM reparenting must not redefine target coordinates.
5. Animation must preserve a correct layout model, not repair an incorrect one.
6. Variable names should reveal ownership, not hide it.

## Suggested Terminology

The current names contribute to confusion. Better naming would make the model
clearer.

Preferred conceptual names:

- `targetX`
- `targetY`
- `buttonX`
- `buttonY`
- `targetAnchor`
- `buttonProjection`
- `connectorGeometry`

Names that are risky when they hide ownership:

- `--obc-poi-y`
- `targetAnchorY` when it actually means "target relative to button"
- any host transform that mixes target and button concerns

## Refactor Goals

The implementation should eventually move toward this behavior:

### Keep

- `y` as the target truth
- `buttonY` as button-placement truth
- line/pointer derived from those endpoints

### Reduce

- host-level Y ownership that hides which point is being positioned
- DOM reparenting of the whole POI as the main selection mechanism
- animation that depends on measuring a layout shift after it already happened

### Introduce

- explicit target endpoint ownership
- explicit button projection ownership
- stack logic that selects button-layer rendering without changing target truth

## Non-Goals

This document does not require:

- choosing the final rendering API right now
- deciding whether proxies, portals, or split shadow DOM nodes are the exact
  implementation
- preserving current internal naming if it conflicts with the ownership model

The primary goal is to make the model unambiguous before code changes continue.

## Final Decision

The agreed direction is:

- target coordinates remain stable and absolute in their layer/image space
- button placement may move with layer selection
- the line connects target and button
- whole-POI DOM movement should not be the primary ownership model
- option 2 is the correct design direction because it matches the intended
  product behavior

That is the model future refactors should optimize for.
