# Getting Started with Angular for OpenBridge Applications

This tutorial will guide you through creating an OpenBridge-based application using Angular. We will start with an empty folder and end with a multi-view application.

## Creating an Angular Project

The wrapper supports Angular 20 (it declares `@angular/core` `^20.0.1` as a
peer dependency). A plain `ng new` uses the newest Angular CLI, and `npm` then
refuses to install the wrapper with an `ERESOLVE` peer-dependency error. Pin
the CLI to version 20 when creating the project:

```sh
npx @angular/cli@20 new maritime-app
```

This will set up a new Angular 20 project named `maritime-app`. The default
answers to the prompts are fine.

## Running the Project

After the project has been created, navigate into the project directory and run it:

```sh
cd maritime-app
npm run start
```

This will start a development server, typically accessible at `http://localhost:4200/` (or another available port if 4200 is in use).

## Install OpenBridge web components angular wrapper

The package is published on the public npm registry. It also installs the
core `@oicl/openbridge-webcomponents` package as a dependency:

```bash
npm install @oicl/openbridge-webcomponents-ng
```

Use `@oicl/openbridge-webcomponents-ng@next` to try the latest pre-release.

The wrapper ships precompiled, so no `tsconfig` changes are needed. Every
component and icon has its own entry point, named after its tag:

```ts
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";
import { ObiAlerts } from "@oicl/openbridge-webcomponents-ng/obi-alerts";
```

Each entry point also re-exports the component's event and value types, for
example `ObcPaletteChangeEvent` from `obc-brilliance-menu`. The package root
exports nothing useful, so always import from a component's entry point.

## Start making an app

### Clean up the generated project

Replace the content of `src/app/app.html` with:

```html
<router-outlet />
```

### Add topbar

Import the topbar in `src/app/app.ts`

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  title = "OpenBridge-angular";
}
```

Add the topbar to the `app.html`:

```html
<obc-top-bar></obc-top-bar> <router-outlet />
```

You should now see the top bar. But it is not styled correctly.

# Setting up the library

We need to add the standard css and set some properties.

## Add the css

Import the css file by adding it to `main.ts`

```ts
import "@oicl/openbridge-webcomponents/dist/openbridge.css";
```

## Set palette

Then set palette by modifying the `html` tag in `index.html`

```html
<html lang="en" data-obc-theme="day"></html>
```

The `data-obc-theme` can be bright, day, dusk or night. Changing it will set the palette.

## Set component sizing

We need to set the component sizing. Again modify `index.html`. But this time add `obc-component-size-regular` class to body.

```html
<body class="obc-component-size-regular"></body>
```

This could be `regular`, `medium`, `large`, or `xl`. It sets the component size of all descendant components.

## Load font

Lastly Noto Sans needs to be added. You can download it from the [OpenBridge repo](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/raw/refs/heads/stable/packages/openbridge-webcomponents/public/NotoSans.ttf), or copy it from `node_modules/@oicl/openbridge-webcomponents/dist/NotoSans.ttf`. Place the NotoSans.ttf file in the `public` folder.

Next this file must be loaded by the css. So add it to `src/styles.css`:

```css
@font-face {
  font-family: "Noto Sans";
  src: url(/NotoSans.ttf) format("truetype");
  font-weight: 400 700;
}
```

You should now have a working top bar. Styled with OpenBridge styles.

## Place topbar correctly

We need to position the top bar correctly. Start by organizing the html `app.html`

```html
<header>
  <obc-top-bar />
</header>

<main>
  <router-outlet />
</main>
```

Then add the css to `app.css`:

```css
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

