import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './valve-analog-two-way-icon.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-twoway-analog-closed.js';

/**
 * @stable
 */
@customElement('obc-valve-analog-two-way-icon')
export class ObcValveAnalogTwoWayIcon extends LitElement {
  /** @availableWhen closed==false */
  @property({type: Number}) value: number = 0;
  @property({type: Boolean}) closed: boolean = false;
  @property({type: Boolean}) vertical: boolean = false;

  override render() {
    const transform = this.vertical ? 'transform: rotate(90deg);' : '';
    if (this.closed) {
      return html` <div class="wrapper" style="${transform}">
        <obi-twoway-analog-closed useCssColor> </obi-twoway-analog-closed>
      </div>`;
    }

    const handleRotation = -(1 - this.value / 100) * 90;
    const handleTranslation = (1 - this.value / 100) * 2;
    const handle = svg`
      <g transform="translate(0, ${handleTranslation}) rotate(${handleRotation} 12 3.5) ">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 5H14.5C15.3284 5 16 4.32843 16 3.5C16 2.67157 15.3284 2 14.5 2H9.5C8.67157 2 8 2.67157 8 3.5C8 4.32843 8.67157 5 9.5 5ZM9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" fill="var(--automation-device-tertiary-color)"/>
        <path d="M9.5 4L14.5 4C14.7761 4 15 3.77614 15 3.5C15 3.22386 14.7761 3 14.5 3L9.5 3C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4Z" fill="var(--automation-device-primary-color)"/>
      </g>
    `;

    const xmin = 10.5;
    const xmax = 2.5;
    const x = xmin + ((xmax - xmin) * this.value) / 100;

    return html`
      <div class="wrapper" style="${transform}">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 11L3.5547 6.03645C2.89015 5.59342 2 6.06981 2 6.8685V19.1315C2 19.9302 2.89015 20.4066 3.5547 19.9635L11 15H13L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11H11ZM3 6.8685L3 19.1315L10.6972 14H13.3028L21 19.1315V6.8685L13.3028 12H10.6972L3 6.8685Z"
            fill="var(--automation-device-tertiary-color)"
          />
          <path
            d="M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z"
            fill="var(--automation-device-primary-color)"
          />
          ${handle}
          <g clip-path="url(#clip0)">
            <rect
              x=${xmax}
              y="0"
              width=${x - xmax}
              height="24"
              fill="var(--automation-device-secondary-color)"
            />
            <line
              x1=${x}
              y1="0"
              x2=${x}
              y2="24"
              stroke="var(--automation-device-tertiary-color)"
              stroke-width="1"
            />

            <rect
              x=${24 - x}
              y="0"
              width=${x - xmax}
              height="24"
              fill="var(--automation-device-secondary-color)"
            />
            <line
              x1=${24 - x}
              y1="0"
              x2=${24 - x}
              y2="24"
              stroke="var(--automation-device-tertiary-color)"
              stroke-width="1"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <path
                d="M10.6972 12H13.3028L21 6.8685V19.1315L13.3028 14H10.6972L3 19.1315V6.8685L10.6972 12Z"
              />
            </clipPath>
          </defs>
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
