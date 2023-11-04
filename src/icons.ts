import { unsafeSVG } from "lit/directives/unsafe-svg.js"
import { TemplateResult, html } from "lit"
import Alerts from "./assets/icons/alerts.svg?raw"
import Apps from "./assets/icons/apps.svg?raw"
import BrillianceHigh from "./assets/icons/brilliance-high.svg?raw"
import BrillianceLow from "./assets/icons/brilliance-low.svg?raw"
import Dimming from "./assets/icons/dimming.svg?raw"
import Menu from "./assets/icons/menu.svg?raw"
import Placeholder from "./assets/icons/placeholder.svg?raw"

import DayBright from "./assets/icons/04-day-bright.svg?raw"
import Day from "./assets/icons/04-day.svg?raw"
import Dusk from "./assets/icons/04-dusk.svg?raw"
import Night from "./assets/icons/04-night.svg?raw"

export const iconsUrl: {[key: string]: TemplateResult} = {
    'alerts': html`${unsafeSVG(Alerts)}`,
    'apps': html`${unsafeSVG(Apps)}`,
    'brilliance-high': html`${unsafeSVG(BrillianceHigh)}`,
    'brilliance-low': html`${unsafeSVG(BrillianceLow)}`,
    'dimming': html`${unsafeSVG(Dimming)}`,
    'menu': html`${unsafeSVG(Menu)}`,
    'placeholder': html`${unsafeSVG(Placeholder)}`,

    'day-bright': html`${unsafeSVG(DayBright)}`,
    'day': html`${unsafeSVG(Day)}`,
    'dusk': html`${unsafeSVG(Dusk)}`,
    'night': html`${unsafeSVG(Night)}`,
    
}