main {
  position: absolute;
  top: var(--app-components-topbar-touch-target-size);
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 16px;
}
```

## Add some input to the topbar

We can now modify the topbar. Go to the [storybook](https://openbridge-storybook.web.app/?path=/docs/application-topbar--docs) for details of attributes.

For instance add these properties:

```html
<obc-top-bar [appTitle]="title" [showDimmingButton]="true" [showClock]="true" />
```

Where `title` is a field of the component. Replace the generated
`title = signal(...)` with a plain string: `title = "OpenBridge-angular";`.

The clock stays empty for now. It is added in [Set the time](#set-the-time).

## Add background

Try changing the palette to night:

```html
<html lang="en" data-obc-theme="night"></html>
```

Notice how the top bar changed to dark mode.
We can add a background to the page. Add this to `styles.css`

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: var(--container-backdrop-color);
}
```

Note how the color is set by the `css custom property` `--container-backdrop-color`. Using it the background will change when changing the palette attribute (or the palette colors are updated by the designers).

The entire page should now be dark. Go back to day palette
Try changing the palette to day:

```html
<html lang="en" data-obc-theme="day"></html>
```

# Add brilliance menu:

We can now add the brilliance menu and the dimming button to the top bar

`app.ts`

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";
import { ObcBrillianceMenu } from "@oicl/openbridge-webcomponents-ng/obc-brilliance-menu";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  title = "OpenBridge-angular";
}
```

`app.html`

```html
<header>
  <obc-top-bar
    [appTitle]="title"
    [showDimmingButton]="true"
    [showClock]="true"
  />
</header>

<main>
  <obc-brilliance-menu class="brilliance" />
  <router-outlet />
</main>
```

Its location is a bit off.

And add the css to `app.css`

```css
.brilliance {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;
}
```

We can now add a state to store if the dimming menu is open or not. Also add an handler when the dimming menu button is clicked.
Find the event name under events in [storybook](https://openbridge-storybook.web.app/?path=/docs/application-topbar--docs). Remember also to set the `dimmingButtonActivated` which marks the button grey when activated. Lastly we also change the palette when pressed.

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@oicl/openbridge-webcomponents-ng/obc-brilliance-menu";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  title = "OpenBridge-angular";
  showBrillianceMenu = false;

  handleDimmingButtonClicked() {
    this.showBrillianceMenu = !this.showBrillianceMenu;
  }

  onPaletteChange(event: ObcPaletteChangeEvent) {
    document.documentElement.setAttribute("data-obc-theme", event.detail.value);
  }
}
```

Notice that the event type is also imported from the component.

```html
<header>
  <obc-top-bar
    [appTitle]="title"
    [showDimmingButton]="true"
    [showClock]="true"
    [dimmingButtonActivated]="showBrillianceMenu"
    (dimmingButtonClickedEvent)="handleDimmingButtonClicked()"
  />
</header>

<main>
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />
  }
  <router-outlet />
</main>
```

Notice here that the `dimmingButtonActivated` must be set. This is used to highlight that the button is pressed and the menu is active.

# Set the time

The top bar has a `clock` slot. Put an `obc-clock` in it and give the clock an
ISO date string. Add this service to `src/app/core/services/date.service.ts`:

```ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, timer, interval } from "rxjs";
import { switchMap, startWith } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DateService {
  private dateSubject = new BehaviorSubject<string>(new Date().toISOString());
  date$ = this.dateSubject.asObservable();

  constructor() {
    this.startMinuteUpdate();
  }

  private startMinuteUpdate() {
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000; // Time until the next 0th second

    // Wait until the next minute, then update and start an interval
    timer(delay)
      .pipe(switchMap(() => interval(60000).pipe(startWith(0))))
      .subscribe(() => this.dateSubject.next(new Date().toISOString()));
  }
}
```

It returns an ISO time string every minute. Import `ObcClock` and pass the date to it.

```ts
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";
import { ObcClock } from "@oicl/openbridge-webcomponents-ng/obc-clock";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@oicl/openbridge-webcomponents-ng/obc-brilliance-menu";
import { DateService } from "./core/services/date.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcClock, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  title = "OpenBridge-angular";
  showBrillianceMenu = false;
  date: string = "";

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.dateService.date$.subscribe((newDate) => {
      this.date = newDate;
    });
  }

  handleDimmingButtonClicked() {
    this.showBrillianceMenu = !this.showBrillianceMenu;
  }

  onPaletteChange(event: ObcPaletteChangeEvent) {
    document.documentElement.setAttribute("data-obc-theme", event.detail.value);
  }
}
```

