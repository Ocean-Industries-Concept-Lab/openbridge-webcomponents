# Openbridge Web Components

This monorepo contains the OpenBridge design system implemented as web components.

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

## 🏗️ Prerelease Status

We are gearing up for our first stable release in **Q2 2026**. It has been an incredibly productive first year, with more than 200 components already implemented. Our primary focus now is to stabilize the API and ensure a robust foundation for the 1.0.0 release.

## 🤝 Join the Joint Industry Project (JIP)

We are committed to the long-term development of this library, but sustainable growth requires funding. We invite industry partners to join our Joint Industry Project. By contributing, you help secure the future of the project and gain influence over the roadmap.

For more information, please contact us on [Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ).

## 📜 New Licensing Model

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

## 🎬 Introduction video

We have made a [short introduction to the library](https://www.youtube.com/watch?v=5DiEA4voqzI).

<a href="https://www.youtube.com/watch?feature=player_embedded&v=5DiEA4voqzI" target="_blank">
 <img src="https://img.youtube.com/vi/5DiEA4voqzI/0.jpg" alt="Watch the video: Intro to OpenBridge Web Components" width="480" height="360" />
</a>

## 📋 Table of Contents

- [Monorepo Structure](#-monorepo-structure)
- [Storybook & Demo](#-storybook--demo)
- [Getting Started (Development)](#-getting-started-development)
- [Contributing](#-contributing)
- [Documentation Index](#-documentation-index)

## 📂 Monorepo Structure

This repository uses npm workspaces and is organized as follows:

| Package | Description |
| --- | --- |
| [`packages/openbridge-webcomponents`](packages/openbridge-webcomponents) | Core Lit-based web components (Source of truth). |
| [`packages/openbridge-webcomponents-vue`](packages/openbridge-webcomponents-vue) | Auto-generated Vue.js wrappers. |
| [`packages/openbridge-webcomponents-react`](packages/openbridge-webcomponents-react) | Auto-generated React wrappers. |
| [`packages/openbridge-webcomponents-ng`](packages/openbridge-webcomponents-ng) | Auto-generated Angular wrappers. |
| [`packages/openbridge-webcomponents-svelte`](packages/openbridge-webcomponents-svelte) | Auto-generated Svelte wrappers. |
| `packages/vue-demo` | Demo application using Vue.js. |
| `packages/react-demo` | Demo application using React. |

## 📚 Storybook & Demo

- **[Storybook](https://openbridge-storybook.web.app)**: Browse components, view states, and interact with them in isolation.
- **[Live Demo](https://openbridge-demo.web.app/)**: See the components in action within a Vue.js application.

## 🚩 Getting Started Development

To get started with developing the components:

### With VS Code Dev Container (Recommended ✅)

1. Clone the repository.
2. Open in VS Code.
3. Run `Dev Container: Open Workspace in Container` and select `openbridge-webcomponents.code-workspace`.
4. Once running, go to `packages/openbridge-webcomponents` and run `npm run storybook`.

### Manual Setup (Not Recommended ⚠️)

1. Clone the repository.
2. Install Node.js (v20+).
3. Run `npm install` in the root folder.
4. Run `npm run build:lib` to build all libraries.

For more detailed development instructions, see [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md), [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## 👫 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit conventions, and PR guidelines.

## 📄 Documentation Index

| Document | Description |
| --- | --- |
| [AGENTS.md](AGENTS.md) | **Crucial for AI agents** and developers: coding standards, JSDoc, and build rules. |
| [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md) | Architecture, PostCSS mixins, SVG practices. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution workflow and standards. |
| [CORE_README](packages/openbridge-webcomponents/README.md) | Usage and installation for the core package. |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Contributor Covenant Code of Conduct. |
| [LICENSE.TXT](LICENSE.TXT) | Apache 2.0 license. |
