---
applyTo: "packages/openbridge-webcomponents/src/building-blocks/**,packages/openbridge-webcomponents/src/svghelpers/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for Building Blocks & SVG Helpers

These instructions apply to SVG-based building block components (instrument-linear, bar-vertical, etc.) and their shared SVG helper utilities.

## Agent Safety Rules (Context + Mirroring)

When implementing changes in this area, avoid narrow/local fixes that can introduce regressions:

1. **Always load the full file into context before editing**
   - Read the entire file you are about to change (not just snippets) so you understand how helpers, state, rendering, and events fit together.
   - This is required to avoid “local fixes” that miss related logic and accidentally introduce new bugs.

2. **Always think in mirrored / generalized layouts (sides + orientations)**
   - For components like:
     - `packages/openbridge-webcomponents/src/building-blocks/external-scale/external-scale.ts`
     - `packages/openbridge-webcomponents/src/building-blocks/bar-horizontal/bar-horizontal.ts`
     - `packages/openbridge-webcomponents/src/building-blocks/bar-vertical/bar-vertical.ts`
     - `packages/openbridge-webcomponents/src/building-blocks/chart-line/chart-line-base.ts`
     - `packages/openbridge-webcomponents/src/bars-graphs/line-graph/line-graph.ts`
     - `packages/openbridge-webcomponents/src/bars-graphs/area-graph/area-graph.ts`
   - If a task changes behavior for one side (e.g. right), validate the equivalent behavior for the opposite side (left) and for the orthogonal orientation (top/bottom) where applicable.
   - Prefer implementing via shared helpers/config so “all sides / all orientations” stay consistent.

### `packages/openbridge-webcomponents/src/building-blocks/**`

When working with building block components in this directory:

1. **SVG-Based Architecture**:
   - Building blocks are pure SVG components rendered using Lit's `svg` template tag
   - Components typically render into a `<svg>` element with a viewBox for coordinate system control
   - Use shared helpers from `svghelpers/` for coordinate transformations and rendering utilities
   - Consider checking existing building blocks (e.g., `instrument-linear`) for similar patterns before implementing new features

2. **CSS Variables (Direct Usage)**:
   - Building blocks use CSS variables directly in SVG attributes, without helper functions
   - Example: `fill="var(--instrument-frame-primary-color)"` or `stroke="var(--instrument-frame-tertiary-color)"`
   - Do NOT import or use `getCssVariableValue()` from charthelpers - that's for Chart.js components only
   - Common instrument variables:
     - `--instrument-frame-primary-color`, `--instrument-frame-secondary-color`, `--instrument-frame-tertiary-color`
     - `--instrument-regular-secondary-color`, `--instrument-regular-tertiary-color`
     - `--instrument-enhanced-secondary-color`, `--instrument-enhanced-tertiary-color`
     - `--instrument-tick-mark-tertiary-color`
     - `--alert-caution-color`, `--on-caution-active-color`

3. **Coordinate System & Stroke Awareness**:
   - Use helpers from `svghelpers/stroke-aware.ts` for stroke-aware coordinate calculations
   - SVG strokes with `vector-effect="non-scaling-stroke"` are centered on their path, extending ±strokeWidth/2
   - At viewBox boundaries, strokes can get clipped, causing visual artifacts
   - Key helpers:
     - `shrinkDimensionForStroke()`: Adjust dimensions to account for strokes at boundaries
     - `adjustCoordinateForStroke()`: Shift positions inward to keep strokes fully visible
     - `valueToY()`: Convert data values to Y-coordinates with stroke awareness
     - `valueToX()`: Convert data values to X-coordinates with stroke awareness
     - `adjustRectWidthForStroke()`: Adjust rect position and dimensions for pixel-perfect rendering

4. **Value-to-Coordinate Mapping**:
   - Building blocks often convert data values to SVG coordinates
   - Typical pattern for vertical scales (inverted Y-axis, negative = up):
     ```typescript
     function valueToY(
       value: number,
       minValue: number,
       maxValue: number,
       height: number
     ): number {
       const range = maxValue - minValue;
       return ((-value + minValue) * height) / range + height / 2;
     }
     ```
   - Use stroke-aware versions from `svghelpers/` when elements touch viewBox boundaries

5. **Component Structure**:
   - Properties decorated with `@property()`
   - State managed with `@state()` for derived/computed values
   - Common pattern: `willUpdate()` for calculating computed values from props before render
   - Rendering typically returns `svg` template with coordinate-based positioning

6. **Rendering Patterns**:
   - Break complex SVG into smaller helper functions (e.g., `renderAdvice()`, `generateTickmarks()`, `generateLabels()`)
   - Helper functions often return `SVGTemplateResult` or arrays of `SVGTemplateResult`
   - Use `nothing` from Lit for conditional rendering
   - Common pattern: generate arrays of SVG elements, then spread into main template

