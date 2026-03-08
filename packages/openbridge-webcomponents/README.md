# Openbridge Web Components

[![discord, join chat](https://img.shields.io/badge/discord-join_chat-brightgreen.svg?logo=discord&labelColor=white&style=flat&color=%235865F2)](https://discord.gg/wSCPxPH3RJ)

Welcome to the Openbridge Web Components! This readme file provides an overview of the project and its components.

# 🎉 We are preparing to release OpenBridge 6.0 in March 2026 🎉

We are currently developing the code in a joint industry project, with funding from industry partners.
The code is only available for the partners until the release in March 2026. It is possible to get access to the code in active development by joining the project.

[👉 Click here to read more about the project.](https://docs.google.com/document/d/18ytBiUrfQrMYOPPz-hd7pgPjnG8ZBG-zr9xYl5Y2TTs/edit?tab=t.0)

[👉 Click here to register your interest in the form. (Note: Registering is not a commitment but will enroll you in our process.)](https://docs.google.com/forms/d/e/1FAIpQLSd2H7bbL_duBTMhHzjw7W52H9XXAiJ9A3sL7PsrfCTW_bNUhw/viewform)

> **❗Caution❗** This repository is currently in early development and may not be stable. Please use with caution.

# Discord server

Join our discord server to get the latest updates and to ask questions. [Join here.](https://discord.gg/wSCPxPH3RJ)

# Introduction video

We have made a short introduction to the library. You can watch it [here](https://www.youtube.com/watch?v=5DiEA4voqzI)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=5DiEA4voqzI" target="_blank">
 <img src="https://img.youtube.com/vi/5DiEA4voqzI/0.jpg" alt="Watch the video" width="480" height="360" />
</a>

## Table of Contents

- [Storybook](#storybook)
- [Demo](#demo)
- [CSS file for palettes](#css-file-for-palettes)
- [Installation](#installation)
- [Bundle Version (Browser Only)](#bundle-version-browser-only)
- [Contributing](#contributing)

## Storybook

[Storybook](https://storybook.js.org/) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

To access the Storybook for this project, click [here](https://openbridge-jip-storybook.web.app).

## Demo

The demo showcases the project's functionality using Vue.js. It provides a live demonstration of the project's features and allows you to interact with the application.

To access the demo, click [here](https://openbridge-jip-demo.web.app/).

## CSS file for palettes

The CSS file for the palettes is located at [packages/openbridge-webcomponents/dist/openbridge.css](packages/openbridge-webcomponents/dist/openbridge.css) or by importing it directly from the package:

```javascript
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css';
```

The file is called `variables.css` and contains all the openbridge palette (bright, day, dusk, night).
It can be used to set the color theme of components.
To select the palette, set the `data-obc-theme` attribute on the `html` tag:

```html
<html lang="en" data-obc-theme="day"></html>
```

## Installation

If you want to use the components in a Vue.js or React project we suggest that you use the wrapper packages [@ocean-industries-concept-lab/openbridge-webcomponents-vue](https://www.npmjs.com/package/@ocean-industries-concept-lab/openbridge-webcomponents-vue) or [@ocean-industries-concept-lab/openbridge-webcomponents-react](https://www.npmjs.com/package/@ocean-industries-concept-lab/openbridge-webcomponents-react) respectively.

To use the components in your project, you can install the package from npm:

```bash
npm install @ocean-industries-concept-lab/openbridge-webcomponents
```

### Setup

1. Add the css file to your project:
   ```javascript
   import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css';
   ```
2. Select the palette by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day"></html>
   ```
3. Install the Noto Sans font by using the attached `NotoSans.ttf` file. Add the following to your css:

   ```css
   @font-face {
     font-family: 'Noto Sans';
     src: url('path/to/NotoSans.ttf');
   }

   * {
     font-family: Noto Sans;
   }
   ```

4. Import the desired components in your project, for instance:

   ```javascript
   import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/top-bar/top-bar.js';
   ```

5. Use the components in your project:
   ```html
   <obc-top-bar></obc-top-bar>
   ```

## Bundle Version (Browser Only)

For quick prototyping or simple projects, we provide a bundled version that includes all components in a single file. This can be imported directly in the browser without a build system.

**Note:** The bundle is ~9 MB uncompressed (~1 MB gzipped) and includes all dependencies. For production use, we recommend the modular version above for better performance.

### Usage

```html
<!DOCTYPE html>
<html lang="en" data-obc-theme="day">
  <head>
    <meta charset="UTF-8" />
    <title>OpenBridge Components</title>

    <!-- Import CSS -->
    <link rel="stylesheet" href="path/to/openbridge.css" />

    <!-- Import bundle -->
    <script
      type="module"
      src="path/to/openbridge-webcomponents.bundle.js"
    ></script>
  </head>
  <body>
    <!-- All components are now available -->
    <obc-button>Click Me</obc-button>
    <obc-card>
      <div slot="header">Card Header</div>
      <div slot="content">Card content</div>
    </obc-card>
  </body>
</html>
```

For more details, see [BUNDLE_USAGE.md](BUNDLE_USAGE.md).

## Contributing

Contributions are welcome!