```html
<header>
  <obc-top-bar
    [appTitle]="title"
    [showDimmingButton]="true"
    [showClock]="true"
    [dimmingButtonActivated]="showBrillianceMenu"
    (dimmingButtonClickedEvent)="handleDimmingButtonClicked()"
  >
    <obc-clock slot="clock" [date]="date" />
  </obc-top-bar>
</header>

<main>
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />
  }
  <router-outlet />
</main>
```

# Add navigation menu

We can now add a navigation menu. Start by looking it up in [storybook](https://openbridge-storybook.web.app/?path=/docs/menu-navigation-menu--docs). Click on "Show code" to view the example code.

Start by making a new component:

```sh
npx ng generate component nav-menu
```

This creates `src/app/nav-menu/nav-menu.ts`, `nav-menu.html` and `nav-menu.css`.
Copy the example into `nav-menu.html`. In Angular, boolean inputs are bound with
`[input]="true"`. Navigation items only show their icon when `hasIcon` is set:

```html
<obc-navigation-menu>
  <obc-navigation-item [hasIcon]="true" slot="main" label="Apps" href="#">
    <obi-applications slot="icon"></obi-applications>
  </obc-navigation-item>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    [checked]="true"
    label="Alerts"
    href="#"
  >
    <obi-alerts slot="icon"></obi-alerts>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="main" label="Dimming" href="#">
    <obi-palette-dimming slot="icon"></obi-palette-dimming>
  </obc-navigation-item>

  <obc-navigation-item [hasIcon]="true" slot="footer" label="Help" href="#">
    <obi-support-google slot="icon"></obi-support-google>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Settings" href="#">
    <obi-settings-iec slot="icon"></obi-settings-iec>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Alert" href="#">
    <obi-alert-list slot="icon"></obi-alert-list>
  </obc-navigation-item>

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

Import the wrapper components:

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@oicl/openbridge-webcomponents-ng/obc-navigation-menu";
import { ObcNavigationItem } from "@oicl/openbridge-webcomponents-ng/obc-navigation-item";
import { ObiApplications } from "@oicl/openbridge-webcomponents-ng/obi-applications";
import { ObiAlerts } from "@oicl/openbridge-webcomponents-ng/obi-alerts";
import { ObiPaletteDimming } from "@oicl/openbridge-webcomponents-ng/obi-palette-dimming";
import { ObiSupportGoogle } from "@oicl/openbridge-webcomponents-ng/obi-support-google";
import { ObiSettingsIec } from "@oicl/openbridge-webcomponents-ng/obi-settings-iec";
import { ObiAlertList } from "@oicl/openbridge-webcomponents-ng/obi-alert-list";

@Component({
  selector: "app-nav-menu",
  imports: [
    ObcNavigationMenu,
    ObcNavigationItem,
    ObiApplications,
    ObiAlerts,
    ObiPaletteDimming,
    ObiSupportGoogle,
    ObiSettingsIec,
    ObiAlertList,
  ],
  templateUrl: "./nav-menu.html",
  styleUrl: "./nav-menu.css",
})
export class NavMenu {}
```

Add this component to `app.ts` and include logic for toggling the menu. Notice that clicking the navigation menu should close the brilliance menu and vice versa.

```ts
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@oicl/openbridge-webcomponents-ng/obc-top-bar";
import { ObcClock } from "@oicl/openbridge-webcomponents-ng/obc-clock";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@oicl/openbridge-webcomponents-ng/obc-brilliance-menu";
import { DateService } from "./core/services/date.service";
import { NavMenu } from "./nav-menu/nav-menu";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcClock, ObcBrillianceMenu, NavMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  title = "OpenBridge-angular";
  showBrillianceMenu = false;
  showNavMenu = false;
  date: string = "";

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.dateService.date$.subscribe((newDate) => {
      this.date = newDate;
    });
  }

  handleDimmingButtonClicked() {
    this.showBrillianceMenu = !this.showBrillianceMenu;
    this.showNavMenu = false;
  }

  handleNavMenuButtonClicked() {
    this.showNavMenu = !this.showNavMenu;
    this.showBrillianceMenu = false;
  }

  onPaletteChange(event: ObcPaletteChangeEvent) {
    document.documentElement.setAttribute("data-obc-theme", event.detail.value);
  }
}
```

Update `app.html`

```html
<header>
  <obc-top-bar
    [appTitle]="title"
    [showDimmingButton]="true"
    [showClock]="true"
    [dimmingButtonActivated]="showBrillianceMenu"
    (dimmingButtonClickedEvent)="handleDimmingButtonClicked()"
    (menuButtonClickedEvent)="handleNavMenuButtonClicked()"
    [menuButtonActivated]="showNavMenu"
  >
    <obc-clock slot="clock" [date]="date" />
  </obc-top-bar>
</header>

<main>
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />
  } @if (showNavMenu) {
  <app-nav-menu class="navigation-menu" />
  }
  <router-outlet />
</main>
```

We need to position the navigation menu. Add this to `app.css`:

```css
.navigation-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
```

# Add some content

We would now like to use the navigation menu to switch between components.
Generate a component for the first page:

```sh
npx ng generate component azimuth-demo
```

Import the azimuth thruster in `src/app/azimuth-demo/azimuth-demo.ts`

```ts
import { Component } from "@angular/core";
import { ObcAzimuthThruster } from "@oicl/openbridge-webcomponents-ng/obc-azimuth-thruster";

@Component({
  selector: "app-azimuth-demo",
  imports: [ObcAzimuthThruster],
  templateUrl: "./azimuth-demo.html",
  styleUrl: "./azimuth-demo.css",
})
export class AzimuthDemo {}
```

and render it in `azimuth-demo.html`:

```html
<obc-azimuth-thruster [angle]="30" [thrust]="50"></obc-azimuth-thruster>
```

Add it to `src/app/app.routes.ts`

```ts
import { Routes } from "@angular/router";
import { AzimuthDemo } from "./azimuth-demo/azimuth-demo";

export const routes: Routes = [{ path: "", component: AzimuthDemo }];
```

Play with the input parameters of the azimuth.

Try opening the navigation menu. Notice that the component is rendered above the navigation menu. Therefore move the `<router-outlet />` above the menus in the `app.html`

```html
<header>
  <obc-top-bar
    [appTitle]="title"
    [showDimmingButton]="true"
    [showClock]="true"
    [dimmingButtonActivated]="showBrillianceMenu"
    (dimmingButtonClickedEvent)="handleDimmingButtonClicked()"
    (menuButtonClickedEvent)="handleNavMenuButtonClicked()"
    [menuButtonActivated]="showNavMenu"
  >
    <obc-clock slot="clock" [date]="date" />
  </obc-top-bar>
</header>

<main>
  <router-outlet />
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />
  } @if (showNavMenu) {
  <app-nav-menu class="navigation-menu" />
  }
</main>
```

# Add another page

Add another page:

```sh
npx ng generate component tunnel-demo
```

`tunnel-demo.ts`:

```ts
import { Component } from "@angular/core";

import { ObcThruster } from "@oicl/openbridge-webcomponents-ng/obc-thruster";

@Component({
  selector: "app-tunnel-demo",
  imports: [ObcThruster],
  templateUrl: "./tunnel-demo.html",
  styleUrl: "./tunnel-demo.css",
})
export class TunnelDemo {}
```

`tunnel-demo.html`:

```html
<obc-thruster [tunnel]="true" [thrust]="-30" />
```

Add it to the router:

```ts
import { Routes } from "@angular/router";
import { AzimuthDemo } from "./azimuth-demo/azimuth-demo";
import { TunnelDemo } from "./tunnel-demo/tunnel-demo";

export const routes: Routes = [
  { path: "", component: AzimuthDemo },
  { path: "tunnel", component: TunnelDemo },
];
```

Try going to: http://localhost:4200/tunnel

## Update navigation menu

We can now use these path in the navigation menu:

- set the href to the path in router
- find some good labels and [icons](https://openbridge-demo.web.app/icons)
- put the company logo in `public/`. The example uses
  [companylogo-day.png](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents/raw/refs/heads/stable/packages/openbridge-webcomponents/public/companylogo-day.png)

```html
<obc-navigation-menu>
  <obc-navigation-item [hasIcon]="true" slot="main" label="Azimuth" href="/">
    <obi-propulsion-azimuth-thruster
      slot="icon"
    ></obi-propulsion-azimuth-thruster>
  </obc-navigation-item>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    [checked]="true"
    label="Tunnel"
    href="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
  </obc-navigation-item>

  <obc-navigation-item [hasIcon]="true" slot="footer" label="Help" href="#">
    <obi-support-google slot="icon"></obi-support-google>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Settings" href="#">
    <obi-settings-iec slot="icon"></obi-settings-iec>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Alert" href="#">
    <obi-alert-list slot="icon"></obi-alert-list>
  </obc-navigation-item>

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@oicl/openbridge-webcomponents-ng/obc-navigation-menu";
import { ObcNavigationItem } from "@oicl/openbridge-webcomponents-ng/obc-navigation-item";
import { ObiSupportGoogle } from "@oicl/openbridge-webcomponents-ng/obi-support-google";
import { ObiSettingsIec } from "@oicl/openbridge-webcomponents-ng/obi-settings-iec";
import { ObiAlertList } from "@oicl/openbridge-webcomponents-ng/obi-alert-list";
import { ObiPropulsionAzimuthThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-tunnel-thruster";

@Component({
  selector: "app-nav-menu",
  imports: [
    ObcNavigationMenu,
    ObcNavigationItem,
    ObiSupportGoogle,
    ObiSettingsIec,
    ObiAlertList,
    ObiPropulsionAzimuthThruster,
    ObiPropulsionTunnelThruster,
  ],
  templateUrl: "./nav-menu.html",
  styleUrl: "./nav-menu.css",
})
export class NavMenu {}
```

Try to use the navigation menu.

You may notice two problems:

- The active page in nav menu is not updating
- When changing page, the entire page is reloaded.

## Use Angular routerLink directive

Currently the navigation item is an `<a>` element, linking to the new page.
Using the `RouterLink` directive, the router is instead notified when a page should be changed.
Import the RouterLink directive into the nav-menu component

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@oicl/openbridge-webcomponents-ng/obc-navigation-menu";
import { ObcNavigationItem } from "@oicl/openbridge-webcomponents-ng/obc-navigation-item";
import { ObiSupportGoogle } from "@oicl/openbridge-webcomponents-ng/obi-support-google";
import { ObiSettingsIec } from "@oicl/openbridge-webcomponents-ng/obi-settings-iec";
import { ObiAlertList } from "@oicl/openbridge-webcomponents-ng/obi-alert-list";
import { ObiPropulsionAzimuthThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-tunnel-thruster";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-nav-menu",
  imports: [
    ObcNavigationMenu,
    ObcNavigationItem,
    ObiSupportGoogle,
    ObiSettingsIec,
    ObiAlertList,
    ObiPropulsionAzimuthThruster,
    ObiPropulsionTunnelThruster,
    RouterLink,
  ],
  templateUrl: "./nav-menu.html",
  styleUrl: "./nav-menu.css",
})
export class NavMenu {}
```

and replace the `href` with `routerLink`

```html
<obc-navigation-menu>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    label="Azimuth"
    routerLink="/"
  >
    <obi-propulsion-azimuth-thruster
      slot="icon"
    ></obi-propulsion-azimuth-thruster>
  </obc-navigation-item>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    [checked]="true"
    label="Tunnel"
    routerLink="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
  </obc-navigation-item>

  <obc-navigation-item [hasIcon]="true" slot="footer" label="Help" href="#">
    <obi-support-google slot="icon"></obi-support-google>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Settings" href="#">
    <obi-settings-iec slot="icon"></obi-settings-iec>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Alert" href="#">
    <obi-alert-list slot="icon"></obi-alert-list>
  </obc-navigation-item>

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

Try the navigation menu again. The switching of pages is much faster.

## Update the selected page

We can use `Router` to check if the selected route is active

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@oicl/openbridge-webcomponents-ng/obc-navigation-menu";
import { ObcNavigationItem } from "@oicl/openbridge-webcomponents-ng/obc-navigation-item";
import { ObiSupportGoogle } from "@oicl/openbridge-webcomponents-ng/obi-support-google";
import { ObiSettingsIec } from "@oicl/openbridge-webcomponents-ng/obi-settings-iec";
import { ObiAlertList } from "@oicl/openbridge-webcomponents-ng/obi-alert-list";
import { ObiPropulsionAzimuthThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@oicl/openbridge-webcomponents-ng/obi-propulsion-tunnel-thruster";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-nav-menu",
  imports: [
    ObcNavigationMenu,
    ObcNavigationItem,
    ObiSupportGoogle,
    ObiSettingsIec,
    ObiAlertList,
    ObiPropulsionAzimuthThruster,
    ObiPropulsionTunnelThruster,
    RouterLink,
  ],
  templateUrl: "./nav-menu.html",
  styleUrl: "./nav-menu.css",
})
export class NavMenu {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
```

```html
<obc-navigation-menu>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    [checked]="isActive('/')"
    label="Azimuth"
    routerLink="/"
  >
    <obi-propulsion-azimuth-thruster
      slot="icon"
    ></obi-propulsion-azimuth-thruster>
  </obc-navigation-item>
  <obc-navigation-item
    [hasIcon]="true"
    slot="main"
    [checked]="isActive('/tunnel')"
    label="Tunnel"
    routerLink="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
  </obc-navigation-item>

