# Getting Started with Angular for OpenBridge Applications

This tutorial will guide you through creating an OpenBridge-based application using Angular. We will start with an empty folder and end with a multi-view application.

## Creating a Angular Project

To create a new Angular project, run the following command:

```sh
npm install -g @angular/cli
ng new maritime-app
```

This will set up a new Angular project named `maritime-app`.

## Running the Project

After the project has been created, navigate into the project directory and run it:

```sh
cd maritime-app
npm run start
```

This will start a development server, typically accessible at `http://localhost:4200/` (or another available port if 4200 is in use).

## Install OpenBridge web components angular wrapper

To use the components in your project, you can install the package from github package repo.

Start by creating a classic personal access token in github
Go to [github settings](https://github.com/settings/tokens/new) to make a classic token. Give the token the `read:packages` permission. Click "Generate token" and copy the token.

Login into github package repo:

```bash
npm login --registry https://npm.pkg.github.com/ --scope=@ocean-industries-concept-lab
```

Use our github username as username and past in the generated token as password.

You can now install the package:

```bash
npm install @ocean-industries-concept-lab/openbridge-webcomponents-ng
```

## Include the wrapper in the tsconfig

The angular wrapper requires that the project builds the wrapper components. Open `tsconfig.app.json` and add `"./node_modules/@ocean-industries-concept-lab/openbridge-webcomponents-ng/src/**/*.ts"` to the `include` array.

To make it easier to import the components you can also add a path mapping. In the same file, in the `compilerOptions` add:

```json
    "paths": {
      "@obc/*": ["./node_modules/@ocean-industries-concept-lab/openbridge-webcomponents-ng/src/*"],
    }
```

## Start making an app

### Clean up the generated project

Remove content in app.html

app.html:

```html
<router-outlet />
```

### Add topbar

Import the topbar to the `app.ts`

```ts {1,8-10}
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@obc/components/top-bar/top-bar";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
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
import "@ocean-industries-concept-lab/openbridge-webcomponents/dist/openbridge.css";
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

Lastly Noto Sans needs to be added. You can download it from the [OpenBridge repo](https://github.com/Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip/raw/refs/heads/main/packages/openbridge-webcomponents/public/NotoSans.ttf). Place the NotoSans.ttf file in the public folder.

Next this file must be loaded by the css. So add it to styles.css:

```css
@font-face {
  font-family: "Noto Sans";
  src: url(/NotoSans.ttf) format("truetype");
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

We can now modify the topbar. Go to the [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/application-topbar--docs) for details of attributes.

For instance add these properties:

```html
<obc-top-bar [appTitle]="title" [showDimmingButton]="true" [showClock]="true" />
```

Where title is a variable of the component.

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
import { ObcTopBar } from "@obc/components/top-bar/top-bar";
import { ObcBrillianceMenu } from "@obc/components/brilliance-menu/brilliance-menu";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
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

It's location is a bit of.

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
Find the event name under events in [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/application-topbar--docs). Remember also to set the `dimmingButtonActivated` which marks the button grey when activated. Lastly we also change the pallet when pressed.

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@obc/components/top-bar/top-bar";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@obc/components/brilliance-menu/brilliance-menu";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
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
  />}
  <router-outlet />
</main>
```

Notice here that the `dimmingButtonActivated` must be set. This is used to highlight that the button is pressed and the menu is active.

# Set the time

You may have notice that the clock is not set correctly. Add this service to `src/core/services/date.service.ts`:

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

It returns a ISO time string every minute. Set that as property for the top bar.

```ts
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@obc/components/top-bar/top-bar";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@obc/components/brilliance-menu/brilliance-menu";
import { DateService } from "./core/services/date.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
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
    [date]="date"
  />
</header>

<main>
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />}
  <router-outlet />
</main>
```

# Add navigation menu

We can now add a navigation menu. Start by looking it up in [storybook](https://openbridge-jip-storybook.web.app/?path=/docs/menu-navigation-menu--docs). Click on "Show code" to view the example code.

Start by making an new component. Run `ng generate component` in the command line. Give it NavMenu as name. Copy the example file into the new html file:

```html
<obc-navigation-menu>
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

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

