import { unsafeSVG } from "lit/directives/unsafe-svg.js"
import { TemplateResult, html } from "lit"
import Alerts from "./assets/icons/alerts.svg?raw"
import Apps from "./assets/icons/apps.svg?raw"
import Dimming from "./assets/icons/dimming.svg?raw"
import Menu from "./assets/icons/menu.svg?raw"
import Placeholder from "./assets/icons/placeholder.svg?raw"

export const iconsUrl: {[key: string]: TemplateResult} = {
    'alerts': html`${unsafeSVG(Alerts)}`,
    'apps': html`${unsafeSVG(Apps)}`,
    'dimming': html`${unsafeSVG(Dimming)}`,
    'menu': html`${unsafeSVG(Menu)}`,
    'placeholder': html`${unsafeSVG(Placeholder)}`,
}