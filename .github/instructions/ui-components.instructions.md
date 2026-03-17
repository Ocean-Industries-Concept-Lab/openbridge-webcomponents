---
applyTo: "packages/openbridge-webcomponents/src/components/**"
---

# UI Components Instructions

These instructions apply to all general UI components: buttons, cards, forms/inputs, feedback indicators, navigation, menus/overlays, tables, and utility components.

## Architecture

All UI components extend `LitElement` directly — there are no shared base classes or helper mixins. Each component is fully self-contained with its own variants, enums, events, and styles.

## Elevation Variants via `@mixin style`

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

- Always specify `visibleWrapperClass` — it targets the element that receives the mixin styles
- Use variant-specific color variables: `--on-flat-active-color`, `--on-normal-active-color`, `--on-raised-active-color`, etc.
- Interactive state colors follow the pattern: `--[variant]-hover-background-color`, `--[variant]-pressed-background-color`, `--[variant]-focused-background-color`

## Slot Conventions

| Pattern | Usage |
|---------|-------|
| `leading-icon`, `trailing-icon` | Icon positions in buttons and inputs |
| `icon`, `icon-left`, `icon-right` | Generic icon containers |
| `title`, `content` | Main content areas in cards and modals |
| `dialog-title`, `dialog-content` | Dialog-specific content |
| `cancel-label`, `done-label`, `option-label` | Action button labels in modals |

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
enum ButtonVariant { normal = 'normal', raised = 'raised', flat = 'flat' }
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
:host([data-group-item-not-first]) .content-container { /* grouped styling */ }
:host([data-group-item-focused]) .wrapper { /* focused state in group */ }
```

These attributes are set by a parent component — do not set them internally.
