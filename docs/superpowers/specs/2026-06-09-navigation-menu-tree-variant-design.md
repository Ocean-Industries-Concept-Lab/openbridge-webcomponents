# Navigation Menu — Tree Variant

**Date:** 2026-06-09
**Status:** Approved (design)
**Branch:** `feat/tree-navigation-component`

## Summary

Add a `Tree` variant to `obc-navigation-menu`. When a consumer sets
`variant="tree"`, their existing `obc-navigation-item` / `obc-navigation-item-group`
markup renders as tree rows — reusing the tree components' chevron, inline
expand/collapse, checked/selected styling, and alert markers — **without
connector guide lines** and **indented by depth**. The consumer does not change
any markup, slots, or event wiring; they only set the variant.

## Goals

- One navigation-menu component supports a tree presentation via `variant="tree"`.
- Consumers keep writing `obc-navigation-item` / `obc-navigation-item-group`; no
  element swapping, no separate "tree menu" component.
- Tree-variant rows: depth indentation, expand/collapse chevron, **no** `├ │ └`
  connector lines.
- Existing `@click` handlers and `checked` selection on the consumer's nav items
  keep working unchanged in tree mode.

## Non-Goals

- Connector guide lines in the navigation-menu tree variant (explicitly not
  wanted). The standalone `obc-tree-navigation` keeps its full connector look.
- Flyout popups for groups in tree mode (groups expand inline).
- Any change to the existing `Full` / `IconOnly` / `IconOnlyLarge` / `Compact`
  variants' behavior or output.

## Approach: transform in place

The flat nav components render tree-row markup **themselves** when the menu signals
tree mode — no copying of elements, no moving of icon nodes, no event forwarding.
This was chosen over a delegate/translate approach (render copies as tree elements)
because copying forces three avoidable seams:

- **Icons:** an icon DOM node cannot exist in two places; copying would require
  relocating the consumer's `<obi-*>` out of the original element.
- **Events:** copies would need click/selection forwarding back to the originals.
- **State:** `checked`/`href` would need syncing between original and copy.

Transform-in-place has none of these: the consumer's element keeps its own icon
slot, native `<a>`/`@click`, and `checked`/`href` state, and simply renders a tree
layout. The menu pushes mode + depth down the same way it already pushes `variant`.

To avoid duplicating tree-row markup/CSS, the tree-row visual is shared between
`obc-tree-navigation-item` and the tree-mode branch of `obc-navigation-item`
(single implementation, two hosts).

## Architecture

```
obc-navigation-menu (variant="tree")
  setupItems(): walk slotted descendants, set on each:
    - tree mode flag
    - branches = all-`blank`, length = depth   (indent, no lines)
  groups expand inline (existing open/close state)
        │  pushes mode + branches down (like variant today)
        ▼
obc-navigation-item-group (tree mode)     obc-navigation-item (tree mode)
  render header + INLINE children            render shared tree row
  (not flyout)                               (native <a>, @click, icon slot kept)
        │ both reuse
        ▼
  shared tree-row template + styles  ◄── also used by obc-tree-navigation-item
```

## Indent-without-lines mechanism

The existing `blank` branch type renders a 32px empty spacer with no line. So
"indent by depth, no connectors" = assign each row a `branches` array of all
`blank` entries sized to its depth:

- depth 0 → `[]`
- depth 1 → `[blank]`
- depth 2 → `[blank, blank]`

The menu computes depth while walking descendants (it already walks them to push
`variant`). No new branch type is needed.

## Components touched

