# @oicl/openbridge-webcomponents-svelte

Svelte wrappers for the OpenBridge design system.

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

This package provides **Svelte wrappers** for the [@oicl/openbridge-webcomponents](https://www.npmjs.com/package/@oicl/openbridge-webcomponents) core library. It allows you to use OpenBridge components as native Svelte components with full IDE support, props, and event handling.

## 🏗️ Project Status

This library is currently in active development. We are gearing up for our first stable release in **Q2 2026**.

## 📚 Storybook & Demo

- **[Storybook](https://openbridge-jip-storybook.web.app)**: Browse components and view their different states.
- **[Live Demo](https://openbridge-jip-demo.web.app/)**: See the components in action.

## 💾 Installation

```bash
npm install @oicl/openbridge-webcomponents-svelte
```

## 🚀 Quick Setup

### 1. Include CSS Palettes

Import the global OpenBridge CSS file in your main entry point (e.g., `main.js` or `App.svelte`):

```javascript
import "@oicl/openbridge-webcomponents/dist/openbridge.css";
```

### 2. Set the Theme

Select the palette by setting the `data-obc-theme` attribute on the `html` tag (`bright`, `day`, `dusk`, or `night`):

```html
<html lang="en" data-obc-theme="day"></html>
```

### 3. Font Setup

Ensure **Noto Sans** is available in your project.

## 🧩 Usage

Import the desired components and use them in your Svelte components:

```html
<script>
  import { ObcTopBar } from "@oicl/openbridge-webcomponents-svelte";
</script>

<ObcTopBar />
```

## 👫 Contributing

Contributions are welcome! Please see the [root README](../../README.md) and [CONTRIBUTING.md](../../CONTRIBUTING.md) for development instructions.
