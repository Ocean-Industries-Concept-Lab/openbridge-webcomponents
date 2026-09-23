---
applyTo: "packages/openbridge-webcomponents/src/components/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/ui-components.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# UI Components Instructions

These instructions apply to all general UI components: buttons, cards, forms/inputs, feedback indicators, navigation, menus/overlays, tables, and utility components.

## Architecture

All UI components extend `LitElement` directly — there are no shared base classes or helper mixins. Each component is fully self-contained with its own variants, enums, events, and styles.

## Elevation Variants via `@mixin style`

> Full reference: [IMPLEMENTATION_GUIDELINES.md § PostCSS](../../IMPLEMENTATION_GUIDELINES.md#-postcss)

Most interactive components support elevation variants (`flat`, `normal`, `raised`, `amplified`, `indent`, `selected`). Apply them with the PostCSS mixin:

```css
.wrapper {
  @mixin style style=flat visibleWrapperClass=.visible-wrapper;
  color: var(--on-flat-active-color);
}

.wrapper.variant-raised {
  @mixin style style=raised visibleWrapperClass=.visible-wrapper;
  color: var(--on-raised-active-color);
}
```

- Always specify `visibleWrapperClass` — it targets the inner visual element that receives border/background styles
- The outer wrapper is the touch target (transparent); the inner `.visible-wrapper` is the visual target (styled)
- Use variant-specific color variables: `--on-flat-active-color`, `--on-normal-active-color`, `--on-raised-active-color`, etc.
- Interactive state colors follow `--{variant}-{state}-background-color` / `--{variant}-{state}-border-color` (see full convention in IMPLEMENTATION_GUIDELINES.md)
- Use `noClick` for display-only sub-parts that need colors but no interactivity

## Alert flashing

Alert frame, alert icon and alert button flash on one tempo table (#1224):
fast 400/400, slow 400/1200, very-slow 400/2800 ms on/off. The table lives in
`src/palettes/blinking.ts` and nowhere else.

- `resolveFlashingSpeed(speed, type, phase)` in `src/alert-severity.ts` is the
  only place that maps an alert type to a tempo. Components map acknowledged
  to `fixed` before calling it.
- Components never call `el.animate` themselves: `FlashingController(host,
() => host.resolvedFlashingSpeed)` (`src/palettes/flashing-controller.ts`)
  installs one animation per host and owns connect/disconnect. CSS reads
  `--flash-<tempo>-on/off` through a `flash-<tempo>` class.
- Every animation starts at document time 0, so all elements light up
  together; do not add per-element delays.
- The frame's stroke is centred on the frame edge (`outline-offset` of minus
  half the width), so frames on touching components share one edge, and the
  flash grows it 1 px on each side. Place the frame box on the edge to frame;
  never offset it by half a stroke.
- The rectified frame is an SVG overlay (`svg.dash`, one `roundedRectPath`
  stroke on the wrapper edge, `stroke-dasharray: 12 6`) because CSS outlines
  have no dash array. The flash animates `stroke-width` on that one path; a
  second, wider path has longer corner arcs and its dashes drift around the
  frame. Geometry is measured from the wrapper, never derived from props.
- Visual tests park all Web Animations at 100 ms (see `testing-visual.md`),
  so flashing stories snapshot the on state.

## Alert button layers

`obc-badge` → `obc-alert-counter-item` → `obc-alert-button-item` →
`obc-alert-button`, the nesting of the Figma Alert counter item, Alert
button item and Alert button (#1236).

- `obc-alert-button-item` draws the bell, the counter and the global
  counter, and holds the alert button's `FlashingController`.
  `obc-alert-button` forwards its properties to the item, the global counter
  included (a flat button drops it), and adds the silence button and the
  breakpoints; it never draws a bell of its own.
- `rankAlertCounts(counts, combine)` in `src/alert-severity.ts` is the only
  per-severity count ranking, over the shared `AlertCounts` shape
  (`src/types.ts`); the tree navigation badges and the counter item call it.
- A parent squares the item's end with `data-group-item-not-last` (see Data
  Attributes for Group Styling).
- Guarded by `alert-button-item.spec.ts`, `alert-counter-item.spec.ts`,
  `alert-button.spec.ts` and `alert-severity.spec.ts`.

## Slot Conventions

| Pattern                                      | Usage                                  |
| -------------------------------------------- | -------------------------------------- |
| `leading-icon`, `trailing-icon`              | Icon positions in buttons and inputs   |
| `icon`, `icon-left`, `icon-right`            | Generic icon containers                |
| `title`, `content`                           | Main content areas in cards and modals |
| `dialog-title`, `dialog-content`             | Dialog-specific content                |
| `cancel-label`, `done-label`, `option-label` | Action button labels in modals         |

Slot visibility is controlled by boolean properties (e.g. `showLeadingIcon`). Always check the property in the template before rendering the slot.

## Event Naming

- Name events with kebab-case: `close-click`, `cancel-click`, `value-change`, `selection-change`
- Always type events as `CustomEvent<DetailType>` with a dedicated type alias:
  ```ts
  export type ObcSliderValueEvent = CustomEvent<number>;
  ```
- Common event names: `click`, `change`, `close-click`, `cancel-click`, `done-click`, `option-click`

## Enum Conventions

Each component defines its own variant enum — these are not shared across components:

```ts
enum ButtonVariant {
  normal = "normal",
  raised = "raised",
  flat = "flat",
}
```

- Use enums (not string literal unions) for `@property({type: String})` fields — enforced by ESLint rule `prefer-enum-over-string-literal-union`
- Enum values should match the CSS class names they map to

## Conditional argTypes in Stories

For properties that only apply to specific variants or modes, use Storybook's conditional controls:

```ts
argTypes: {
  mode: {
    control: {type: 'select'},
    if: {arg: 'type', eq: ProgressBarType.linear},
  },
}
```

Hide internal/computed properties from controls:

```ts
argTypes: {
  hasIconLeading: {table: {disable: true}},
}
```

## Disabled State

- All interactive components support a `disabled` boolean property
- Style with `:host([disabled])` selector in CSS
- Guard hover styles: `:host(:hover):not([disabled])`

## Data Attributes for Group Styling

Components that participate in grouped layouts (e.g. form items) use host data attributes set programmatically:

```css
:host([data-group-item-not-first]) .content-container {
  /* grouped styling */
}
:host([data-group-item-focused]) .wrapper {
  /* focused state in group */
}
```

These attributes are set by a parent component — do not set them internally.

## Checkbox lists

`obc-checkbox-item` rows are flat; depth is the numeric `level` (0 plain, 1
reserves the chevron slot, each level above adds one
`--ui-components-checkbox-nested-item-padding-left` spacer). The chevron is a
native button inside the row that fires `expand-toggle` and never flips
`expanded` itself. `obc-checkbox-list` owns the `hidden` attribute of its rows
and forwards its `hoverStyle` to them — consumers bind neither. The collapse
walk is `checkbox-list-visibility.ts`, guarded by its spec. Reserve `level`
for lists with expandable rows: a level above 0 always reserves the 48px
chevron slot, so flat lists such as the context menu's nested checkboxes keep
their own compact padding instead.

## Soft dismiss (menus and overlays)

A panel that opens over content closes on a click outside and on `Escape`,
and that click does nothing else. `PopoverController`
(`src/internal/popover-controller.ts`) puts `popover="auto"` on the host,
keeps it in step with the host's `open` property, and holds a see-through
cover over the page while the panel is open (#1293).

Adopting it takes three things on the host: a `softDismiss` boolean, an `open`
boolean, and `@mixin soft-dismiss;` in the component CSS. `obc-brilliance-menu`
is the reference.

- `softDismiss` is opt-in because `[popover]` is `display: none` until shown.
  On by default it would hide every panel a consumer already positions and
  shows itself.
- The `@mixin soft-dismiss` reset is not optional. The UA sheet gives
  `[popover]` `inset: 0; margin: auto` plus a border, padding and a `Canvas`
  background, so without it the panel is re-centred with chrome around it. An
  outer-tree rule beats `:host` whatever its specificity, so a consumer's own
  anchor positioning still wins.
- When the panel closes for a reason other than `open` being set — a click
  on the cover, `Escape` — the controller writes `open` back to `false` and
  fires `close`. The browser only reports the change; the property and the
  event are the component's. A consumer mirroring that state in a button's
  `activated` flag listens for `close` rather than re-deriving it from its
  own flag.
- `popovertarget` does not cross shadow roots, so a trigger inside one
  component cannot declare a panel that lives in another tree. That is what
  `bindPopoverTrigger(trigger, panel)` is for.
- The click outside is swallowed. The controller keeps a transparent cover
  (`part="backdrop"`) over the whole page while the panel is open, stacked
  just under it, so the first click only closes the panel and the page gets
  no hover or wheel either. A consumer that wants a tint styles
  `::part(backdrop)`; nothing else about it is a consumer's concern.
- The cover sits over the panel's own trigger too, so no guard is needed
  against a second click reopening it: that click never reaches the button.
  Keyboard focus is not held in the panel, though — a `Tab` still moves into
  the page the mouse cannot reach.
- A panel that is only mounted while open keeps its `v-if`: mounting a menu
  eagerly also builds its contents, and in `vue-demo` that meant router links
  for routes that did not exist yet.

Four overlays still hand-roll dismissal, listed in #1293: `obc-split-button`
and `obc-readout`'s source picker each run a `window` `pointerdown` listener,
`obc-poi-group` renders a backdrop div, and `obc-navigation-item-group` has
nothing at all.
