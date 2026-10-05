import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './valve-analog-two-way-icon.css?inline';
import {customElement} from '../../decorator.js';
import {clampPercent, interpolate} from '../../svghelpers/math.js';
import '../../icons/icon-twoway-analog-closed.js';

const OUTLINE =
  'M11 11L3.5547 6.03645C2.89015 5.59342 2 6.06981 2 6.8685V19.1315C2 19.9302 2.89015 20.4066 3.5547 19.9635L11 15H13L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11H11ZM3 6.8685L3 19.1315L10.6972 14H13.3028L21 19.1315V6.8685L13.3028 12H10.6972L3 6.8685Z';
const BODY =
  'M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z';

/**
 * Geometry of the `obi-twoway-analog-*` icons, keyed by opening in percent:
 * the width of the shut band at each port end, and the handle's angle and
 * centre. The 0 % step continues the 10 % one to a vertical handle.
 */
const BAND_WIDTH = [
  [0, 7],
  [10, 6],
  [25, 4],
  [50, 2],
  [75, 1],
  [100, 0],
] as const;
const HANDLE_ANGLE = [
  [0, -90],
  [10, -75],
  [25, -60],
  [50, -45],
  [75, -15],
  [100, 0],
] as const;
const HANDLE_X = [
  [0, 12],
  [10, 12.147],
  [25, 11.75],
  [50, 12.268],
  [75, 11.915],
  [100, 12],
] as const;
const HANDLE_Y = [
  [0, 5.5],
  [10, 4.915],
  [25, 4.665],
  [50, 4.268],
  [75, 4.147],
  [100, 3.5],
] as const;

const SECONDARY = 'fill: var(--automation-device-secondary-color)';
const TERTIARY = 'fill: var(--automation-device-tertiary-color)';
const PRIMARY = 'fill: var(--automation-device-primary-color)';

/**
 * Two-way analog valve symbol whose opening moves continuously from 0 to
 * 100 %.
 *
 * Draws the same symbol as the `obi-twoway-analog-*` icons and matches them
 * at their 10/25/50/75 % and open steps; between the steps the shut bands at
 * the port ends and the handle move smoothly. Used as the icon of
 * `obc-analog-valve`.
 *
 * TODO(designer): no icon is drawn below 10 %; the symbol continues the
 * 10 % step to a vertical handle at 0 %.
 *
 * @property value - Opening in percent (0–100).
 * @availableWhen value closed==false
 * @property closed - Shows the closed symbol.
 * @property vertical - Turns the symbol 90° for a vertical pipe.
 * @stable
 */
@customElement('obc-valve-analog-two-way-icon')
export class ObcValveAnalogTwoWayIcon extends LitElement {
  @property({type: Number}) value: number = 0;
  @property({type: Boolean}) closed: boolean = false;
  @property({type: Boolean}) vertical: boolean = false;

  private renderBands(width: number) {
    if (width <= 0) return null;
    const left = 3 + width;
    const right = 21 - width;
    return svg`<g clip-path="url(#body)">
      <rect x="2" y="0" width=${left - 2} height="24" style=${SECONDARY}/>
      <rect x=${left} y="0" width="1" height="24" style=${TERTIARY}/>
      <rect x=${right} y="0" width=${22 - right} height="24" style=${SECONDARY}/>
      <rect x=${right - 1} y="0" width="1" height="24" style=${TERTIARY}/>
    </g>`;
  }

  private renderHandle(value: number) {
    const angle = interpolate(value, HANDLE_ANGLE);
    const cx = interpolate(value, HANDLE_X);
    const cy = interpolate(value, HANDLE_Y);
    return svg`<g transform="rotate(${angle} ${cx} ${cy})">
      <line x1=${cx - 2.5} y1=${cy} x2=${cx + 2.5} y2=${cy} stroke-width="3" stroke-linecap="round" style="stroke: var(--automation-device-tertiary-color)"/>
      <line x1=${cx - 2.5} y1=${cy} x2=${cx + 2.5} y2=${cy} stroke-width="1" stroke-linecap="round" style="stroke: var(--automation-device-primary-color)"/>
    </g>`;
  }

  override render() {
    const transform = this.vertical ? 'transform: rotate(90deg);' : '';
    if (this.closed) {
      return html` <div class="wrapper" style="${transform}">
        <obi-twoway-analog-closed useCssColor> </obi-twoway-analog-closed>
      </div>`;
    }

    const value = clampPercent(this.value);
    return html`
      <div class="wrapper" style="${transform}">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="body"><path d=${BODY} /></clipPath>
          </defs>
          <path d=${OUTLINE} style=${TERTIARY} />
          <path d=${BODY} style=${PRIMARY} />
          ${this.renderBands(interpolate(value, BAND_WIDTH))}
          ${this.renderHandle(value)}
        </svg>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve-analog-two-way-icon': ObcValveAnalogTwoWayIcon;
  }
}
