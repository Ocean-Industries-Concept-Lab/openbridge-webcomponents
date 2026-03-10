# OpenBridge Web Components — Project Conventions

## Tech Stack

- **Lit** web components (LitElement, Shadow DOM)
- **TypeScript** with strict settings
- **PostCSS** with mixins and nesting
- **Vite** for building
- **Storybook** for component documentation

## Component Rules

- Use **enums**, not union types, for variant/state properties
- Default **boolean** properties to `false`
- Use **PostCSS mixin styles** for typography and colors (e.g. `@mixin font-title;`, `@mixin font-body;`) — do not use raw CSS font variables directly
- Use CSS custom property tokens for colors (e.g. `var(--element-active-color)`, `var(--border-outline-color)`)

## Dual API for Text (Slot + Property)

- Provide both a **slot** and a **string property** for text content
- The slot allows rich HTML (e.g. `CO<sub>2</sub>`); the property serves as a simple fallback
- Pattern: `<slot name="title">${this.title}</slot>`

## Slots and Props for Child Components

- Use **boolean props** (e.g. `hasIcon`, `hasAction1`) to control whether a slot is rendered
- Use **slots** for icons passed into the component
- When rendering `obc-icon-button` inside a component, use props to control visibility and a slot for the icon content

## Storybook

- Story `title` uses **Title Case** (e.g. `'UI Components/Forms/Title Container'`)

## Custom Element Naming

- Tag prefix: `obc-` (e.g. `obc-title-container`)
- Class prefix: `Obc` (e.g. `ObcTitleContainer`)
- Icon prefix: `obi-` (e.g. `obi-placeholder`)

## Build & Test

- Do **not** run `npm run build` or start/test Storybook automatically
- Run visual tests for a single component: `npx vitest run --project storybook 'component-name'`
- Update baselines for a single component: `npx vitest run --project storybook --update 'component-name'`
- Always verify after updating: run the test again without `--update` to confirm baselines are stable

## Commits

- Do **not** run add yourself as co-author. We are using conventional commits, and make sure to commit files that belong together.