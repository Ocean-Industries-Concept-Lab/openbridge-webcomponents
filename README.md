# Openbridge Web Components

This library implementes the OpenBridge design system in web components.

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

## 🏗️ We are in prerelease 🏗️

We are gearing up for our first stable release in Q2 2026. It has been a productive first year, with more than 200 components already implemented. Our primary focus now is to stabilize the API and ensure a robust foundation for the 1.0.0 release.

## Join the joint industry project

We are committed to the long-term development of this library, but sustainable growth requires funding. We invite industry partners to join our Joint Industry Project. By contributing, you help secure the future of the project and gain influence over the roadmap.

For more information, please contact us on [Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ).

Her er et utkast til en renskrevet versjon. Jeg har korrigert skrivefeil, strammet opp språket for å gjøre det mer profesjonelt, og strukturert lisensinformasjonen slik at den er lettere å forstå.

---

## 🏗️ Prerelease Status

We are gearing up for our first stable release in **Q2 2026**. It has been an incredibly productive first year, with more than 200 components already implemented. Our primary focus now is to stabilize the API and ensure a robust foundation for the 1.0.0 release.

## Join the Joint Industry Project (JIP)

We are committed to the long-term development of this library, but sustainable growth requires funding. We invite industry partners to join our Joint Industry Project. By contributing, you help secure the future of the project and gain influence over the roadmap.

For more information, please contact us on [Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ).

---

## New Licensing Model

We will **always remain open source**, but we are evolving our model to ensure continued development. Shortly after the 1.0.0 release in Q2 2026, we will transition to a new licensing system.

### Why the change?

Previously, we maintained two separate codebases: one closed (for the first 12 months) and one public. Maintaining parallel codebases is resource-intensive. Our new model allows us to work in the open while still providing an incentive for project funding.

### How it works:

Under the new model, each release follows a "delayed" permissive license cycle:

1.  **Initial Release:** Each new version is licensed under **AGPL** for the first 6 months.
2.  **Transition:** After 6 months, the license for that specific version automatically switches to **Apache 2.0**.
3.  **Supporter Access:** Project donors and sponsors receive **immediate access** to the code under the **Apache 2.0** license.

> **Example:**
> If version 1.2.2 is released on **August 14, 2026**:
>
> - **open-source projects and internal users** can use it immediately under AGPL.
> - **donors** can use it immediately under **Apache 2.0**.
> - From **February 14, 2027**, version 1.2.2 becomes available to everyone under the **Apache 2.0** license (e.g., for commercial use without AGPL restrictions).

## 💬 Slack

[Join our Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ) to get the latest updates and to ask questions.

## 📽️ Introduction video

