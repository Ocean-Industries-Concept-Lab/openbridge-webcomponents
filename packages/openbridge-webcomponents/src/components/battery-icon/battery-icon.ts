import {LitElement, TemplateResult, css, html, nothing, svg} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('obc-battery-icon')
export class ObcBatteryIcon extends LitElement {
  @property({type: Number}) level = 0; // 0-100
  @property({type: Boolean}) charging = false;
  @property({type: Boolean}) poweredNotCharging = false;
  @property({type: Boolean}) notification = false;
  @property({type: Boolean}) horizontal = false;

  override render() {
    if (this.horizontal) {
      return this._renderHorizontal();
    }
    return this._renderVertical();
  }

  private _renderHorizontal() {
    const max = 18;
    const min = 4;
    let x = (this.level * (max - min)) / 100 + min;
    if (this.level >= 100) {
      x = 19;
    } else if (this.level <= 0) {
      x = 4;
    }

    let insidePath = `M${x} 9H19V15H${x}V9Z`;
    if (this.level < 10 && this.level > 0) {
      insidePath = `M19 9H4L8 15H19V9Z`;
    }
    let extraPath: TemplateResult | symbol = nothing;
    if (this.charging) {
      extraPath = svg`<path d="M10.6667 19.7265C10.6667 20.2625 11.3956 20.4228 11.6205 19.9363L16 10.4615H13.3333V4.2734C13.3333 3.73742 12.6044 3.5771 12.3795 4.06362L8 13.5384L10.6667 13.5384L10.6667 19.7265Z" fill="currentColor" />`;
    } else if (this.poweredNotCharging) {
      extraPath = svg`<path d="M13.25 4C13.6642 4 14 4.33579 14 4.75V7H14.5C15.0523 7 15.5 7.44772 15.5 8V10.9297C15.5 11.1159 15.4713 11.2978 15.4219 11.4727C15.4128 11.5046 15.4022 11.536 15.3916 11.5674C15.3776 11.6089 15.3633 11.65 15.3467 11.6904C15.3321 11.7259 15.3155 11.7604 15.2988 11.7949C15.2816 11.8308 15.2645 11.8666 15.2451 11.9014C15.2218 11.9432 15.1962 11.9834 15.1699 12.0234C15.1552 12.0459 15.1416 12.069 15.126 12.0908C15.0932 12.1367 15.0581 12.1806 15.0215 12.2236C15.0043 12.2439 14.9878 12.2646 14.9697 12.2842C14.9624 12.2921 14.9547 12.2998 14.9473 12.3076C14.8462 12.4137 14.734 12.5107 14.6094 12.5938L12.5 14V19H10.5V14L8.39062 12.5938C8.26585 12.5106 8.15292 12.4139 8.05176 12.3076C8.04429 12.2998 8.03663 12.2921 8.0293 12.2842C8.01142 12.2648 7.99557 12.2437 7.97852 12.2236C7.94178 12.1804 7.90587 12.1368 7.87305 12.0908C7.85745 12.069 7.84379 12.0459 7.8291 12.0234C7.80288 11.9834 7.77717 11.9432 7.75391 11.9014C7.73456 11.8666 7.71744 11.8308 7.7002 11.7949C7.68358 11.7604 7.66696 11.7259 7.65234 11.6904C7.63571 11.65 7.6214 11.6089 7.60742 11.5674C7.59683 11.536 7.58618 11.5046 7.57715 11.4727C7.52779 11.2979 7.50001 11.1158 7.5 10.9297V8C7.5 7.44772 7.94772 7 8.5 7H9V4.75C9 4.33579 9.33579 4 9.75 4C10.1642 4 10.5 4.33579 10.5 4.75V7H12.5V4.75C12.5 4.33579 12.8358 4 13.25 4Z" fill="currentColor"/>`;
    } else if (this.notification) {
      extraPath = svg`<path d="M13 6H11V14H13V6Z" fill="currentColor"/>
      <circle cx="12" cy="17" r="1" fill="currentColor" />`;
    }

    let mask: TemplateResult | symbol = nothing;
    if (this.charging) {
      mask = svg`<defs><mask id="mask">
      <path d="M 6.6384 12.9091 L 9.3697 7 V 0 H 0 V 24 H 9.1667 V 15.0384 H 8 C 7.4883 15.0384 7.0119 14.7776 6.7363 14.3465 C 6.4606 13.9154 6.4237 13.3736 6.6384 12.9091 Z" fill="white" />
      <path d="M 16 8.9615 H 14.8333 V 0 H 24 V 24 H 14.6303 V 17 L 17.3616 11.0909 C 17.5763 10.6264 17.5394 10.0845 17.2637 9.6534 C 16.9881 9.2224 16.5117 8.9615 16 8.9615 Z" fill="white" />
    </mask></defs>`;
    } else if (this.poweredNotCharging) {
      mask = svg`<defs><mask id="mask">
      <path d="M 6.21 7 C 6.0759 7.3063 6 7.6441 6 8 V 10.9297 C 6 12.0999 6.5849 13.1927 7.5586 13.8418 L 9 14.8027 V 24 H 0 V 0 H 6.21 Z" fill="white" />
      <path d="M 16.79 0 H 24 V 24 H 14 V 14.8027 L 15.4414 13.8418 C 16.4151 13.1927 17 12.0999 17 10.9297 V 8 C 17 7.6441 16.9241 7.3063 16.79 7 Z" fill="white" />
    </mask></defs>`;
    } else if (this.notification) {
      mask = svg`<defs><mask id="mask">
      <path d="M 15 0 H 24 V 24 H 15 Z" fill="white" />
      <path d="M 0 0 H 9 V 24 H 0 Z" fill="white" />
    </mask></defs>`;
    }

    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${mask}
        <path
          mask=${ifDefined(mask !== nothing ? 'url(#mask)' : undefined)}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 9C2 7.89543 2.89543 7 4
        7H19C20.1046 7 21 7.89543 21 9V10H22C22.5523 10 23 10.4477 23 11V13C23
        13.5523 22.5523 14 22 14H21V15C21 16.1046 20.1046 17 19 17H4C2.89543 17
        2 16.1046 2 15V9Z${insidePath}"
          fill="currentColor"
        />
        ${extraPath}
      </svg>
    `;
  }

  private _renderVertical() {
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
    } else if (this.poweredNotCharging) {
      extraPath = svg`<path d="M20.25 11C20.6642 11 21 11.3358 21 11.75V14H21.5C22.0523 14 22.5 14.4477 22.5 15V17.0391C22.4999 17.6465 22.2234 18.2211 21.749 18.6006L20 20V22H17.5V20L15.751 18.6006C15.7385 18.5906 15.7271 18.5786 15.7148 18.5684C15.6721 18.5324 15.6301 18.4961 15.5908 18.457C15.5748 18.4411 15.5604 18.4237 15.5449 18.4072C15.5123 18.3725 15.4802 18.3376 15.4502 18.3008C15.4333 18.28 15.4174 18.2587 15.4014 18.2373C15.3744 18.2013 15.3487 18.1646 15.3242 18.127C15.3102 18.1053 15.2964 18.0836 15.2832 18.0615C15.2609 18.0242 15.2405 17.986 15.2207 17.9473C15.2069 17.9201 15.1933 17.893 15.1807 17.8652C15.1649 17.8305 15.1505 17.7953 15.1367 17.7598C15.1258 17.7315 15.1141 17.7036 15.1045 17.6748C15.0843 17.6146 15.0672 17.5533 15.0527 17.4912C15.0518 17.4873 15.0507 17.4834 15.0498 17.4795C15.0338 17.4088 15.0209 17.3372 15.0127 17.2646L15 17.0391V15C15 14.4477 15.4477 14 16 14H16.5V11.75C16.5 11.6886 16.5095 11.6294 16.5234 11.5723C16.5308 11.5422 16.5389 11.5128 16.5498 11.4844C16.5562 11.4675 16.5628 11.4508 16.5703 11.4346C16.5822 11.4092 16.5958 11.385 16.6104 11.3613C16.6185 11.3479 16.6258 11.3341 16.6348 11.3213C16.653 11.2953 16.674 11.2714 16.6953 11.248C16.7163 11.2249 16.739 11.204 16.7627 11.1836C16.7781 11.1704 16.7931 11.1565 16.8096 11.1445C16.8311 11.1288 16.8538 11.1149 16.877 11.1016C16.8872 11.0957 16.8977 11.0904 16.9082 11.085C17.011 11.032 17.1264 11 17.25 11C17.6642 11 18 11.3358 18 11.75V14H19.5V11.75C19.5 11.3358 19.8358 11 20.25 11Z" fill="currentColor"/>`;
    } else if (this.notification) {
      extraPath = svg`<path d="M16 11H18V18H16V11Z" fill="currentColor"/>
      <circle cx="17" cy="21" r="1" fill="currentColor" />`;
    }

    let mask: TemplateResult | symbol = nothing;
    if (this.charging) {
      mask = svg`<defs><mask id="mask">
      <path d="M 0 0 V 24 H 15.5 v -4 h -0.5 c -0.7105 0 -1.3677 -0.3769 -1.7264 -0.9903 c -0.3587 -0.6133 -0.3651 -1.3709 -0.0167 -1.9902 l 3.5642 -6.3364 c 0.0556 -0.0989 0.1154 -0.1916 0.1789 -0.2784 V 0 Z" fill="white" />
    </mask></defs>`;
    } else if (this.poweredNotCharging) {
      mask = svg`<defs><mask id="mask">
      <path d="M 24 0 V 9.0127 H 17 C 15.5984 9.1391 14.5 10.3155 14.5 11.75 V 12.4043 C 13.604 12.9232 13 13.8901 13 15 V 17.0391 C 13.0001 18.254 13.5523 19.4031 14.501 20.1621 L 15.5 20.9609 V 25 H 0 V 0 Z" fill="white" />
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
          mask=${ifDefined(mask !== nothing ? 'url(#mask)' : undefined)}
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