| File | Change |
|------|--------|
| `navigation-menu/navigation-menu.ts` | Add `Tree` to `ObcNavigationMenuVariant`. In tree mode, `setupItems()` sets a tree-mode flag + depth-sized all-`blank` `branches` on each descendant item/group, and ensures groups expand inline. All existing variants unchanged. The menu keeps its existing `slot`-based render (it does **not** host `obc-tree-navigation`); a `tree` class on the wrapper carries any tree-specific menu-level styling. |
| `navigation-item/navigation-item.ts` | Tree-mode render branch that outputs the shared tree row using the element's own `label` / `icon` slot / `checked` / `branches`. Native `<a>` semantics, `@click`, `href`, and keyboard activation preserved. Non-tree variants unchanged. |
| `navigation-item-group/navigation-item-group.ts` | Tree-mode render: header row + **inline** children instead of the flyout panel. Flyout props (`hug`, `groupSelected`, `open` event) are inert in tree mode (not removed). |
| `tree-navigation-item/tree-navigation-item.ts` | Suppress the terminal-connector stub when the row's ancestry is entirely `blank`, so indent-without-lines is fully line-free. (Benefits the shared row.) |

## Shared tree-row factoring

Extract the tree-row markup (indent columns, chevron/terminal, label-container,
icon, alert badge) and its CSS so both `obc-tree-navigation-item` and the
tree-mode path of `obc-navigation-item` render the same thing. Exact factoring
(shared template module vs. a shared base) decided during implementation; the
design commits only to **no duplicated tree-row markup or CSS**.

## API impact

Purely additive — no breaking changes:

- **Added:** `ObcNavigationMenuVariant.Tree = 'tree'`.
- **Unchanged:** all consumer markup, slots (`icon`, `main`/`footer`/`logo`),
  props, and events. Consumers opt in by setting `variant="tree"`.
- **Unchanged:** `Full` / `IconOnly` / `IconOnlyLarge` / `Compact` render paths.
- **Inert in tree mode:** group flyout concepts (`hug`, `groupSelected`, `open`).

### Hard requirement

Existing `@click` handlers and `checked` selection on the consumer's
`obc-navigation-item` elements must keep working **unchanged** in tree mode. The
transform-in-place approach satisfies this natively (the original element fires
its own events and owns its own state).

## Example (consumer markup unchanged)

```html
<!-- Same markup; only the variant changes -->
<obc-navigation-menu variant="tree">
  <obc-navigation-item-group slot="main" label="Vessel">
    <obi-placeholder slot="icon"></obi-placeholder>
    <obc-navigation-item-group label="Engine room">
      <obi-placeholder slot="icon"></obi-placeholder>
      <obc-navigation-item label="Main engine">
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-navigation-item>
      <obc-navigation-item label="Cooling system">
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-navigation-item>
    </obc-navigation-item-group>
    <obc-navigation-item label="Deck">
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-navigation-item>
  </obc-navigation-item-group>
</obc-navigation-menu>
```

Renders as:

```
▾ Vessel
   ▾ Engine room
      Main engine
      Cooling system
   Deck
```

(indented by depth, expand/collapse chevrons, no connector lines)

## Testing

- New Storybook stories on `obc-navigation-menu` for `variant="tree"`: expanded,
  partially collapsed, with icons, with a checked item, and multi-level depth.
- Confirm a click handler on a consumer `obc-navigation-item` still fires in tree
  mode (interactive story).
- Generate **Linux** visual baselines via the storybook Docker image (the
  established workflow), committing only the new nav-menu tree baselines.
- Verify existing nav-menu / nav-item / nav-item-group baselines are byte-for-byte
  unchanged (existing variants must not regress).
- Run lint + lit-analyzer + prettier on all touched files; `npm run analyze` if a
  new `@customElement` is added (none expected).

## Risks / open points

- **Shared-row factoring** is the main implementation judgment call; both candidate
  factorings keep a single source of truth.
- **Group inline expand in tree mode** reuses the group's existing open/close state
  but bypasses flyout rendering — must ensure no flyout DOM/CSS leaks in tree mode.
- **`setupItems()` timing**: tree-mode branch assignment must re-run on slot
  changes and on the existing `MutationObserver`, same as `variant` push-down.
