---
applyTo: "packages/openbridge-webcomponents/src/automation/**"
---

# Automation Components Instructions

These instructions apply to all automation schematic components: motorized devices (pump, motor, fan), valves, electrical components, line/pipe elements, tanks, readouts, and badges.

## Base Class Hierarchy

Choose the correct base class when creating a new automation device:

| Use case | Base class | State properties |
|----------|-----------|------------------|
| Motorized device (on + speed) | `ObcAbstractAutomationButtonMotorized` | `on`, `speedInPercent` (0–100) |
| Binary on/off device | `ObcAbstractAutomationButtonSquared` | `on` |
| Analog device with value | `ObcAbstractAutomationButton` + custom logic | `open`, `value` (0–100) |
| Pure display (no button) | `LitElement` directly | N/A |

All button-based components share `ObcAbstractAutomationButton` as root, which provides: positioning, readout stacks, badges, alert frames, tags, and label direction.

## Icon Rendering Pattern

Automation device icons use a **dual-slot** approach — both `icon` (primary color) and `icon-silhouette` (background shadow) must be rendered:

```ts
override get icon() {
  return html`
    <obi-pump-on usecsscolor slot="icon"></obi-pump-on>
    <obi-pump-on usecsscolor slot="icon-silhouette"></obi-pump-on>
  `;
}
```

Rules:
- Always include the `usecsscolor` attribute so CSS variable color overrides work
- Provide both horizontal and vertical icon variants when `this.vertical` is true
- Apply rotation via a wrapper `div` with `style="transform: rotate(90deg)"`, not on the icon itself
- Switch between on/off icon variants based on `this.on` state

## State and Readout Getters

Subclasses expose state through getters that the base class reads during render:

```ts
get _on(): boolean { return this.on; }

override get extraReadouts(): AutomationButtonReadoutStack[] {
  return this.on
    ? [{type: 'state-on', value: 'On', hasIcon: true}]
    : [];
}
```

- `_on` maps the component's state to the base class's `open`/`closed` AutomationButtonState
- `extraReadouts` provides state-derived readout entries (On/Off, speed percentage, etc.)
- Do not set readouts as properties — compute them from state

## Enums

- **Variant enums are component-specific** — `MotorizedVariant`, `SquaredVariant`, `DigitalValveVariant`, etc. are NOT interchangeable
- Alternative icon enums (`FilterAlternativeIcon`, `LogicAlternativeIcon`, etc.) select between icon variants within one component
- Global enums shared across automation: `LineMedium`, `LineType`, `AutomationButtonDirection`, `AutomationButtonPositioning`, `AutomationButtonReadoutPosition`

## Line Components

Line/pipe components (`horizontal-line`, `vertical-line`, `corner-line`, etc.) render inline SVG with dynamic dimensions:

- Width/height calculated as `length * 24 + 1` (one grid unit = 24px)
- Use `lineWidth(lineType)` and `lineColor(medium)` helpers from `src/automation/index.ts`
- Stroke widths vary significantly by LineType: fluid=4, electric=2, air=10, connector=1
- viewBox must account for stroke width to prevent clipping

## Analog Valve SVG

Analog valves render inline dynamic SVG (not icon swapping):

- Handle rotation: `-(1 - value / 100) * 90` degrees
- Fill visualization uses clipPath that extends based on value percentage
- Use CSS variables for stroke/fill colors, not hard-coded values

## Storybook Conventions

- Use shared argTypes helpers: `argTypesAbstractAutomationButton`, `argTypesAbstractAutomationButtonMotorized`, `argTypesAbstractAutomationButtonPassiveSquare`
- Spread them into story meta: `argTypes: { ...argTypesAbstractAutomationButtonMotorized }`
- Use the `crossDecorator` for automation device stories
- Standard story exports: `OnVertical`, `OnHorizontal`, `OffVertical`, `OffHorizontal` for state × orientation combinations
- Title path: `'Automation/Automation Devices/{ComponentName}'`

## Badge Positioning

Badges (`badgeAuto`, `badgeCommandLocked`, `badgeDuty`, `badgeAlertOff`) render in corner slots. Badge spacer logic is computed based on readout position and which badges are present. Do not hard-code spacer visibility.

## P&ID Anchor Point Model

All automation components are placed on a P&ID canvas using `position: absolute; left: Xpx; top: Ypx`. This places the element's **top-left corner** at the given coordinate. Each component then uses internal CSS to shift itself so that a meaningful **anchor point** aligns with that coordinate — the point where pipes connect.

The Storybook `crossDecorator` simulates this layout: it wraps the component in a `position: relative` container and places children at `position: absolute; top: 50%; left: 50%`, with optional crosshair lines to visualize the anchor.

Different components have different anchor points:

| Component type | Anchor point | Internal CSS technique |
|----------------|-------------|------------------------|
| Valve / pump / motor | Center of icon | 0×0 `.point-wrapper` at anchor + negative offset by half touch-target size + `translateX(-50%)` for top/bottom positioning or `translateY(-50%)` for left/right positioning |
| Tank | Top-center of tank body | `translateX(-50%)` on `.outer` + `top: -20px` to skip badge area |
| Line segments | Left/top edge of line | SVG typically drawn around the 24px grid center (for example x=12 or y=12) + visual offset by about half the grid to align to the host edge, with minor `±0.5px` stroke/viewBox adjustments and direction-specific shifts where needed |

**Do not change the centering transforms** on automation components without understanding the anchor point intent. The browser's element overlay (host box) will often appear offset from the visual content — this is intentional because the host box starts at the placement coordinate while the visual content is shifted to align the anchor.
