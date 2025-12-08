---
applyTo: "packages/openbridge-webcomponents/src/bars-graphs/**,packages/openbridge-webcomponents/src/charthelpers/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for charts & chart helpers

- Ask for clarification (e.g. a list of questions) every time before you begin implementing a change (do not skip this step).

### `packages/openbridge-webcomponents/src/bars-graphs/**`

When working with chart components in this directory:

1. **Unified Chart Architecture**:

   - All charts are based on Chart.js
   - All charts (donut, pie, polar, radial-bar and future chart types) use shared helpers from `charthelpers/`
   - Never duplicate logic between chart components - abstract to shared helpers in `charthelpers/`
   - Always consider reusability when adding new features and double-check if similar functionality exists in shared helpers or the already existing chart components.
   - All charts should have the following markup structure:
     ```html
     <div class="wrapper">
       <canvas></canvas>
     </div>
     ```
   - No change to CSS classes or structure without consulting the team.

2. **Canvas Sizing**:

   - Standard chart dimensions: CHART_WIDTH = 256px, CANVAS_PADDING = 32px, which means the full canvas size is 320x320px, the chart area is a 256px diameter circle centered in the canvas, while the outer labels are drawn outside this area, in the 32px padding area.
   - `responsive`: `true`,
   - `maintainAspectRatio`: `true`,
   - The canvas has 100% width of its container, height is computed based on aspect ratio.
   - If the chart is resized, ensure the outer labels are repositioned accordingly.
   - Make sure to update or redraw the chart when size changes. This can be programmatic or based on the parent <div> or browser resize. Make sure to avoid layout thrashing and flickering.
   - The canvas has an aspect ratio of 1:1 (square), unless there are labels that require more horizontal space. In that case, the aspect ratio may be adjusted to accommodate the labels. The additional padding is added to the width on both sides (left and right). The label's max length or decimals, etc. should come from the chart's data and options.

3. **Outer Labels**:

   - Outer labels are positioned OUTSIDE the 256px chart circle
   - Do not rely on Chart.js built-in label positioning for outer labels, rather use custom plugins from `charthelpers/` which apply to all charts. In such cases hide the built-in labels.
   - The label's width is tied to the chart's data and options and canvas aspect ratio, padding; and should not change dynamically, e.g. decimal places, longest label, etc.
   - If all labels can fit into the 32px padding area, no adjustment to aspect ratio is needed.
   - The canvas aspect ratio adjustment logic should be in shared helpers to ensure consistency across all chart types. When a label requires more space, the aspect ratio and the canvas left/right padding should increase accordingly.
   - Use helpers from `charthelpers/` for consistent label positioning across all chart types. All charts should use this plugin when outer labels are enabled. If a new use case arises that is not supported by the existing plugin, extend the plugin in `charthelpers/` to support the new use case for all charts.

4. **Code Organization**:

   - Import all shared utilities from `../../charthelpers/index.js`
   - Keep chart-specific constants in the component file (e.g., `DONUT_DIMENSIONS`, `PIE_DIMENSIONS`, etc.)
   - Always destroy and recreate chart on major option changes (not just `update()`)
   - Follow the established component structure:
     - Properties decorated with `@property()`
     - State managed with `@state()`
     - Canvas queried with `@query('canvas')`
     - Chart instance stored as private `chart?: Chart`
     - Theme observer stored as private `themeObserver?: MutationObserver`
     - Resize observer stored as private `resizeObserver?: ResizeObserver`

5. **Component Lifecycle**:

   - Use `willUpdate()` for calculating derived state (e.g., totals, percentages)
   - Use `updated()` for triggering chart updates when properties change
   - Use `firstUpdated()` for initial chart creation and observer setup
   - Use `disconnectedCallback()` for cleanup (destroy chart, disconnect observers)
   - Always call `super.disconnectedCallback()` when overriding

6. **Chart Updates**:

   - Use `shouldUpdateChart()` helper to determine if chart needs updating
   - List all watched properties that trigger chart updates
   - For major changes (like `half` mode toggle), destroy and recreate chart
   - For minor changes (data, colors), update chart data and options
   - Use `prepareChartData()` to transform component properties into Chart.js format
   - Always include a "remaining" segment for donut/radial bar charts to show unused capacity