  <obc-navigation-item [hasIcon]="true" slot="footer" label="Help" href="#">
    <obi-support-google slot="icon"></obi-support-google>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Settings" href="#">
    <obi-settings-iec slot="icon"></obi-settings-iec>
  </obc-navigation-item>
  <obc-navigation-item [hasIcon]="true" slot="footer" label="Alert" href="#">
    <obi-alert-list slot="icon"></obi-alert-list>
  </obc-navigation-item>

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

Refactoring the router-aware navigation item into a separate component is left to the reader.

# Add an input

To show how to use output data from a component we can add a slider to the `azimuth-demo` page.

```ts
import { Component } from "@angular/core";
import { ObcAzimuthThruster } from "@oicl/openbridge-webcomponents-ng/obc-azimuth-thruster";
import {
  ObcSlider,
  type ObcSliderValueEvent,
} from "@oicl/openbridge-webcomponents-ng/obc-slider";

@Component({
  selector: "app-azimuth-demo",
  imports: [ObcAzimuthThruster, ObcSlider],
  templateUrl: "./azimuth-demo.html",
  styleUrl: "./azimuth-demo.css",
})
export class AzimuthDemo {
  angle = 30;

  onAngleChange(event: ObcSliderValueEvent) {
    this.angle = event.detail;
  }
}
```

```html
<obc-slider
  [min]="0"
  [max]="360"
  [step]="1"
  [value]="angle"
  (valueEvent)="onAngleChange($event)"
></obc-slider>
<obc-azimuth-thruster [angle]="angle" [thrust]="50"></obc-azimuth-thruster>
```

## Production build

`npx ng build` warns that the initial bundle exceeds the default 500 kB budget.
That is expected with the OpenBridge styles and components. Raise
`maximumWarning` and `maximumError` for the `initial` budget in `angular.json`
if the warning bothers you.
