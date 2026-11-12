# @oicl/openbridge-norvar

Web components drawn with the symbols of the NORVAR standard (NORVAR report
153/2007 from Norsk Vann BA), built on
[OpenBridge Web Components](../openbridge-webcomponents).

> **Not part of the OpenBridge standard.** OpenBridge does not define, review
> or maintain these symbols. The tags have no `obc-` prefix for that reason.

- Storybook (stable): https://openbridge-norvar-storybook.web.app
- Storybook (develop): https://openbridge-next-norvar-storybook.web.app
- OpenBridge Web Components Storybook: https://openbridge-storybook.web.app

The package is not published to npm yet.

## Components

| Element                     | What it draws                                                                   |
| --------------------------- | ------------------------------------------------------------------------------- |
| `norvar-valve`              | On/off valve with the actuator of the valve type                                |
| `norvar-water-station`      | Drinking water facility, square                                                 |
| `norvar-wastewater-station` | Wastewater facility, round                                                      |
| `norvar-map-symbol`         | Culvert, precipitation station, watercourse metering station or discharge point |

## Usage

```ts
import '@oicl/openbridge-webcomponents/dist/openbridge.css';
import '@oicl/openbridge-norvar/dist/norvar-valve/norvar-valve.js';
```

```html
<norvar-valve open tag="#0012"></norvar-valve>
```