7. **Advice & Annotations**:
   - Advice/alert regions are typically rendered using masks and patterns
   - Example pattern: create a mask path, apply it to a patterned area, then render the mask outline
   - Advice states (hinted, regular, triggered) map to different colors and visual styles
   - Tickmarks at advice boundaries use consistent styling with the advice state

8. **Tickmarks & Labels**:
   - Tickmarks are typically `<line>` elements with `stroke-width="1"` and `vector-effect="non-scaling-stroke"`
   - Primary tickmarks are typically longer (e.g., 24px), secondary tickmarks shorter (e.g., 8px)
   - Labels use `<text>` elements with properties like `text-anchor`, `dominant-baseline`, `font-family`, `font-size`
   - Skip tickmarks at certain values to avoid overlaps (e.g., skip secondary where primary exists)

9. **Positioning & Layout**:
   - Components often support `position: 'left' | 'right'` to control element placement inside a vertical layout or `position: 'top' | 'bottom'` for horizontal layouts
   - Three-stripe layout pattern common: `[bar][tickmarks][labels]` or `[labels][tickmarks][bar]`
   - ViewBox typically centered at origin (0, 0) with negative/positive extents

10. **Chart Synchronization**:
    - NOTE: This might be refactored in the future, keep an open mind
    - Components may accept a `scaleInfo` prop for syncing with Chart.js components
    - `scaleInfo` provides: scale min/max, padding, canvas dimensions, tick intervals
    - When `scaleInfo` is provided, it overrides manual configuration properties
    - Use computed state properties to merge manual and scaleInfo-based configuration

11. **Fixed Height Pattern**:
    - Height defines the visual size and coordinate system scale
    - Padding (top/bottom or left/right) is typically added outside the main drawing area

### `packages/openbridge-webcomponents/src/svghelpers/**`

When working with SVG helper utilities:

1. **Shared Utility Philosophy**:
   - These helpers are shared across SVG-based building block components
   - Changes here can affect multiple instrument and bar components
   - Prefer pure functions (no side effects, deterministic output)
   - Include TypeScript types for all function parameters and return values

2. **File Organization**:
   - `stroke-aware.ts`: Stroke-aware coordinate calculations and adjustments
   - `rectangular.ts`: Helpers for rectangular shapes and layouts
   - `circle.ts`: Helpers for circular/radial shapes
   - `roundedArch.ts`: Helpers for rounded arch paths
   - `setpoint.ts`, `setpoint-mixin.ts`, `setpoint-bundle.ts`: Setpoint marker design layer, state management, and animation. See `setpoint.instructions.md` for full documentation.
   - `index.ts`: Export all helpers for convenient importing
   - Organize helpers by shape/concept, not by component

3. **Stroke-Aware Calculations**:
   - Account for `vector-effect="non-scaling-stroke"` behavior
   - Strokes are centered on paths, extending ±strokeWidth/2 from center
   - At viewBox boundaries, half the stroke can be clipped
   - Solution: reduce logical dimensions and shift coordinates inward by half-stroke
   - Document the problem and solution clearly in comments

4. **Coordinate Transformations**:
   - Provide bidirectional mapping: value ↔ coordinate
   - Support both horizontal (X) and vertical (Y) mappings
   - Handle inverted axes (e.g., Y-axis where negative = up)
   - Consider centered vs edge-aligned coordinate systems

5. **Dimension Adjustments**:
   - Provide helpers for adjusting both position and dimension together
   - Example: `adjustRectWidthForStroke()` returns `{x, width}` adjustments
   - Handle edge cases: elements at min boundary, max boundary, or interior
   - Default stroke width of 1px for consistency

6. **Path Generation**:
   - Generate SVG path strings for complex shapes
   - Use clear, formatted path commands (M, L, A, V, H, Z)
   - Support parametric shapes (e.g., rounded rectangles with configurable radius)
   - Return path strings ready for use in `d` attribute

7. **Type Safety**:
   - Export TypeScript interfaces for configuration objects
   - Use descriptive parameter names (e.g., `desiredVisualSize` instead of `size`)
   - Provide clear return types for functions

8. **Documentation**:
   - Include comprehensive JSDoc comments with problem/solution descriptions
   - Document parameters with `@param` and return values with `@returns`
   - Provide visual ASCII diagrams where helpful (e.g., stroke clipping illustration)
   - Include usage examples in function comments
   - Explain non-obvious calculations inline

9. **Error Handling**:
   - Validate input parameters where necessary
   - Handle edge cases gracefully (e.g., zero ranges, inverted min/max)
   - Return safe fallback values when appropriate
   - Consider domain-specific constraints (e.g., viewBox boundaries)

10. **Reusability**:
    - Design helpers to work across different components and use cases
    - Avoid component-specific logic in shared helpers
    - Parameterize behavior rather than hardcoding values
    - Test edge cases to ensure robustness
