# GitHub Copilot Custom Instructions

> **Canonical instructions live in [`AGENTS.md`](../AGENTS.md).**
> This file exists because GitHub Copilot reads `.github/copilot-instructions.md`
> by convention. It re-exports the key pointers; for full details read `AGENTS.md`.

## Repository-Wide Instructions

This repository contains the Openbridge Web Components library, a collection of maritime navigation and automation UI components built with Lit and TypeScript.

- **Start here →** [`AGENTS.md`](../AGENTS.md) — comprehensive rules for all AI agents (coding standards, JSDoc template, build commands, component checklist, directory layout, behavioral rules).
- Path-specific instructions for different component types are located in `.github/instructions/`
- Documentation rules are in `.cursor/rules/comments.mdc` — follow its JSDoc template for all components
- The repo has three code patterns that require different documentation strategies: **concrete components** (autodocs via `custom-elements.json`), **pure function modules** (manual story docs + module-level JSDoc), and **abstract base classes** (JSDoc with `@ignore` + story description override). See `AGENTS.md` § 3 for full details.
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
