import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './valve-analog-two-way-icon.css?inline';
import {customElement} from '../../decorator.js';
import {clampPercent} from '../../svghelpers/math.js';
import '../../icons/icon-twoway-analog-closed.js';

const OUTLINE =
  'M11 11L3.5547 6.03645C2.89015 5.59342 2 6.06981 2 6.8685V19.1315C2 19.9302 2.89015 20.4066 3.5547 19.9635L11 15H13L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11H11ZM3 6.8685L3 19.1315L10.6972 14H13.3028L21 19.1315V6.8685L13.3028 12H10.6972L3 6.8685Z';
const BODY =
  'M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z';

/** Width of the shut band at each port end when the opening is 0 %, in icon units. */
const BAND_RANGE = 7;

const SECONDARY = 'fill: var(--automation-symbol-static-background-color)';
const TERTIARY = 'fill: var(--automation-symbol-on-border-color)';
const PRIMARY = 'fill: var(--automation-symbol-on-background-color)';

/**
 * Two-way analog valve symbol whose opening moves continuously from 0 to
 * 100 %.
 *
 * Draws the same symbol as the `obi-twoway-analog-*` icons. The shut bands at
 * the port ends and the handle are linear in the opening: exact at 100 %
 * (`obi-twoway-analog-open`) and at 0 % (vertical handle, ports shut to the
 * centre), and close to the icons' 10/25/50/75 % steps in between. Used as
 * the icon of `obc-analog-valve`.
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

  /**
   * Horizontal at the top when open, turning to vertical and moving 2 units
   * down as the valve shuts, matching `obi-twoway-analog-open` at 100 %.
   */
  private renderHandle(value: number) {
    const shut = 1 - value / 100;
    const angle = -90 * shut;
    const cx = 12;
    const cy = 3.5 + 2 * shut;
    return svg`<g transform="rotate(${angle} ${cx} ${cy})">
      <rect x=${cx - 4} y=${cy - 1.5} width="8" height="3" rx="1.5" style=${TERTIARY}/>
      <rect x=${cx - 3} y=${cy - 0.5} width="6" height="1" rx="0.5" style=${PRIMARY}/>
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
          ${this.renderBands((BAND_RANGE * (100 - value)) / 100)}
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
