# Getting Started with React for OpenBridge Applications

This tutorial will guide you through creating an OpenBridge-based application using React. We will start with an empty folder and end with a multi-view application.

## Creating a React Project

The React team recommends using frameworks like Next.js for building modern applications, as it provides features like server-side rendering, static site generation, and optimized performance. However, for a maritime bridge application, a traditional React setup with Vite might be more suitable due to its simplicity.

To create a new React project using Vite, run the following command:

```sh
npm create vite@latest maritime-app -- --template react-ts
```

This will set up a new React project named `maritime-app` using TypeScript.

## Running the Project

After the project has been created, navigate into the project directory and install dependencies:

```sh
cd maritime-app
npm install
npm run dev
```

This will start a development server, typically accessible at `http://localhost:5173/` (or another available port if 5173 is in use).

## Install OpenBridge web components

To use the components in your project, you can install the package from github package repo.

Start by creating a classic personal access token in github
Go to [github settings](https://github.com/settings/tokens/new) to make a classic token. Give the token the `read:packages` permission. Click "Generate token" and copy the token.

Login into github package repo:

```bash
npm login --registry https://npm.pkg.github.com/ --scope=ocean-industries-concept-lab
```

Use our github username as username and past in the generated token as password.

You can now install the package:

```bash
npm install @ocean-industries-concept-lab/openbridge-webcomponents-react
```

## Start making an app

### Clean up the generated project

Remove content in app.css app.tsx index.css

App.tsx:

```tsx
import "./App.css";

function App() {
  return <></>;
}

export default App;
```

### Add topbar

```tsx {1,8-10}
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <ObcTopBar />
      </header>
    </>
  );
}

export default App;
```

To place the header correctly add the css to `app.css`

```css
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
```

Check out all details in the [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/application-topbar--docs).
Turn on some details:

```tsx
<ObcTopBar showClock appTitle="Hello" pageName="world!" />
```

# Setting up the library

But it does not look like OpenBridge. We need to add the standard css and set some properties.

## Add the css

Import the css file by adding it to `main.ts`

```ts
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css";
```

## Set palette

Then set palette by modifying the `html` tag in `index.html`

```html
<html lang="en" data-obc-theme="day"></html>
```

The `data-obc-theme` can be bright, day, dusk or night. Changeing it will set the palette.

## Set component sizing

We need to set the component sizing. Again modify `index.html`. But this time add `obc-component-size-regular` class to body.

```html
<body class="obc-component-size-regular"></body>
```

This could be regular, normal, large or xl. It sets the component size of all decendent components.

## Load font

Lastly Noto Sans needs to be added. You can download it from the [OpenBridge repo](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip/raw/refs/heads/main/packages/openbridge-webcomponents/public/NotoSans.ttf). Place the NotoSans.ttf file in the public folder.

Next this file must be loaded by the css. So add it to index.css:

```css
@font-face {
  font-family: "Noto Sans";
  src: url(/NotoSans.ttf) format("truetype");
}
```

You should now have a working top bar. Styled with OpenBridge styles.

Try changeing the palette to night:

```html
<html lang="en" data-obc-theme="night"></html>
```

## Add background

Notice how the top bar changed to dark mode.
We can add a background to the page. Add this to `index.css`

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--container-backdrop-color);
}
```

Note how the color is set by the `css custom property` `--container-backdrop-color`. Using it the background will change when changeing the palette attribute (or the palette colors are updated by the designers).

The entire page should now be dark. Go back to day palette
Try changeing the palette to night:

```html
<html lang="en" data-obc-theme="day"></html>
```

# Add brilliance menu:

We can now add the brilliance menu and the dimming button to the top bar

```tsx
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
        />
      </header>
      <main>
        <ObcBrillianceMenu />
      </main>
    </>
  );
}
```

It's location is a bit of.
We will now use css position anchor.
First we need to define the dimming button in the top bar as an anchor.
We can do that through CSS parts.
In the topbar each button is available through a css part.
The dimming button has a css part called `dimming-button`.
We define the `anchor-name` in the css part and use when positioning the brilliance menu.

Add the css to `App.css`, and add the topbar and brilliance class name to the components.

```css
main {
  position: absolute;
  top: var(--app-components-topbar-touch-target-size);
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 16px;
}

