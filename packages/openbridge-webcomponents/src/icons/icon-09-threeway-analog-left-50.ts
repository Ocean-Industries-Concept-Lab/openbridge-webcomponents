import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-left-50')
export class Obi09ThreewayAnalogLeft50 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M18.9995 15.3816L21 16.3819V7.61792L18.9995 8.61816V15.3816Z" fill="currentColor"/>
<path d="M16.3811 3L15.3811 5H8.61719L7.61719 3H16.3811Z" fill="currentColor"/>
<path d="M9.11719 6L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L18 14.8819V9.11792L14.2358 11H13V9.76224L14.8811 6H9.11719Z" fill="currentColor"/>
<path d="M9.87894 20.4143C9.68368 20.6095 9.68368 20.9261 9.87894 21.1214C10.0742 21.3166 10.3908 21.3166 10.5861 21.1214L14.1216 17.5858C14.3168 17.3906 14.3168 17.074 14.1216 16.8787C13.9263 16.6835 13.6097 16.6835 13.4145 16.8787L9.87894 20.4143Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2932 21.8285L14.8287 18.2929C15.4145 17.7072 15.4145 16.7574 14.8287 16.1716C14.2429 15.5858 13.2932 15.5858 12.7074 16.1716L9.17184 19.7072C8.58605 20.2929 8.58605 21.2427 9.17184 21.8285C9.75762 22.4143 10.7074 22.4143 11.2932 21.8285ZM10.5861 21.1214L14.1216 17.5858C14.3168 17.3906 14.3168 17.074 14.1216 16.8787C13.9263 16.6835 13.6097 16.6835 13.4145 16.8787L9.87894 20.4143C9.68368 20.6095 9.68368 20.9261 9.87894 21.1214C10.0742 21.3166 10.3908 21.3166 10.5861 21.1214Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M18.9995 15.3816L21 16.3819V7.61792L18.9995 8.61816V15.3816Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M16.3811 3L15.3811 5H8.61719L7.61719 3H16.3811Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9.11719 6L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L18 14.8819V9.11792L14.2358 11H13V9.76224L14.8811 6H9.11719Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.87894 20.4143C9.68368 20.6095 9.68368 20.9261 9.87894 21.1214C10.0742 21.3166 10.3908 21.3166 10.5861 21.1214L14.1216 17.5858C14.3168 17.3906 14.3168 17.074 14.1216 16.8787C13.9263 16.6835 13.6097 16.6835 13.4145 16.8787L9.87894 20.4143Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2932 21.8285L14.8287 18.2929C15.4145 17.7072 15.4145 16.7574 14.8287 16.1716C14.2429 15.5858 13.2932 15.5858 12.7074 16.1716L9.17184 19.7072C8.58605 20.2929 8.58605 21.2427 9.17184 21.8285C9.75762 22.4143 10.7074 22.4143 11.2932 21.8285ZM10.5861 21.1214L14.1216 17.5858C14.3168 17.3906 14.3168 17.074 14.1216 16.8787C13.9263 16.6835 13.6097 16.6835 13.4145 16.8787L9.87894 20.4143C9.68368 20.6095 9.68368 20.9261 9.87894 21.1214C10.0742 21.3166 10.3908 21.3166 10.5861 21.1214Z" style="fill: var(--automation-device-tertiary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-threeway-analog-left-50': Obi09ThreewayAnalogLeft50;
  }
}