7. **Theme Integration**:

   - Use `observeThemeChanges()` from `charthelpers/theme.js`
   - Update chart colors when theme changes using `updateChart()`
   - Use `getCssVariableValue()` to read CSS custom properties
   - Never hardcode colors - always use CSS variables

8. **Storybook & Testing**:

- Pls ignore the `withDecorator` type errors.
- Ensure all new features and edge cases are covered in Storybook stories
- All chart components should have a width decorator: `import {widthDecorator} from '../../storybook-util.js';`
- Use `decorators: [widthDecorator]` in story meta to simulate browser resizing
- Tag stories appropriately (e.g., `tags: ['autodocs', '6.0'],`)
- Create stories for the most reasonable use cases and empty/no data states.

11. **CSS Styling**:
    - Use `unsafeCSS()` to import component styles
    - Import CSS with `?inline` suffix: `import componentStyle from './chart-name.css?inline'`
    - Apply styles with: `static override styles = unsafeCSS(componentStyle);`
    - No change to CSS classes or structure without consulting the team.

### `packages/openbridge-webcomponents/src/charthelpers/**`

When working with chart helper utilities:

1. **Shared Utility Philosophy**:

   - These helpers are used by ALL chart components
   - Changes here affect donut, pie, polar, radial-bar and future chart types
   - Write pure functions when possible (no side effects)
   - Provide TypeScript types for all function parameters and return values

2. **File Organization**:

   - `constants.ts`: Chart dimensions, padding, color defaults, label configs
   - `colors.ts`: CSS variable reading, color resolution
   - `theme.ts`: Theme change observation
   - etc.
   - `index.ts`: Export all helpers for convenient importing
   - Make sure to add new helpers in separate files with clear responsibilities
   - Always export new helpers from `index.ts`

3. **Plugin Architecture**:

   - All plugins should follow Chart.js plugin structure with `id` and lifecycle hooks
   - Common lifecycle hooks: `beforeDraw`, `afterDraw`, `beforeDatasetsDraw`, `afterDatasetsDraw`
   - Plugins should accept configuration via options object
   - Use TypeScript interfaces to define plugin options (e.g., `OuterLabelsOptions`, etc.)

4. **CSS Variables**:

   - Use `getCssVariableValue(host, varName)` to read CSS custom properties without fallbacks (this is intentional).
   - Always trim CSS variable values: `.trim()`
   - Common variables: `--element-neutral-color`, `--instrument-tick-mark-secondary-color`, `--container-section-color`

5. **Constants Management**:

   - Define chart dimensions in `CHART_DIMENSIONS` constant object
   - Use `as const` for type safety and immutability
   - Include computed properties using getters for derived values

6. **Formatting Helpers**:

   - Provide both value and percentage formatting functions
   - Support configurable decimal places
   - Support unit display (e.g., `%`, `kW`, `kg`)
   - Handle edge cases: null/undefined values, division by zero

7. **Aspect Ratio Helpers**:

   - Calculate aspect ratio based on canvas width and required padding
   - Account for outer labels when calculating aspect ratio
   - Provide separate calculations for full vs half charts (e.g. donut chart in half mode)
   - Return aspect ratio as width/height (e.g., `1` for square, `1.67` or similar for wider)

8. **Outer Labels Plugin**:

   - Position labels outside the chart circle at calculated radius
   - Support text alignment based on angle (left/center/right)
   - Support value formatting with units and decimal places
   - Calculate required canvas padding based on label width (this should have in mind both the number of digits, decimal places, unit and max label length)
   - Use font metrics for accurate text measurement

9. **Theme Helpers**:

   - Observe `data-obc-theme` attribute changes on document root
   - Use MutationObserver for efficient theme change detection
   - Provide cleanup via observer disconnect
   - Call update callback when theme changes
   - Return observer instance for component cleanup

10. **Type Safety**:

    - Export all TypeScript interfaces and types
    - Use `readonly` for configuration objects
    - Use union types for chart type compatibility

11. **Documentation**:

    - Add JSDoc comments to all exported functions
    - Document parameters with `@param`
    - Document return values with `@returns`
    - Include usage examples where helpful
    - Explain complex calculations with inline comments

12. **Error Handling**:
    - Validate input parameters
    - Provide meaningful error messages
    - Handle edge cases gracefully
    - Avoid throwing errors in rendering code
    - Return safe fallback values when appropriate
