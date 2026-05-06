# Openbridge Web Components

This monorepo contains the OpenBridge design system implemented as web components.

## 🚀 Project Status

**v1.0.0 is now released!** It has been an incredibly productive first year, with more than 200 components already implemented. The code was officially opened by **Prince Sverre Magnus of Norway** and is now publicly available, marking our first stable milestone.

## 🌿 Branching Strategy

We use two long-lived branches to manage our development:

- **`develop`**: This is the active development branch. It contains the latest changes and features. Note that this branch may include breaking changes and is intended for contributors and early adopters. Releases based on this branch are tagged as `next` on [npm](https://www.npmjs.com/package/@oicl/openbridge-webcomponents).
- **`stable`**: This branch contains the stable, production-ready version of the library. It is updated from the `develop` branch approximately once every quarter. Releases based on this branch are tagged as `latest` on [npm](https://www.npmjs.com/package/@oicl/openbridge-webcomponents).

## 🤝 Support the Project

We are thrilled if you would like to support the OpenBridge Web Components project. Your contribution plays a vital role in maintaining an open, high-quality design system.

We invite industry partners to join our Joint Industry Project. By becoming a donor, you help secure the future of the project and gain influence over the roadmap.

### Donor Benefits
By becoming a donor, you aren’t just supporting code—you’re joining a collaborative movement. To show our appreciation, donors receive a specialized benefits package valid for 12 months upon receipt of payment:

- **Proudly Show Your Support:** You are authorized to use the official "OpenBridge Member" logo in your marketing materials and corporate communications.
- **Early & Easy Access:** You gain the right to use all new releases of the project’s software components directly under the Apache License 2.0.

### How to Support
If you are interested in supporting the project, please fill out this **[Support Form](https://docs.google.com/forms/d/e/1FAIpQLSc6JVRyyIease2PkUArirNkG0DeTB__YnWEovjVwISlaYdktA/viewform?usp=header)**.

For more information, please contact **Torstein A. Bø** at [torstein.bo@openstudio.no](mailto:torstein.bo@openstudio.no) or contact us on [Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ).

## 📜 Licensing Model

We will **always remain open source**, but we have evolved our model to ensure continued development. With the 1.0.0 release, we have transitioned to a new licensing system.

### How it works:

Under the new model, each release, both based on `develop` and `stable` branch, follows a "delayed" permissive license cycle:

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

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

[Join our Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ) to get the latest updates and to ask questions.

## 🎬 Introduction video

We have made a [short introduction to the library](https://www.youtube.com/watch?v=5DiEA4voqzI).

<a href="https://www.youtube.com/watch?feature=player_embedded&v=5DiEA4voqzI" target="_blank">
 <img src="https://img.youtube.com/vi/5DiEA4voqzI/0.jpg" alt="Watch the video: Intro to OpenBridge Web Components" width="480" height="360" />
</a>

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

Storybook is the component reference: it shows each component in isolation with interactive controls, states, and variants.
The Live Demo is an application showcase: it shows how components work together in realistic page flows.

| Channel                                    | Storybook                                                                      | Live Demo                                                             |
|--------------------------------------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| **Stable** (`stable` branch, npm `latest`) | [openbridge-storybook.web.app](https://openbridge-storybook.web.app)           | [openbridge-demo.web.app](https://openbridge-demo.web.app/)           |
| **Develop** (`develop` branch, npm `next`) | [openbridge-next-storybook.web.app](https://openbridge-next-storybook.web.app) | [openbridge-next-demo.web.app](https://openbridge-next-demo.web.app/) |

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
| [Vue Wrapper](packages/openbridge-webcomponents-vue/README.md) | Usage and installation for Vue.js. |
| [React Wrapper](packages/openbridge-webcomponents-react/README.md) | Usage and installation for React. |
| [Angular Wrapper](packages/openbridge-webcomponents-ng/README.md) | Usage and installation for Angular. |
| [Svelte Wrapper](packages/openbridge-webcomponents-svelte/README.md) | Usage and installation for Svelte. |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Contributor Covenant Code of Conduct. |
| [LICENSE.TXT](LICENSE.TXT) | Apache 2.0 license. |
