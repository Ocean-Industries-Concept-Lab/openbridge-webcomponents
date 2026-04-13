# @oicl/openbridge-webcomponents

The core library of the OpenBridge design system, implemented as Lit-based web components.

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

## 🏗️ Project Status

This library is currently in active development. We are gearing up for our first stable release in **Q2 2026**.

[👉 Click here to read more about the project and the JIP.](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

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

- [`@oicl/openbridge-webcomponents-vue`](../openbridge-webcomponents-vue)
- [`@oicl/openbridge-webcomponents-react`](../openbridge-webcomponents-react)
- [`@oicl/openbridge-webcomponents-ng`](../openbridge-webcomponents-ng)
- [`@oicl/openbridge-webcomponents-svelte`](../openbridge-webcomponents-svelte)

## 👫 Contributing

Contributions are welcome! Please see the [root README](../../README.md) and [CONTRIBUTING.md](../../CONTRIBUTING.md) for development instructions.