Import the wrapper components:

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@obc/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@obc/components/navigation-item/navigation-item";
import { ObiApplications } from "@obc/icons/icon-applications";
import { ObiAlerts } from "@obc/icons/icon-alerts";
import { ObiPaletteDimming } from "@obc/icons/icon-palette-dimming";
import { ObiSupportGoogle } from "@obc/icons/icon-support-google";
import { ObiSettingsIec } from "@obc/icons/icon-settings-iec";
import { ObiAlertList } from "@obc/icons/icon-alert-list";

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
  templateUrl: "./nav-menu.component.html",
  styleUrl: "./nav-menu.component.css",
})
export class NavMenuComponent {}
```

Add this component to the `app.ts` include logic for toggeling the menu. Notice that clicking the navigation menu should close the brilliance menu and vica versa.

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ObcTopBar } from "@obc/components/top-bar/top-bar";
import {
  ObcBrillianceMenu,
  type ObcPaletteChangeEvent,
} from "@obc/components/brilliance-menu/brilliance-menu";
import { DateService } from "./core/services/date.service";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ObcTopBar, ObcBrillianceMenu, NavMenuComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
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
    [date]="date"
  />
</header>

<main>
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />} @if (showNavMenu) {
  <app-nav-menu class="navigation-menu "></app-nav-menu> }
  <router-outlet />
</main>
```

We need to position the navigation menu. In this case we will do it from the NavigationMenu component.
Add app.css:

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

# Add some content

We would now like to use the navigation menu to switch between components.
Use `ng generate component` to generate a component with name azimuth-demo.

Import the azimuth thruster

```ts
import { Component } from "@angular/core";
import { ObcAzimuthThruster } from "@obc/navigation-instruments/azimuth-thruster/azimuth-thruster";

@Component({
  selector: "app-azumuth-demo",
  imports: [ObcAzimuthThruster],
  templateUrl: "./azumuth-demo.component.html",
  styleUrl: "./azumuth-demo.component.css",
})
export class AzumuthDemoComponent {}
```

and render it:

```html
<obc-azimuth-thruster [angle]="30" [thrust]="50"></obc-azimuth-thruster>
```

import it to `app.router.ts`

```tsx
import { Routes } from "@angular/router";
import { AzumuthDemoComponent } from "./azumuth-demo/azumuth-demo.component";

export const routes: Routes = [{ path: "", component: AzumuthDemoComponent }];
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
    [date]="date"
  />
</header>

<main>
  <router-outlet />
  @if (showBrillianceMenu) {
  <obc-brilliance-menu
    class="brilliance"
    (paletteChangedEvent)="onPaletteChange($event)"
  />} @if (showNavMenu) {
  <app-nav-menu class="navigation-menu "></app-nav-menu> }
</main>
```

# Add another page

Add another page name it `TunnelDemo`

```ts
import { Component } from "@angular/core";

import { ObcThruster } from "@obc/navigation-instruments/thruster/thruster";

@Component({
  selector: "app-tunnel-demo",
  imports: [ObcThruster],
  templateUrl: "./tunnel-demo.component.html",
  styleUrl: "./tunnel-demo.component.css",
})
export class TunnelDemoComponent {}
```

```html
<obc-thruster [tunnel]="true" [thrust]="-30" />
```

Add it to the router:

```ts
import { Routes } from "@angular/router";
import { AzumuthDemoComponent } from "./azumuth-demo/azumuth-demo.component";
import { TunnelDemoComponent } from "./tunnel-demo/tunnel-demo.component";

export const routes: Routes = [
  { path: "", component: AzumuthDemoComponent },
  { path: "tunnel", component: TunnelDemoComponent },
];
```

Try going to: http://localhost:4200/tunnel

## Update navigation menu

We can now use these path in the navigation menu:

