import { LitElement, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import compentStyle from "./watchface.style";
import RegularWatchfaceMedium from "../../generated-with-style/Watchface/RegularWatchfaceMedium.svg?raw"
import ToplineMedium from "../../generated-with-style/Tickmarks/ToplineMedium.svg?raw"
import SecondaryTickmark90 from "../../generated-with-style/Tickmarks/SecondaryTickmark90.svg?raw"

export enum Size {
  small = "s",
  medium = "m",
  large = "l",
}

@customElement('obc-watchface')
export class ObcWatchface extends LitElement {
  @property({ type: String }) size: Size = Size.medium;
  @property({ type: Boolean }) topline: boolean = false;

  override render() {
    return svg`
         <svg viewBox="-128 -128 256 256">
            <svg width="256" height="256" x="-128" y="-128">
                ${unsafeSVG(RegularWatchfaceMedium)}
                
              </svg>
              <svg width="200" height="200" x="-100" y="-100" viewBox="0 0 400 400">
                ${unsafeSVG(SecondaryTickmark90)}
              </svg>

              ${this.topline ? svg`<g transform="translate(-0.5 -100)"> ${unsafeSVG(ToplineMedium)}</g>` : null}
          </svg>
        
        `
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watchface': ObcWatchface
  }
}
