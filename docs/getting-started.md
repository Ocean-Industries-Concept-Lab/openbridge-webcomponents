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

Todo: add why login

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

It's location is a bit of. Add `brilliance` as css class to the component:

And add the css to `App.css`

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

.brilliance {
  position: absolute;
  top: 4px;
  right: 4px;
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

# Add routing

# Add an instrument

# Add an input