.topbar::part(dimming-button) {
  anchor-name: --dimming-menu-button;
}

.brilliance {
  position: fixed;
  position-anchor: --dimming-menu-button;
  top: calc(anchor(bottom) + 4px);
  right: calc(anchor(right) + 8px);
  z-index: 1;
}
```

We can now add a state to store if the dimming menu is open or not. Also add an handler when the dimming menu button is clicked.
Find the event name under events in [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/application-topbar--docs).Remember also to set the `dimmingButtonActivated` which marks the button grey when activated.

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";

import "./App.css";

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
        />
      </header>
      <main>
        {showBrillianceMenu && (
          <ObcBrillianceMenu hideBrightness className="brilliance" />
        )}
      </main>
    </>
  );
}

export default App;
```

We can now add an handler for palette switching.

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";

import "./App.css";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
        />
      </header>
      <main>
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

Try changeing the palette.

# Set the time

You may have notice that the clock is not set correctly. Add this custom hooks to `src/hooks/useMinutesUpdate.ts`:

```ts
import { useState, useEffect } from "react";

const useMinuteUpdate = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const updateAtNextMinute = () => {
      const now = new Date();
      const delay = (60 - now.getSeconds()) * 1000; // Time until next 0 second

      setTimeout(() => {
        setTime(new Date().toISOString());

        // Set interval to update every minute at 0s
        const interval = setInterval(() => {
          setTime(new Date().toISOString());
        }, 60000);

        return () => clearInterval(interval);
      }, delay);
    };

    updateAtNextMinute();
  }, []);

  return time;
};

export default useMinuteUpdate;
```

It returns a ISO time string every minute. Set that as property for the top bar.

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import useMinuteUpdate from "./hooks/useMinuteUpdate";

import "./App.css";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const time = useMinuteUpdate();

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
          date={time}
        />
      </header>
      <main>
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

# Add navigation menu

We can now add a navigation menu. Start by looking it up in [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/menu-navigation-menu--docs). Click on "Show code" to view the example code.

Start by making an navigation menu component. Create `NavigationMenu.tsx` in `src/components` and copy the example file into the new React component:

```tsx

export function NavigationMenu({...delegated}) {
    return (
                <obc-navigation-menu {...delegated}>
          <obc-navigation-item slot="main" label="Apps" href="#">
            <obi-applications slot="icon"></obi-applications>
          </obc-navigation-item>
          <obc-navigation-item slot="main" checked="" label="Alerts" href="#">
            <obi-alerts slot="icon"></obi-alerts>
          </obc-navigation-item>
          <obc-navigation-item slot="main" label="Dimming" href="#">
            <obi-palette-dimming slot="icon"></obi-palette-dimming>
          </obc-navigation-item>

          <obc-navigation-item slot="footer" label="Help" href="#">
            <obi-support-google slot="icon"></obi-support-google>
          </obc-navigation-item>
          <obc-navigation-item slot="footer" label="Settings" href="#">
            <obi-settings-iec slot="icon"></obi-settings-iec>
          </obc-navigation-item>
          <obc-navigation-item slot="footer" label="Alert" href="#">
            <obi-alert-list slot="icon"></obi-alert-list>
          </obc-navigation-item>

          <img slot="logo" src="/companylogo-day.png" alt="logo">
        </obc-navigation-menu>
    )
}
```

This is using the web components directly. Modify it so that it uses the react wrapper by:

- Make all tags upper case (use copilot or similar for such tasks)
- Import the needed components