- set the href to the path in router
- find some good labels and [icons](https://openbridge-jip-demo.web.app/icons)

```html
<obc-navigation-menu>
  <obc-navigation-item slot="main" label="Apps" href="/">
    <obi-propulsion-azimuth-thruster
      slot="icon"
    ></obi-propulsion-azimuth-thruster>
  </obc-navigation-item>
  <obc-navigation-item
    slot="main"
    [checked]="true"
    label="Alerts"
    href="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
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

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@obc/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@obc/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@obc/icons/icon-support-google";
import { ObiSettingsIec } from "@obc/icons/icon-settings-iec";
import { ObiAlertList } from "@obc/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@obc/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@obc/icons/icon-propulsion-tunnel-thruster";

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
  templateUrl: "./nav-menu.component.html",
  styleUrl: "./nav-menu.component.css",
})
export class NavMenuComponent {}
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
import { ObcNavigationMenu } from "@obc/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@obc/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@obc/icons/icon-support-google";
import { ObiSettingsIec } from "@obc/icons/icon-settings-iec";
import { ObiAlertList } from "@obc/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@obc/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@obc/icons/icon-propulsion-tunnel-thruster";
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
  templateUrl: "./nav-menu.component.html",
  styleUrl: "./nav-menu.component.css",
})
export class NavMenuComponent {}
```

and replace the `href` with `routerLink`

```html
<obc-navigation-menu>
  <obc-navigation-item slot="main" label="Azimuth" routerLink="/">
    <obi-propulsion-azimuth-thruster
      slot="icon"
    ></obi-propulsion-azimuth-thruster>
  </obc-navigation-item>
  <obc-navigation-item
    slot="main"
    [checked]="true"
    label="Tunnel"
    routerLink="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
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

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

Try the navigation menu again. The switching of pages is much faster.

## Update the selected page

We can use `Router` to check if the selected route is active

```ts
import { Component } from "@angular/core";
import { ObcNavigationMenu } from "@obc/components/navigation-menu/navigation-menu";
import { ObcNavigationItem } from "@obc/components/navigation-item/navigation-item";
import { ObiSupportGoogle } from "@obc/icons/icon-support-google";
import { ObiSettingsIec } from "@obc/icons/icon-settings-iec";
import { ObiAlertList } from "@obc/icons/icon-alert-list";
import { ObiPropulsionAzimuthThruster } from "@obc/icons/icon-propulsion-azimuth-thruster";
import { ObiPropulsionTunnelThruster } from "@obc/icons/icon-propulsion-tunnel-thruster";
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
  templateUrl: "./nav-menu.component.html",
  styleUrl: "./nav-menu.component.css",
})
export class NavMenuComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
```

```html
<obc-navigation-menu>
  <obc-navigation-item
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
    slot="main"
    [checked]="isActive('/tunnel')"
    label="Tunnel"
    routerLink="/tunnel"
  >
    <obi-propulsion-tunnel-thruster
      slot="icon"
    ></obi-propulsion-tunnel-thruster>
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

  <img slot="logo" src="/companylogo-day.png" alt="logo" />
</obc-navigation-menu>
```

The router link should now be refacto out to a seperate component. That is left to the reader.

# Add an input

To show how to use output data from an component we can add a slider to the `azimuth-demo` page.

```ts
import { Component } from "@angular/core";
import { ObcAzimuthThruster } from "@obc/navigation-instruments/azimuth-thruster/azimuth-thruster";
import {
  ObcSlider,
  type ObcSliderValueEvent,
} from "@obc/components/slider/slider";

@Component({
  selector: "app-azumuth-demo",
  imports: [ObcAzimuthThruster, ObcSlider],
  templateUrl: "./azumuth-demo.component.html",
  styleUrl: "./azumuth-demo.component.css",
})
export class AzumuthDemoComponent {
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
  [value]="0"
  (valueEvent)="onAngleChange($event)"
></obc-slider>
<obc-azimuth-thruster [angle]="angle" [thrust]="50"> </obc-azimuth-thruster>
```
