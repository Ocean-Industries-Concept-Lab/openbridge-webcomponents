# Openbridge Web Components

Welcome to the Openbridge Web Components! This readme file provides an overview of the project and its components.


> **❗Caution❗** This repository is currently in early development and may not be stable. Please use with caution.

## Table of Contents

- [Storybook](#storybook)
- [Vue Demo](#demo)
- [Components](#components)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Storybook

[Storybook](https://storybook.js.org/) is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components in isolation.

To access the Storybook for this project, click [here](https://openbridge-storybook.web.app).

## Demo

The demo showcases the project's functionality using Vue.js. It provides a live demonstration of the project's features and allows you to interact with the application.

To access the demo, click [here](https://openbridge-demo.web.app/).

## Components

The components for this project are implemented in the `package/openbridge-webcomponents` folder.

## Installation
To use the components in your project, you can install the package from npm:

```bash
npm install @tibnor/openbridge-webcomponents
```

To use the components in your Vue.js project, you can install the package from npm:

```bash
npm install @tibnor/openbridge-webcomponents-vue
```

### Setup
1. Add the css file to your project:
   ```javascript
   import '@tibnor/openbridge-webcomponents/src/palettes/variables.css'
   ```
2. Select the pallet by setting the `data-obc-theme` attribute on the `html` tag:
   ```html
   <html lang="en" data-obc-theme="day">
   ```
3. Install the Noto Sans font by using the attached `NotoSans.tff` file. Add the following to your css:
   ```css
   @font-face {
   font-family: 'Noto Sans';
   src: url('path/to/NotoSans.tff');
   }

   * {
      font-family: Noto Sans;
   }
   ```
4. Import the desired components in your project, for instance:
   ```javascript
   import '@tibnor/openbridge-webcomponents/dist/components/top-bar/top-bar.js'
   ```
   or with vue wrapper:
   ```javascript
   import ObcTopBar from 'openbridge-webcomponents-vue/components/top-bar/ObcTopBar'
   ```

5. Use the components in your project:
   ```html
   <obc-top-bar></obc-top-bar>
   ```
      or with vue wrapper:
   ```html
   <ObcTopBar></ObcTopBar>
   ```


## Getting Started Developing

### With VS Code Dev Container (recommended)

To get started with the project, follow these steps:

1. Clone the repository.
2. Install visual studio code
3. Install Docker (requires license for large organizations)
4. Open visual studio code
5. Open the command palette (Ctrl+Shift+P)
6. Run the command `Dev Container: Open Workspace in Container`
   This will open the project in a containerized environment with all the necessary dependencies installed.
7. Optional: Go to the `package/openbridge-webcomponents` folder and run `yarn storbook` to start the Storybook development environment.
8. Optional: Go to the `package/vue-demo` folder and run `yarn dev` to run the Vue.js demo application.
9. Optional: Go to the `package/openbridge-webcomponents` folder and run `yarn build:css:watch` to transform the CSS files into ".styles.ts" files, and watch for changes.

### Without VS Code devcontainer, not recommended

1. Clone the repository.
2. Install Node.js (version 20) and Yarn.
3. Run `yarn install` in the root folder to install the dependencies.
4. Run `yarn run build:lib` to build all libraries.
5. Optional: Go to the `package/openbridge-webcomponents` folder and run `yarn storbook` to start the Storybook development environment.
6. Optional: Go to the `package/vue-demo` folder and run `yarn dev` to run the Vue.js demo application.
7. Optional: Go to the `package/openbridge-webcomponents` folder and run `yarn build:css:watch` to transform the CSS files into ".styles.ts" files, and watch for changes.

## Steps in the development process:

### Building css files:
The css files are transformed into ".styles.ts" files using the `yarn build:css` command. This command should be run after any changes to the css files.
You can also run `yarn build:css:watch` to watch for changes.

### Formatting:
Run `yarn format:all` to format the code using Prettier.

### Testing:
We use snapshot testing of the components through storybook.
To run the test:

1. Ensure that storybook is running. If it is not running, go to the `package/openbridge-webcomponents` folder and run `yarn storybook` to start storybook.
2. Run `yarn test-storybook` in the `package/openbridge-webcomponents` folder to run the tests.

Use the `yarn test-storybook --watch` command to watch for changes and re-run the tests.
Use the `yarn test-storybook -u` command to update the snapshots.



## Contributing

Contributions are welcome!

