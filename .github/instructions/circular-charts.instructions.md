---
applyTo: "packages/openbridge-webcomponents/src/bars-graphs/**,packages/openbridge-webcomponents/src/charthelpers/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for Circular Charts & Chart Helpers

These instructions apply to circular chart components (donut, pie, polar, radial-bar) and their shared helper utilities.

### `packages/openbridge-webcomponents/src/bars-graphs/**`

When working with circular chart components in this directory:

1. **Unified Chart Architecture**:

   - Circular charts are built on Chart.js and share common helpers from `charthelpers/`
   - Prefer abstracting common logic to shared helpers rather than duplicating across chart components
   - Consider checking if similar functionality exists in shared helpers or existing chart components before implementing new features
   - Typical markup structure:
     ```html
     <div class="wrapper">
       <canvas></canvas>
     </div>
     ```

2. **Canvas Sizing for Circular Charts**:

   - Standard chart dimensions: CHART_WIDTH = 256px, CANVAS_PADDING = 32px (resulting in 320x320px full canvas size)
   - Charts are responsive (`responsive: true`) and maintain aspect ratio (`maintainAspectRatio: true`)
   - Canvas width is typically 100% of its container, with height computed based on aspect ratio
   - Consider updating or redrawing the chart when size changes (programmatic or resize-based)
   - Canvas aspect ratio is typically 1:1 (square), but may be adjusted when labels require more horizontal space
   - When labels need extra space, additional padding is typically added to both left and right sides

3. **Outer Labels (Optional Feature)**:

   - When implemented, outer labels are typically positioned outside the main chart circle
   - Consider using custom plugins from `charthelpers/` for consistent label positioning across chart types
   - Label dimensions often relate to chart data, options, aspect ratio, and padding
   - If labels fit within the standard padding area, aspect ratio adjustment may not be needed
   - When adding outer label support to a new chart type, consider extending existing shared plugins

4. **Code Organization**:

   - Shared utilities can be imported from `../../charthelpers/index.js`
   - Chart-specific constants are typically kept in the component file (e.g., `DONUT_DIMENSIONS`, `PIE_DIMENSIONS`)
   - Consider destroying and recreating charts for major option changes (rather than just calling `update()`)
   - Common component structure pattern:
     - Properties with `@property()`
     - State with `@state()`
     - Canvas with `@query('canvas')`
     - Chart instance as `private chart?: Chart`
     - Observers as `private themeObserver?: MutationObserver` and `private resizeObserver?: ResizeObserver`

5. **Component Lifecycle**:

   - `willUpdate()` is useful for calculating derived state (e.g., totals, percentages)
   - `updated()` is useful for triggering chart updates when properties change
   - `firstUpdated()` is useful for initial chart creation and observer setup
   - `disconnectedCallback()` should handle cleanup (destroy chart, disconnect observers)
   - Remember to call `super.disconnectedCallback()` when overriding

6. **Chart Updates**:

   - Helpers like `shouldUpdateChart()` can determine if chart needs updating
   - Track which properties trigger chart updates
   - Major changes (like layout mode toggles) may require chart recreation
   - Minor changes (data, colors) can often use chart data/option updates
   - `prepareChartData()` methods typically transform component properties into Chart.js format
   - Donut/radial bar charts often include a "remaining" segment to show unused capacity

7. **Theme Integration**:

   - `observeThemeChanges()` from `charthelpers/theme.js` enables automatic theme updates
   - `getCssVariableValue()` reads CSS custom properties
   - Prefer CSS variables over hardcoded colors for theme compatibility

8. **Storybook & Testing**:

   - Cover key features and edge cases in Storybook stories
   - `widthDecorator` from `../../storybook-util.js` can simulate browser resizing
   - Tag stories appropriately (e.g., `tags: ['autodocs', '6.0']`)
   - Include stories for common use cases and empty/no data states

9. **CSS Styling**:
   - Component styles are typically imported using `unsafeCSS()` with `?inline` suffix
   - Example: `import componentStyle from './chart-name.css?inline'`
   - Applied with: `static override styles = unsafeCSS(componentStyle)`

### `packages/openbridge-webcomponents/src/charthelpers/**`

When working with chart helper utilities:

1. **Shared Utility Philosophy**:

   - These helpers are shared across circular chart components (donut, pie, polar, radial-bar, and potentially future types)
   - Changes here can affect multiple chart components
   - Prefer pure functions where practical (no side effects)
   - Include TypeScript types for function parameters and return values

2. **File Organization**:

   - Common file structure:
     - `constants.ts`: Chart dimensions, padding, color defaults, label configs
     - `colors.ts`: CSS variable reading, color resolution
     - `theme.ts`: Theme change observation
   - `index.ts` exports helpers for convenient importing
   - Consider organizing new helpers in separate files with clear responsibilities
   - Export new helpers from `index.ts` for consistency

3. **Plugin Architecture**:

   - Plugins typically follow Chart.js plugin structure with `id` and lifecycle hooks
   - Common lifecycle hooks include: `beforeDraw`, `afterDraw`, `beforeDatasetsDraw`, `afterDatasetsDraw`
   - Plugins often accept configuration via options object
   - TypeScript interfaces can define plugin options (e.g., `OuterLabelsOptions`)

4. **CSS Variables**:

   - `getCssVariableValue(host, varName)` reads CSS custom properties
   - Trim CSS variable values (`.trim()`) for consistency
   - Common variables include: `--element-neutral-color`, `--instrument-tick-mark-secondary-color`, `--container-section-color`

5. **Constants Management**:

   - Chart dimensions are typically defined in `CHART_DIMENSIONS` constant object
   - Consider `as const` for type safety and immutability
   - Computed properties can use getters for derived values

6. **Formatting Helpers**:

   - Support value and percentage formatting
   - Allow configurable decimal places
   - Support unit display (e.g., `%`, `kW`, `kg`)
   - Handle edge cases like null/undefined values and division by zero

7. **Aspect Ratio Helpers**:

   - Calculate aspect ratio based on canvas dimensions and padding requirements
   - Consider outer labels when calculating aspect ratio
   - Support different chart modes (e.g., full circle vs half circle)
   - Return aspect ratio as width/height (e.g., `1` for square, `1.67` for wider)

8. **Outer Labels Plugin (When Applicable)**:

   - Position labels outside the chart circle at calculated radius
   - Support text alignment based on angle (left/center/right)
   - Format values with units and decimal places
   - Calculate canvas padding based on label dimensions (digits, decimal places, unit, max length)
   - Use font metrics for text measurement

9. **Theme Helpers**:

   - Observe `data-obc-theme` attribute changes on document root
   - Use MutationObserver for efficient theme change detection
   - Provide cleanup via observer disconnect
   - Execute callback when theme changes
   - Return observer instance for component cleanup

10. **Type Safety**:

    - Export TypeScript interfaces and types
    - Use `readonly` for configuration objects where appropriate
    - Consider union types for cross-chart compatibility

11. **Documentation**:

    - JSDoc comments help describe exported functions
    - Document parameters with `@param` and return values with `@returns`
    - Include usage examples where helpful
    - Explain complex calculations with inline comments

12. **Error Handling**:
    - Validate input parameters where necessary
    - Provide helpful error messages
    - Handle edge cases gracefully
    - Consider safe fallback values in rendering code
