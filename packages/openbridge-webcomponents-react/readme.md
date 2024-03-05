# Openbridge Web Components React

Welcome to the react wrapper of  Openbridge Web Components! 


> **❗Caution❗** This repository is currently in early development and may not be stable. Please use with caution.

# Slack Channel
Join our slack channel to get the latest updates and to ask questions. Click [here](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ) to join the slack workspace, and join the [#openbridge-webcomponents](https://openbridgegroup.slack.com/archives/C06LXTCR269) channel.

## Table of Contents

- [Storybook](#storybook)
- [Demo](#demo)
- [Installation](#installation)
- [Contributing](#contributing)

## Storybook

[Storybook](https://storybook.js.org/) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

To access the Storybook for this project, click [here](https://openbridge-storybook.web.app).

## Demo

The demo showcases the project's functionality using react. It provides a live demonstration of the project's features and allows you to interact with the application.

To access the demo, click [here](https://openbridge-demo.web.app/).

## Installation
To use the components in your project, you can install the package from npm:

```bash
npm install @oicl/openbridge-webcomponents-react
```

See also the [react demo](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/tree/main/packages/react-demo)

### Setup
1. Add the css file to your project:
   ```javascript
   import '@oicl/openbridge-webcomponents/src/palettes/variables.css'
   ```
2. Select the pallet by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day">
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
   import {ObcTopBar} from '@oicl/openbridge-webcomponents-react/components/top-bar/top-bar'
   ```

5. Use the components in your project:
   ```html
   <ObcTopBar></ObcTopBar>
   ```

## Contributing

Contributions are welcome!

