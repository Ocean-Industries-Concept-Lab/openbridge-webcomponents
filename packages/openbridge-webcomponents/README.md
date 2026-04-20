# @oicl/openbridge-webcomponents

The core library of the OpenBridge design system, implemented as Lit-based web components.

## 🚀 Project Status

**v1.0.0 is now released!** The code was officially opened by **Prince Sverre Magnus of Norway**, and the library is now stable and publicly available.

## 🏷️ Tag Strategy

We use npm tags to manage our releases:

- **`latest`**: The stable, production-ready version of the library. It is updated approximately once every quarter. It's based on the `stable` branch in the GitHub repository.
- **`next`**: The latest development version, containing new features and improvements. This version may include breaking changes and is intended for early adopters. It's based on the `develop` branch in the GitHub repository.

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

## 📚 Storybook & Demo

- **[Storybook](https://openbridge-storybook.web.app)**: Browse components and view their different states.
- **[Live Demo](https://openbridge-demo.web.app/)**: See the components in action.

## 💾 Installation

To use the components in your project, install the package from npm:

```bash
npm install @oicl/openbridge-webcomponents
```

> **Note:** If you are using Vue, React, Angular, or Svelte, we recommend using our [wrapper packages](#-framework-wrappers) for a better developer experience.

## 🚀 Quick Setup

### 1. Include CSS Palettes

Import the global OpenBridge CSS file in your main entry point:

```javascript
import '@oicl/openbridge-webcomponents/dist/openbridge.css';
```

### 2. Set the Theme

Select the palette by setting the `data-obc-theme` attribute on the `html` tag (`bright`, `day`, `dusk`, or `night`):

```html
<html lang="en" data-obc-theme="day"></html>
```

### 3. Set Component Size

Select the global component size by setting a class on the `body` tag (`obc-component-size-regular`, `medium`, `large`, or `xl`):

```html
<body class="obc-component-size-regular"></body>
```

### 4. Font Setup

The library uses **Noto Sans**. You should ensure it is available in your project.

```css
@font-face {
  font-family: 'Noto Sans';
  src: url('path/to/NotoSans.ttf');
}

* {
  font-family: 'Noto Sans', sans-serif;
}
```

## 🧩 Usage

### Standard Web Components

Import the components you need:

```javascript
import '@oicl/openbridge-webcomponents/dist/components/top-bar/top-bar.js';
```

Use them in your HTML:

```html
<obc-top-bar></obc-top-bar>
```

### Bundle Version (CDN / Prototyping)

For quick prototyping, you can use the bundled version:

```html
<script
  type="module"
  src="node_modules/@oicl/openbridge-webcomponents/dist/openbridge-webcomponents.bundle.js"
></script>
```

## 📦 Framework Wrappers

For the best experience in your framework of choice, use our auto-generated wrappers:

- [`@oicl/openbridge-webcomponents-vue`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-vue)
- [`@oicl/openbridge-webcomponents-react`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-react)
- [`@oicl/openbridge-webcomponents-ng`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-ng)
- [`@oicl/openbridge-webcomponents-svelte`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-svelte)

## 💬 Slack

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

[Join our Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ) to get the latest updates and to ask questions.

## 👫 Contributing

Contributions are welcome! Please see the [root README](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/stable/README.md) and [CONTRIBUTING.md](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/stable/CONTRIBUTING.md) for development instructions.

<!-- test -->
