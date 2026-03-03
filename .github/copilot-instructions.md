# GitHub Copilot Custom Instructions

## Repository-Wide Instructions

This repository contains the Openbridge Web Components library, a collection of maritime navigation and automation UI components built with Lit and TypeScript.

- Path-specific instructions for different component types are located in `.github/instructions/`
- Ask for clarification (e.g. a list of questions) before implementing significant changes

## Available Instruction Files

| File                                       | Scope                                                                                                                                                                          | Description                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `building-blocks.instructions.md`          | `building-blocks/**`, `svghelpers/**`                                                                                                                                          | SVG-based building block components and shared utilities  |
| `circular-charts.instructions.md`          | `bars-graphs/**`, `charthelpers/**`                                                                                                                                            | Circular chart components (donut, pie, polar, radial-bar) |
| `external-scale.instructions.md`           | `external-scale/**`, `bar-vertical/**`, `bar-horizontal/**`, `gauge-vertical/**`, `gauge-horizontal/**`                                                                        | External scale renderer and bar/gauge wrappers            |
| `line-area-charts.instructions.md`         | `chart-line/**`, `line-graph/**`, `area-graph/**`, `gauge-trend/**`                                                                                                            | Line/area charts and composite gauge-trend component      |
| `watch-radial-instruments.instructions.md` | `watch/**`, `compass/**`, `heading/**`, `rudder/**`, `wind/**`, `roll/**`, `speed-gauge/**`, `gauge-radial/**`, `rot-sector/**`, `azimuth-thruster/**`, `instrument-radial/**` | Circular watch-based instruments and radial gauges        |
| `setpoint.instructions.md`                 | `svghelpers/setpoint*.ts`, `building-blocks/setpoint/**`                                                                                                                       | Setpoint design layer, mixin/bundle, confirm animation    |