We have made a [short introduction to the library](https://www.youtube.com/watch?v=5DiEA4voqzI).

<a href="http://www.youtube.com/watch?feature=player_embedded&v=5DiEA4voqzI" target="_blank">
 <img src="https://img.youtube.com/vi/5DiEA4voqzI/0.jpg" alt="Watch the video: Intro to OpenBridge Web Components" width="480" height="360" />
</a>

## 📋 Table of Contents

- [Storybook](#storybook)
- [Demo](#demo)
- [CSS file for palettes](#css-file-for-palettes)
- [Components](#components)
- [Installation](#installation)
- [Getting Started Developing](#getting-started-developing)
- [Contributing](#contributing)
- [AI](#ai)
- [Documentation Index](#documentation-index)

## 📚 Storybook

[Storybook](https://openbridge-jip-storybook.web.app) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

## 🖱️ Demo

[The demo](https://openbridge-jip-demo.web.app/) showcases the project's functionality using Vue.js. It provides a live demonstration of the project's features and allows you to interact with the application.

## 🎨 CSS file for palettes

The CSS file for the palettes is located at [packages/openbridge-webcomponents/dist/openbridge.css](packages/openbridge-webcomponents/dist/openbridge.css).
The source file is `variables.css`, which is compiled into `openbridge.css` in the final package. It contains all the OpenBridge palettes (bright, day, dusk, night).
It can be used to set the color theme of components.
To select the palette, set the `data-obc-theme` attribute on the `html` tag:

```html
<html lang="en" data-obc-theme="day"></html>
```

## 🧩 Components

The components for this project are implemented in the `packages/openbridge-webcomponents` folder.

## 💾 Installation

To use the components in your project, you can install the package from GitHub package repo.

Start by creating a classic personal access token in GitHub
Go to [GitHub settings](https://github.com/settings/tokens/new) to make a classic token. Give the token the `read:packages` permission. Click "Generate token" and copy the token.

Login into GitHub package repo:

```bash
npm login --registry https://npm.pkg.github.com/ --scope=@ocean-industries-concept-lab
```

Use our GitHub username as username and paste in the generated token as password.

You can now install the package:

```bash
npm install @ocean-industries-concept-lab/openbridge-webcomponents
```

To use the components in your Vue.js project, you can install the package from npm:

```bash
npm install @ocean-industries-concept-lab/openbridge-webcomponents-vue
```

### Setup

1. Add the css file to your project:
   ```javascript
   import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css";
   ```
2. Select the palette by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day"></html>
   ```
3. Select the global component size by setting the class (`regular`, `medium`, `large`, or `xl`):
   ```html
   <body class="obc-component-size-regular"></body>
   ```
   After upgrading to OpenBridge 6.0, the size of each component can be modified individually by setting the class on each component. It can also be used to set the size of all components in a container.
4. Install the Noto Sans font by using the attached `NotoSans.ttf` file. Add the following to your css:

   ```css
   @font-face {
     font-family: "Noto Sans";
     src: url("path/to/NotoSans.ttf");
   }

   * {
     font-family: Noto Sans;
   }
   ```

5. Import the desired components in your project, for instance:

   ```javascript
   import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/top-bar/top-bar.js";
   ```

   or with vue wrapper:

   ```javascript
   import ObcTopBar from "@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/top-bar/ObcTopBar.vue";
   ```

6. Use the components in your project:
   ```html
   <obc-top-bar></obc-top-bar>
   ```
   or with vue wrapper:
   ```html
   <ObcTopBar></ObcTopBar>
   ```

## 🚩 Getting Started Developing

> **⚠️ Warning:** As the code is currently developed in a closed repo we will not accept any PR before the code is published.

### With VS Code Dev Container (recommended ✅)

To get started with the project, follow these steps:

1. Clone the repository.
2. Install Visual Studio Code.
3. Install Docker (requires license for large organizations).
4. Open Visual Studio Code.
5. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac).
6. Run the command `Dev Container: Open Workspace in Container`
   Select the `openbridge-webcomponents.code-workspace` file in the root folder of the repository.
   This will open the project in a containerized environment with all the necessary dependencies installed.
7. Once the dev container is running, go to the `packages/openbridge-webcomponents` folder and run `npm run storybook` to start the Storybook development environment (typically at `http://localhost:6006/`).
8. When creating new components or modifying stories:
   - Run `npm run test-storybook` to run visual snapshot tests (uses Vitest + Playwright).
   - If tests fail because a component's appearance changed intentionally, press `u` in the Vitest terminal to update the snapshots.
   - You can also run `npm run update-snapshots` to replace all baselines with the latest results.
9. Check [CONTRIBUTING.md](CONTRIBUTING.md) for branch and commit naming conventions.
10. Before you push your changes, run:

- `npm run format` to format the code, and
- `npm run lint` to check for linting errors (and fix the reported errors).

11. Optional: Go to the `packages/vue-demo` folder and run `npm run dev` to run the Vue.js demo application.
12. Optional: If anything seems broken, try deleting all `node_modules` and `dist` folders from the repository, go to the root folder and re-run the **postCreateCommand** from .devcontainer/devcontainer.json: `npm install && npm run build:lib && cd packages/openbridge-webcomponents && npx playwright install --with-deps` (starting from a clean slate)

### Without VS Code devcontainer (not recommended ⚠️)

1. Clone the repository.
2. Install Node.js (version 20 or later).
3. Run `npm install` in the root folder to install the dependencies.
4. Run `npm run build:lib` to build all libraries.
5. Optional: Go to the `packages/openbridge-webcomponents` folder and run `npm run storybook` to start the Storybook development environment.
6. Optional: Go to the `packages/vue-demo` folder and run `npm run dev` to run the Vue.js demo application.

## 📦 Packages:

This mono-repo contains the following packages:

- `openbridge-webcomponents`: The main package containing the web components.
- `openbridge-webcomponents-vue`: A wrapper for the web components to be used in Vue.js projects. It is autogenerated from the `openbridge-webcomponents` package.
- `vue-demo`: A demo application showcasing the web components in a Vue.js project.

## 🧑‍💻 Steps in the development process:

### Formatting:

Run `npm run format:all` to format the code using Prettier.

### Testing:

We use visual snapshot testing of the components through Storybook, powered by [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/).

All commands below should be run from the `packages/openbridge-webcomponents` folder.

- **Run tests:** `npm run test-storybook`
- **Watch mode:** `npm run test-storybook:watch`
- **Update snapshots interactively:** press `u` while tests are running to update failing snapshots.
- **Replace all baselines:** `npm run update-snapshots` (replaces `__vis__/linux/__baselines__/` with the latest results).

Snapshot baselines are stored in the `__vis__/` directory, organized by platform (`linux`, `darwin`).

## 👫 Contributing

> **⚠️ Warning:** As the code is currently developed in a closed repo we will not accept any PR before the code is published.

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## 🤖 AI

Code quality and visual precision are very important in this project (even half a pixel matters!). For that reason, try to avoid AI hallucinations as much as possible:

- provide precise context (list all the file names, enums, examples, etc.)
- ask the AI to read the files it is working on into memory (for broader exploration, let it use subagents)
- instruct the AI to ask clarifying questions before it begins
- use the latest AI models (the difference can be huge between a paid or latest model compared to free/older ones)
- keep the AI on a short leash

| Document                                                                                                  | Description                                                                                              |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                                                                    | Canonical rules for all AI coding assistants — coding standards, JSDoc, build commands, behavioral rules |
| [.github/copilot-instructions.md](.github/copilot-instructions.md)                                        | GitHub Copilot entry point (re-exports AGENTS.md)                                                        |
| [.cursor/rules/comments.mdc](.cursor/rules/comments.mdc)                                                  | Full JSDoc template and structured-tag rules                                                             |
| [Doc-Generator README](packages/openbridge-webcomponents/script/docgen/README.md)                         | OpenAI-powered JSDoc generation CLI                                                                      |
| [building-blocks.instructions.md](.github/instructions/building-blocks.instructions.md)                   | SVG-based building block components and shared SVG utilities                                             |
| [circular-charts.instructions.md](.github/instructions/circular-charts.instructions.md)                   | Circular chart components (donut, pie, polar, radial-bar)                                                |
| [external-scale.instructions.md](.github/instructions/external-scale.instructions.md)                     | External scale renderer and bar/gauge wrappers                                                           |
| [line-area-charts.instructions.md](.github/instructions/line-area-charts.instructions.md)                 | Line/area charts and composite gauge-trend component                                                     |
| [setpoint.instructions.md](.github/instructions/setpoint.instructions.md)                                 | Setpoint design layer, mixin/bundle, confirm animation                                                   |
| [watch-radial-instruments.instructions.md](.github/instructions/watch-radial-instruments.instructions.md) | Circular watch-based instruments and radial gauges                                                       |

## 📄 Documentation Index

You may be interested in the following documents as well:

| Document                                                           | Description                                                                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| [Core Package README](packages/openbridge-webcomponents/README.md) | Installation, setup, bundle usage, and package API                               |
| [Getting Started (React)](docs/getting-started-react.md)           | Step-by-step tutorial for React applications                                     |
| [Getting Started (Angular)](docs/getting-started-angular.md)       | Step-by-step tutorial for Angular applications                                   |
| [Charts and Graphs Guide](docs/graph.md)                           | Usage guide for all chart components (line, area, donut, pie, polar, radial-bar) |
| [Vue Demo](packages/vue-demo/README.md)                            | Running the Vue.js demo application                                              |
| [React Demo](packages/react-demo/README.md)                        | Running the React demo application                                               |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                 | Contribution workflow, commit conventions, PR guidelines                         |
| [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md)       | Architecture overview, PostCSS mixins, SVG practices, component creation         |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)                           | Contributor Covenant Code of Conduct                                             |
| [LICENSE.TXT](LICENSE.TXT)                                         | Apache 2.0 license                                                               |
