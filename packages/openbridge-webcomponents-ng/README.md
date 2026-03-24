# Openbridge Web Components Angular

[![discord, join chat](https://img.shields.io/badge/discord-join_chat-brightgreen.svg?logo=discord&labelColor=white&style=flat&color=%235865F2)](https://discord.gg/wSCPxPH3RJ)

This package provides **Angular wrappers** for the [Openbridge Web Components](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip/tree/main/packages/openbridge-webcomponents) core library. 

It allows you to use Openbridge components as native Angular components with full IDE support, props, and event handling, while leveraging the underlying Lit-based web components from `@oicl/openbridge-webcomponents`.

# 🎉 We are preparing to release OpenBridge 6.0 in March 2026 🎉

We are currently developing the code in a joint industry project, with funding from industry partners.
The code is only available for the partners until the release in March 2026. It is possible to get access to the code in active development by joining the project.

[👉 Click here to read more about the project.](https://docs.google.com/document/d/18ytBiUrfQrMYOPPz-hd7pgPjnG8ZBG-zr9xYl5Y2TTs/edit?tab=t.0)

[👉 Click here to register your interest in the form. (Note: Registering is not a commitment but will enroll you in our process.)](https://docs.google.com/forms/d/e/1FAIpQLSd2H7bbL_duBTMhHzjw7W52H9XXAiJ9A3sL7PsrfCTW_bNUhw/viewform)

> **❗Caution❗** This repository is currently in early development and may not be stable. Please use with caution.

# Introduction video

We have made an short introduction to the library. You can watch it [here](https://www.youtube.com/watch?v=5DiEA4voqzI)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=5DiEA4voqzI" target="_blank">
 <img src="https://img.youtube.com/vi/5DiEA4voqzI/0.jpg" alt="Watch the video" width="480" height="360" />
</a>

# Discord server

Join our discord server to get the latest updates and to ask questions. [Join here.](https://discord.gg/wSCPxPH3RJ)

## Table of Contents

- [Storybook](#storybook)
- [Demo](#demo)
- [Installation](#installation)
- [Contributing](#contributing)

## Storybook

[Storybook](https://storybook.js.org/) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

To access the Storybook for this project, click [here](https://openbridge-jip-storybook.web.app).

## Demo

The demo showcases the project's functionality. It provides a live demonstration of the project's features and allows you to interact with the application.

To access the demo, click [here](https://openbridge-jip-demo.web.app/).

## Installation

To use the components in your project, you can install the package from npm:

```bash
npm install @oicl/openbridge-webcomponents-ng
```

### Setup

1. Add the css file to your project in `angular.json`:
   ```json
   "styles": [
     "node_modules/@oicl/openbridge-webcomponents/dist/openbridge.css",
     "src/styles.css"
   ]
   ```
2. Select the pallet by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day"></html>
   ```
3. Install the Noto Sans font by using the attached `NotoSans.ttf` file. Add the following to your css:

   ```css
   @font-face {
     font-family: "Noto Sans";
     src: url("path/to/NotoSans.ttf");
   }

   * {
     font-family: Noto Sans;
   }
   ```

4. Import the desired components in your module or component, for instance:

   ```typescript
   import { ObcTopBarComponent } from "@oicl/openbridge-webcomponents-ng/components/top-bar/ObcTopBar.component";

   @Component({
     // ...
     standalone: true,
     imports: [ObcTopBarComponent],
   })
   export class MyComponent {}
   ```

5. Use the components in your template:
   ```html
   <obc-top-bar></obc-top-bar>
   ```

## Contributing

Contributions are welcome!