```tsx
import { ObcNavigationMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-item/navigation-item";
import { ObiApplications } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-applications";
import { ObiAlerts } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-alerts";
import { ObiPaletteDimming } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-palette-dimming";
import { ObiSupportGoogle } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-support-google";
import { ObiSettingsIec } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-settings-iec";
import { ObiAlertList } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-alert-list";

export function NavigationMenu({ ...delegated }) {
  return (
    <ObcNavigationMenu {...delegated}>
      <ObcNavigationItem slot="main" label="Apps" href="#">
        <ObiApplications slot="icon"></ObiApplications>
      </ObcNavigationItem>
      <ObcNavigationItem slot="main" checked label="Alerts" href="#">
        <ObiAlerts slot="icon"></ObiAlerts>
      </ObcNavigationItem>
      <ObcNavigationItem slot="main" label="Dimming" href="#">
        <ObiPaletteDimming slot="icon"></ObiPaletteDimming>
      </ObcNavigationItem>

      <ObcNavigationItem slot="footer" label="Help" href="#">
        <ObiSupportGoogle slot="icon"></ObiSupportGoogle>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Settings" href="#">
        <ObiSettingsIec slot="icon"></ObiSettingsIec>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Alert" href="#">
        <ObiAlertList slot="icon"></ObiAlertList>
      </ObcNavigationItem>

      <img slot="logo" src="/companylogo-day.png" alt="logo" />
    </ObcNavigationMenu>
  );
}
```

Add this component to the `App.tsx`

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import useMinuteUpdate from "./hooks/useMinuteUpdate";

import "./App.css";
import { NavigationMenu } from "./components/NavigationMenu";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const time = useMinuteUpdate();

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
          date={time}
        />
      </header>
      <main>
        <NavigationMenu className="navmenu" />
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

We need to position the navigation menu. In this case we will do it from the NavigationMenu component.
Add NavigationMenu.css:

```css
.navigation-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
```

And import it in `NavigationMenu.tsx`

```ts
import "./NavigationMenu.css";
```

# Only show the navigation menu when activated

We need to add logic for showing the navigation menu. Notice that the dimming menu should be closed if the navigation menu is opened.

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import useMinuteUpdate from "./hooks/useMinuteUpdate";

import "./App.css";
import { NavigationMenu } from "./components/NavigationMenu";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const [showNavigationMenu, setShowNavigationMenu] = useState(false);

  const time = useMinuteUpdate();

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
    setShowNavigationMenu(false);
  };

  const handleNavigationButtonClicked = () => {
    setShowNavigationMenu(!showNavigationMenu);
    setShowBrillianceMenu(false);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
          menuButtonActivated={showNavigationMenu}
          onMenuButtonClicked={handleNavigationButtonClicked}
          date={time}
        />
      </header>
      <main>
        {showNavigationMenu && <NavigationMenu />}
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

# Add some content

We need some content to show.
Add a instrument demo page `src/pages/InstrumentsDemo.tsx`

```tsx
import { ObcAzimuthThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/navigation-instruments/azimuth-thruster/azimuth-thruster";

export function InstrumentDemo() {
  return <ObcAzimuthThruster />;
}
```

import it to `App.tsx`

```tsx
import { useState } from "react";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import useMinuteUpdate from "./hooks/useMinuteUpdate";

import "./App.css";
import { NavigationMenu } from "./components/NavigationMenu";
import { InstrumentDemo } from "./pages/InstrumentDemo";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const [showNavigationMenu, setShowNavigationMenu] = useState(false);

  const time = useMinuteUpdate();

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
    setShowNavigationMenu(false);
  };

  const handleNavigationButtonClicked = () => {
    setShowNavigationMenu(!showNavigationMenu);
    setShowBrillianceMenu(false);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
          menuButtonActivated={showNavigationMenu}
          onMenuButtonClicked={handleNavigationButtonClicked}
          date={time}
        />
      </header>
      <main>
        <InstrumentDemo />
        {showNavigationMenu && <NavigationMenu />}
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

Notice that the InstrumentDemo is placed above the menues. This is to ensure that the menu are placed above the content.

Play with the input parameters of the azimuth.

# Add another page

We will now add another page, later we will look into routing between the pages.
Add another page `src/pages/ThrusterDemo.tsx`:

```tsx
import { ObcThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/navigation-instruments/thruster/thruster";

export function ThrusterDemo() {
  return <ObcThruster />;
}
```

In the `App.tsx` replace the `InstrumentDemo` with the `ThrusterDemo`.

# Using Routing in Your OpenBridge React Application

Routing is essential for creating multi-page applications in React. In this section, we will set up client-side navigation using `react-router-dom`, which is the most commonly used routing library for React applications built with Vite.

## Installing React Router

To get started, install `react-router-dom` by running:

```sh
npm install react-router-dom
```

## Setting up the router

In your main.tsx, wrap your application with BrowserRouter:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## Creating Routes

Now, modify `App.tsx` to define your application's routes using `Routes` and `Route`. Use the pages that we already have created:

```tsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ObcTopBar } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/brilliance-menu/brilliance-menu";
import useMinuteUpdate from "./hooks/useMinuteUpdate";

import "./App.css";
import { NavigationMenu } from "./components/NavigationMenu";
import { InstrumentDemo } from "./pages/InstrumentDemo";
import { ThrusterDemo } from "./pages/TunnelDemo";

const handleBrillianceChange = (e: CustomEvent) => {
  document.documentElement.setAttribute("data-obc-theme", e.detail.value);
};

function App() {
  const [showBrillianceMenu, setShowBrillianceMenu] = useState(false);
  const [showNavigationMenu, setShowNavigationMenu] = useState(false);

  const time = useMinuteUpdate();

  const handleDimmingButtonClicked = () => {
    setShowBrillianceMenu(!showBrillianceMenu);
    setShowNavigationMenu(false);
  };

  const handleNavigationButtonClicked = () => {
    setShowNavigationMenu(!showNavigationMenu);
    setShowBrillianceMenu(false);
  };

  return (
    <>
      <header>
        <ObcTopBar
          showClock
          showDimmingButton
          appTitle="Hello"
          pageName="world!"
          dimmingButtonActivated={showBrillianceMenu}
          onDimmingButtonClicked={handleDimmingButtonClicked}
          menuButtonActivated={showNavigationMenu}
          onMenuButtonClicked={handleNavigationButtonClicked}
          date={time}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<InstrumentDemo />} />
          <Route path="/thruster" element={<ThrusterDemo />} />
        </Routes>
        {showNavigationMenu && <NavigationMenu />}
        {showBrillianceMenu && (
          <ObcBrillianceMenu
            onPaletteChanged={handleBrillianceChange}
            hideBrightness
            className="brilliance"
          />
        )}
      </main>
    </>
  );
}

