# AGENTS.md — Package-Scoped Agent Instructions

> Scoped instructions for `@ocean-industries-concept-lab/openbridge-webcomponents`.
> For repository-wide rules see the root [AGENTS.md](../../AGENTS.md).

---

## Quick Reference

```bash
npm run storybook              # dev server on :6006
npm run test-storybook         # visual snapshot tests
npm run test-storybook:watch   # watch mode
npm run new:component          # scaffold a new component (interactive)
npm run analyze                # regenerate custom-elements.json
npm run lint                   # lit-analyzer + eslint
npm run typecheck              # TypeScript type-check
```

---

## Component Creation Checklist

1. Run `npm run new:component` to scaffold files.
2. Implement the component in `component-name.ts` (extend `LitElement`, register with `@customElement`).
3. Write styles in `component-name.css` (PostCSS, use mixins from root instructions).
4. Write stories in `component-name.stories.ts`:
   - Add `tags: ['autodocs', '6.0']` for documented OB 6.0 components.
   - Export a `Default` story plus stories for key states and variants.
   - Use Title Case for story titles (see root `AGENTS.md` § 2).
5. Write JSDoc following the three-pattern strategy (see root `AGENTS.md` § 3).
6. Run `npm run analyze` to update `custom-elements.json`.
7. Run `npm run lint && npm run typecheck` to validate.

---

## Source Directory Layout

| Directory                     | Contents                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `src/components/`             | General UI components (buttons, cards, top-bar, etc.)                            |
| `src/navigation-instruments/` | Instruments (compass, heading, gauge, etc.) and indicators (bearing, speed, ROT) |
| `src/building-blocks/`        | SVG-based low-level instrument pieces (scales, bars, chart bases)                |
| `src/bars-graphs/`            | Chart components (line graph, area graph, donut, pie, polar, radial-bar)         |
| `src/automation/`             | Automation system components (valves, pumps, motors, etc.)                       |
| `src/ar/`                     | Augmented reality components                                                     |
| `src/icons/`                  | Auto-generated icon components (do not edit manually)                            |
| `src/svghelpers/`             | Shared SVG utility functions and mixins                                          |
| `src/charthelpers/`           | Shared chart utility functions                                                   |

---

## Path-Scoped Rules

When editing files in the scopes below, read the corresponding instruction file first:

| Instruction file (`.github/instructions/`) | Applies to                                                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `building-blocks.instructions.md`          | `src/building-blocks/**`, `src/svghelpers/**`                                                                                                                             |
| `circular-charts.instructions.md`          | `src/bars-graphs/**`, `src/charthelpers/**`                                                                                                                               |
| `external-scale.instructions.md`           | `src/building-blocks/external-scale/**`, `src/building-blocks/bar-*/**`, `src/navigation-instruments/gauge-*/**`                                                          |
| `line-area-charts.instructions.md`         | `src/building-blocks/chart-line/**`, `src/bars-graphs/line-graph/**`, `src/bars-graphs/area-graph/**`, `src/navigation-instruments/gauge-trend/**`                        |
| `watch-radial-instruments.instructions.md` | `src/navigation-instruments/{watch,compass,heading,rudder,wind,roll,speed-gauge,gauge-radial,rot-sector,azimuth-thruster}/**`, `src/building-blocks/instrument-radial/**` |
| `setpoint.instructions.md`                 | `src/svghelpers/setpoint*.ts`, `src/building-blocks/setpoint/**`                                                                                                          |

---

## Testing

- Visual snapshot tests: Vitest + storybook-addon-vis + Playwright.
- Baselines: `__vis__/linux/__baselines__/` (CI), `__vis__/darwin/__baselines__/` (macOS).
- Update snapshots: `npm run update-snapshots` or press `u` in Vitest watch mode.
- Tag stories `['!snapshot']` to exclude from visual tests.
