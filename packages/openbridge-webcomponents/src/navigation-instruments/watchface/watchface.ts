import { LitElement, svg } from 'lit'
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

enum TickmarkType {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

function tickmarks(size: Size, tickmarksDeg: number, tickmarkSize: TickmarkType, colorName: string) {
  let width;
  if (size === Size.small) {
    width = 100;
  } else if (size === Size.medium) {
    width = 200;
  } else {
    width = 400;
  }
  const scale = width / 400;

  let innerRadius = (200 - 24) * scale;
  let outerRadius = 200 * scale;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = (200 - 4 - 16) * scale;
    outerRadius = (200 - 4) * scale;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    innerRadius = (200 - 14 - 8) * scale;
    outerRadius = (200 - 14) * scale;
  }

  let svgPath = "";
  for (let i = 0; i < 360; i += tickmarksDeg) {
    const angle = i * Math.PI / 180;
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    const x2 = Math.cos(angle) * outerRadius;
    const y2 = Math.sin(angle) * outerRadius;
    svgPath += `M ${x1} ${y1} L ${x2} ${y2} `;
  }
  return svg`<path d=${svgPath} stroke="var(--${colorName}" stroke-width="1"/>`;

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
              ${tickmarks(this.size, 90, TickmarkType.secondary, "instrument-frame-tertiary-color")}
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