export default App;
```

## Update navigation menu

We can now use these path in the navigation menu:

- set the href to the path in router
- find some good labels and [icons](https://openbridge-jip-demo.web.app/icons)

```tsx
import { ObcNavigationMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-support-google";
import { ObiSettingsIec } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-settings-iec";
import { ObiAlertList } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-tunnel-thruster";
import "./NavigationMenu.css";

export function NavigationMenu() {
  return (
    <ObcNavigationMenu className="navigation-menu">
      <ObcNavigationItem slot="main" label="Azimuth" href="/">
        <ObiPropulsionAzimuthThruster slot="icon"></ObiPropulsionAzimuthThruster>
      </ObcNavigationItem>
      <ObcNavigationItem slot="main" checked label="Thruster" href="/thruster">
        <ObiPropulsionTunnelThruster slot="icon"></ObiPropulsionTunnelThruster>
      </ObcNavigationItem>

      <ObcNavigationItem slot="footer" label="Help" href="#">
        <ObiSupportGoogle slot="icon"></ObiSupportGoogle>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Settings" href="#">
        <ObiSettingsIec slot="icon"></ObiSettingsIec>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Alert" href="#">
        <ObiAlertList slot="icon"></ObiAlertList>
      </ObcNavigationItem>

      <img slot="logo" src="/companylogo-day.png" alt="logo" />
    </ObcNavigationMenu>
  );
}
```

Try to use the navigation menu.

You may notice two problems:

- The active page in nav menu is not updating
- When changeing page, the entire page is reloaded.

## Use react router <Link>

Currently the navigation item is an `<a>` element, linking to the new page.
Using the `<Link>` element the router is instead notified when a page should be changed.
So we wrapp the navigation items with a link, notice that the slot must be moved to the `<Link>` element in addition to the href.

```tsx
import { Link } from "react-router-dom";
import { ObcNavigationMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-support-google";
import { ObiSettingsIec } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-settings-iec";
import { ObiAlertList } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-tunnel-thruster";
import "./NavigationMenu.css";

export function NavigationMenu() {
  return (
    <ObcNavigationMenu className="navigation-menu">
      <Link to="/" slot="main" className="navigation-item">
        <ObcNavigationItem label="Azimuth" checked={location.pathname === "/"}>
          <ObiPropulsionAzimuthThruster slot="icon"></ObiPropulsionAzimuthThruster>
        </ObcNavigationItem>
      </Link>
      <Link to="/thruster" slot="main" className="navigation-item">
        <ObcNavigationItem
          label="Thruster"
          checked={location.pathname === "/thruster"}
        >
          <ObiPropulsionTunnelThruster slot="icon"></ObiPropulsionTunnelThruster>
        </ObcNavigationItem>
      </Link>
      <ObcNavigationItem slot="footer" label="Help" href="#">
        <ObiSupportGoogle slot="icon"></ObiSupportGoogle>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Settings" href="#">
        <ObiSettingsIec slot="icon"></ObiSettingsIec>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Alert" href="#">
        <ObiAlertList slot="icon"></ObiAlertList>
      </ObcNavigationItem>

      <img slot="logo" src="/companylogo-day.png" alt="logo" />
    </ObcNavigationMenu>
  );
}
```

Try the navigation menu again. The switching of pages is much faster.

We also need to remove the underlining. By adding to th the `NavigationMenu.css`

```css
.navigation-item {
  text-decoration: none;
}
```

## Update the selected page

We can use `useLocation` from `react-router-dom` to get the current page and chech if it is equal to the navigation items path.

```tsx
import { Link, useLocation } from "react-router-dom";
import { ObcNavigationMenu } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-support-google";
import { ObiSettingsIec } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-settings-iec";
import { ObiAlertList } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/icons/icon-propulsion-tunnel-thruster";
import "./NavigationMenu.css";

export function NavigationMenu() {
  const location = useLocation();

  return (
    <ObcNavigationMenu className="navigation-menu">
      <Link to="/" slot="main">
        <ObcNavigationItem label="Azimuth" checked={location.pathname === "/"}>
          <ObiPropulsionAzimuthThruster slot="icon"></ObiPropulsionAzimuthThruster>
        </ObcNavigationItem>
      </Link>
      <Link to="/thruster" slot="main">
        <ObcNavigationItem
          label="Thruster"
          checked={location.pathname === "/thruster"}
        >
          <ObiPropulsionTunnelThruster slot="icon"></ObiPropulsionTunnelThruster>
        </ObcNavigationItem>
      </Link>
      <ObcNavigationItem slot="footer" label="Help" href="#">
        <ObiSupportGoogle slot="icon"></ObiSupportGoogle>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Settings" href="#">
        <ObiSettingsIec slot="icon"></ObiSettingsIec>
      </ObcNavigationItem>
      <ObcNavigationItem slot="footer" label="Alert" href="#">
        <ObiAlertList slot="icon"></ObiAlertList>
      </ObcNavigationItem>

      <img slot="logo" src="/companylogo-day.png" alt="logo" />
    </ObcNavigationMenu>
  );
}
```

The router link should now be refacto out to a seperate component. That is left to the reader.

# Add an input

To show how to use output data from an component we can add a slider to the `InstrumentDemo.tsx` page.

```tsx
import { ObcAzimuthThruster } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/navigation-instruments/azimuth-thruster/azimuth-thruster";
import { ObcSlider } from "@ocean-industries-concept-lab/openbridge-webcomponents-react/components/slider/slider";
import { useState } from "react";

export function InstrumentDemo() {
  const [azimuth, setAzimuth] = useState(0);

  const handleAzimuthChange = (e: CustomEvent) => {
    setAzimuth(e.detail);
  };

  return (
    <>
      <ObcSlider min={0} max={360} onValue={handleAzimuthChange} />
      <ObcAzimuthThruster angle={azimuth} />
    </>
  );
}
```
