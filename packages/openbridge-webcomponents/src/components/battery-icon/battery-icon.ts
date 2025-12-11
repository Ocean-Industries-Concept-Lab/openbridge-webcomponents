import {
  LitElement,
  TemplateResult,
  css,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './battery-icon.css?inline';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('obc-battery-icon')
export class ObcBatteryIcon extends LitElement {
  @property({type: Number}) level = 0; // 0-100
  @property({type: Boolean}) charging = false;
  @property({type: Boolean}) notification = false;

  override render() {
    const max = 6;
    const min = 19;
    let y = (this.level * (max - min)) / 100 + min;
    if (this.level >= 100) {
      y = 5;
    } else if (this.level <= 0) {
      y = 20;
    }
    let insidePath = `M9 5V${y}H15V5H9Z`;
    if (this.level < 10 && this.level > 0) {
      insidePath = `M9 5L9 20L15 16L15 5L9 5Z`;
    }
    let extraPath: TemplateResult | symbol = nothing;
    if (this.charging) {
      extraPath = svg`<path d="M15 18L17.5 18V22.0913C17.5 22.6058 18.1835 22.7849 18.4358 22.3364L22 16H19.5V11.9088C19.5 11.3943 18.8165 11.2152 18.5642 11.6637L15 18Z" fill="currentColor" />`;
    } else if (this.notification) {
      extraPath = svg`<path d="M16 11H18V18H16V11Z" fill="currentColor"/>
      <circle cx="17" cy="21" r="1" fill="currentColor" />`;
    }

    let mask: TemplateResult | symbol = nothing;
    if (this.charging) {
      mask = svg`<defs><mask id="mask">
      <path d="M 0 0 V 24 H 15.5 v -4 h -0.5 c -0.7105 0 -1.3677 -0.3769 -1.7264 -0.9903 c -0.3587 -0.6133 -0.3651 -1.3709 -0.0167 -1.9902 l 3.5642 -6.3364 c 0.0556 -0.0989 0.1154 -0.1916 0.1789 -0.2784 V 0 Z" fill="white" />
    </mask></defs>`;
    } else if (this.notification) {
      mask = svg`<defs><mask id="mask">
      <path d="M 0 0 H 24 V 9 H 14 V 9 V 22 H 0 Z" fill="white" />
    </mask></defs>`;
    }

    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${mask}
        <path
          mask=${ifDefined(mask ? 'url(#mask)' : undefined)}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 2C10 1.44772 10.4477 1 11 1L13 1C13.5523 1 14 1.44772 14 2V3H15C16.1046 3 17 3.89543 17 5V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20L7 5C7 3.89543 7.89543 3 9 3H10V2Z${insidePath}"
          fill="currentColor"
        />
        ${extraPath}
      </svg>
    `;
  }

  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-battery-icon': ObcBatteryIcon;
  }
}
