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

Storybook is the component reference: it shows each component in isolation with interactive controls, states, and variants.
The Live Demo is an application showcase: it shows how components work together in realistic page flows.

| Channel                                    | Storybook                                                                      | Live Demo                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Stable** (`stable` branch, npm `latest`) | [openbridge-storybook.web.app](https://openbridge-storybook.web.app)           | [openbridge-demo.web.app](https://openbridge-demo.web.app/)           |
| **Develop** (`develop` branch, npm `next`) | [openbridge-next-storybook.web.app](https://openbridge-next-storybook.web.app) | [openbridge-next-demo.web.app](https://openbridge-next-demo.web.app/) |

## 👋 Hello World

One file, no installation, no build step — a running OpenBridge app with a top
bar, a side bar and a live instrument.

**You need:** a text editor (Notepad, TextEdit or
[VS Code](https://code.visualstudio.com/)) and a web browser. No Node.js, no
terminal.

**1.** Create a file called `hello-openbridge.html`.

**2.** Paste this into it and save:

```html
<!doctype html>
<html lang="en" data-obc-theme="day">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>OpenBridge Hello World</title>

    <!-- The OpenBridge colour palettes -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@oicl/openbridge-webcomponents@next/dist/openbridge.css"
    />
    <!-- The font OpenBridge is designed with -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&display=swap"
    />
    <!-- Every OpenBridge component, in one file -->
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@oicl/openbridge-webcomponents@next/bundle/openbridge-webcomponents.bundle.js"
    ></script>

    <style>
      body {
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: 'Noto Sans', sans-serif;
        background-color: var(--container-backdrop-color);
        color: var(--element-active-color);
      }
      .row {
        flex: 1;
        display: flex;
      }
      main {
        flex: 1;
        padding: 24px;
      }
      #compass {
        width: 260px;
        height: 260px;
      }
      /* On a narrow screen the side bar starts hidden and opens over the page */
      @media (max-width: 700px) {
        .row {
          position: relative;
        }
        obc-navigation-menu {
          display: none;
          position: absolute;
          inset: 0 auto 0 0;
          z-index: 1;
        }
      }
    </style>
  </head>

  <body class="obc-component-size-regular">
    <obc-top-bar
      apptitle="Hello World"
      pagename="Compass"
      showdimmingbutton
    ></obc-top-bar>

    <div class="row">
      <obc-navigation-menu>
        <obc-navigation-item
          slot="main"
          label="Compass"
          href="#"
          checked
        ></obc-navigation-item>
        <obc-navigation-item
          slot="main"
          label="Engine"
          href="#"
        ></obc-navigation-item>
        <obc-navigation-item
          slot="footer"
          label="Settings"
          href="#"
        ></obc-navigation-item>
      </obc-navigation-menu>

      <main>
        <obc-compass id="compass" heading="45"></obc-compass>
        <obc-button id="turn">Turn 15&deg; to starboard</obc-button>
      </main>
    </div>

    <script>
      const topBar = document.querySelector('obc-top-bar');
      const menu = document.querySelector('obc-navigation-menu');
      const compass = document.querySelector('#compass');

      // Set a property from JavaScript
      document.querySelector('#turn').onclick = () => {
        compass.heading = (compass.heading + 15) % 360;
      };

      // React to a component event
      topBar.addEventListener('menu-button-clicked', () => {
        const hidden = getComputedStyle(menu).display === 'none';
        menu.style.display = hidden ? 'block' : 'none';
      });

      topBar.addEventListener('dimming-button-clicked', () => {
        const root = document.documentElement;
        root.dataset.obcTheme =
          root.dataset.obcTheme === 'day' ? 'night' : 'day';
      });
    </script>
  </body>
</html>
```

**3.** Double-click the file. It opens in your browser and the app is running.

Try it: the button turns the compass, the ☰ button hides the side bar, and the
dimming button in the top-right switches between the `day` and `night`
palettes.

It works on a phone as well. The `viewport` meta tag is what makes the browser
lay the page out at the real screen width instead of pretending to be a desktop,
and the one media query in the styles keeps the side bar out of the way until
☰ is pressed.

If your browser refuses to open a local file like this, put it in its own folder
and serve that folder instead — `npx serve` if you have Node.js, or the "Live
Server" extension in VS Code — then open the address it prints.

### The four setup lines

| What                                             | Why                                                                                         |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `openbridge.css`                                 | The colour palettes. Every component takes its colours from here.                           |
| `data-obc-theme` on `<html>`                     | Which palette: `bright`, `day`, `dusk` or `night`.                                          |
| `class="obc-component-size-regular"` on `<body>` | How large components are drawn: `regular`, `medium`, `large` or `xl`.                       |
| The bundle `<script>`                            | Every OpenBridge component. Once it has loaded, tags like `<obc-top-bar>` work on the page. |

### Adding more components

Every component is a tag starting with `obc-`. Find one in
[Storybook](https://openbridge-next-storybook.web.app), copy its tag and drop it
in — here a clock, in the top bar's `clock` slot:

```html
<obc-top-bar
  apptitle="Hello World"
  pagename="Compass"
  showdimmingbutton
  showclock
>
  <obc-clock slot="clock" date="2026-01-01T12:00:00Z"></obc-clock>
</obc-top-bar>
```

Two things to know when writing plain HTML:

- Attribute names are all lowercase — the `showDimmingButton` property is
  written `showdimmingbutton`.
- Attributes carry simple values only: text, numbers, and on/off flags whose
  presence means on (`showdimmingbutton`, `checked`). Richer values such as
  lists and objects have to be set from JavaScript.

> **Which version?** The example uses the `next` channel because the current
> `latest` bundle fails to load in a browser. A channel always serves the newest
> release on it, which is what a getting-started page wants; pin an exact
> version in anything you keep. The bundle holds every component
> (~1.4 MB gzipped), which is ideal for trying things out; for a real
> application install the package instead, so your build ships only what you
> use.

When one file is no longer enough, carry on with
[Installation](#-installation) below, or pick a framework and follow the full
tutorial for
[React](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/develop/docs/getting-started-react.md)
or
[Angular](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/develop/docs/getting-started-angular.md).

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

## 📐 Scaling & Touch Targets

All sizes are CSS pixels. Interactive components follow a standard invisible
touch area of at least **48 × 48 px** in the `regular` size class — twice the
24 px minimum that [WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
requires. The size classes scale the standard tokens up: 48 px (`regular`),
56 px (`medium`), 72 px (`large`), 96 px (`xl`); individual components may
follow their own, larger curve.

Two things to know:

- **On phones and tablets**, keep the viewport tag from the
  [Hello World](#-hello-world) (`<meta name="viewport" content="width=device-width, initial-scale=1" />`).
  Without it the browser shrinks the whole page and the touch areas with it.
- **For type-approved equipment** (IEC 62288 / IEC 60945, which require
  15 mm touch targets), compliance comes from calibrating the screen, not
  from a component setting: 15 mm ÷ 48 px = 0.3125 mm, so set the display
  scaling or browser zoom of each installation so one CSS pixel is at least
  0.3125 mm — or use a larger size class.

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

For quick prototyping, load the bundled version — every component in a single
file, straight from a CDN:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@oicl/openbridge-webcomponents@next/bundle/openbridge-webcomponents.bundle.js"
></script>
```

From an installed package the same file lives at
`node_modules/@oicl/openbridge-webcomponents/bundle/openbridge-webcomponents.bundle.js`.
See [Hello World](#-hello-world) for a complete page built on it.

## 📦 Framework Wrappers

For the best experience in your framework of choice, use our auto-generated wrappers:

- [`@oicl/openbridge-webcomponents-vue`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-vue)
- [`@oicl/openbridge-webcomponents-react`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-react)
- [`@oicl/openbridge-webcomponents-ng`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-ng)
- [`@oicl/openbridge-webcomponents-svelte`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-svelte)

Install it with:

```bash
npm install @oicl/openbridge-webcomponents-<framework>
```

where `<framework>` is the framework you are using (e.g., `vue`, `react`, `ng`, `svelte`).

## 📦 Full-Bundle Package

If you need a package that includes the prebuilt bundle together with source and documentation files, use:

- [`@oicl/openbridge-webcomponents-full-bundle`](https://www.npmjs.com/package/@oicl/openbridge-webcomponents-full-bundle)

Install it with:

```bash
npm install @oicl/openbridge-webcomponents-full-bundle
```

Then import the bundled file:

```html
<script
  type="module"
  src="node_modules/@oicl/openbridge-webcomponents-full-bundle/bundle/openbridge-webcomponents.bundle.js"
></script>
```

## 💬 Slack

[![Slack, join chat](https://img.shields.io/badge/Slack-4A154B?style=flat&logo=slack&logoColor=white)](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ)

[Join our Slack](https://join.slack.com/t/openbridgegroup/shared_invite/zt-2e4clvl6s-uZLkN5L3g8O~c1UZCN1reQ) to get the latest updates and to ask questions.

## 👫 Contributing

Contributions are welcome! Please see the [root README](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/stable/README.md) and [CONTRIBUTING.md](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/blob/stable/CONTRIBUTING.md) for development instructions.
