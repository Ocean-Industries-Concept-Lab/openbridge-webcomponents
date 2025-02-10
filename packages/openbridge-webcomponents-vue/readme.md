# Openbridge Web Components Vue

[![discord, join chat](https://img.shields.io/badge/discord-join_chat-brightgreen.svg?logo=discord&labelColor=white&style=flat&color=%235865F2)](https://discord.gg/KR9f4D4A)

Welcome to the Vue.js wrapper of Openbridge Web Components!

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

Join our discord server to get the latest updates and to ask questions. [Join here.](https://discord.gg/KR9f4D4A)

## Table of Contents

- [Storybook](#storybook)
- [Demo](#demo)
- [Installation](#installation)
- [Contributing](#contributing)

## Storybook

[Storybook](https://storybook.js.org/) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

To access the Storybook for this project, click [here](https://openbridge-storybook.web.app).

## Demo

The demo showcases the project's functionality using Vue.js. It provides a live demonstration of the project's features and allows you to interact with the application.

To access the demo, click [here](https://openbridge-demo.web.app/).

## Installation

To use the components in your project, you can install the package from npm:

```bash
npm install @oicl/openbridge-webcomponents-vue
```

See also the [vue demo](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/tree/main/packages/vue-demo) for an example of how to use the components in a Vue.js project.

### Setup

1. Add the css file to your project:
   ```javascript
   import "@oicl/openbridge-webcomponents/src/palettes/variables.css";
   ```
2. Select the pallet by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day"></html>
   ```
3. Install the Noto Sans font by using the attached `NotoSans.tff` file. Add the following to your css:

   ```css
   @font-face {
     font-family: "Noto Sans";
     src: url("path/to/NotoSans.tff");
   }

   * {
     font-family: Noto Sans;
   }
   ```

4. Import the desired components in your project, for instance:

   ```javascript
   import ObcTopBar from "@oicl/openbridge-webcomponents-vue/components/top-bar/ObcTopBar";
   ```

5. Use the components in your project:
   ```html
   <ObcTopBar></ObcTopBar>
   ```

## Contributing

Contributions are welcome!
