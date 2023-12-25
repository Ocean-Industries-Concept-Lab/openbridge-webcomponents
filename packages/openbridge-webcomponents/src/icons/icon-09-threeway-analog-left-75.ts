import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-left-75')
export class Obi09ThreewayAnalogLeft75 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M19.9995 15.8816L21 16.3819V7.61792L19.9995 8.11816V15.8816Z" fill="currentColor"/>
<path d="M16.3811 3L14.8811 6H9.11719L7.61719 3H16.3811Z" fill="currentColor"/>
<path d="M9.61719 7L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L19 15.3819V8.61792L14.2358 11H13V9.76224L14.3811 7H9.61719Z" fill="currentColor"/>
<path d="M9.49905 19.4949C9.24393 19.6006 9.12278 19.8931 9.22845 20.1482C9.33413 20.4033 9.62661 20.5245 9.88173 20.4188L14.5011 18.5054C14.7563 18.3997 14.8774 18.1072 14.7717 17.8521C14.6661 17.597 14.3736 17.4758 14.1184 17.5815L9.49905 19.4949Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2644 21.3427L14.8838 19.4293C15.6492 19.1123 16.0126 18.2348 15.6956 17.4694C15.3786 16.7041 14.5011 16.3406 13.7358 16.6576L9.11637 18.5711C8.351 18.8881 7.98755 19.7655 8.30457 20.5309C8.6216 21.2963 9.49905 21.6597 10.2644 21.3427ZM9.88173 20.4188L14.5011 18.5054C14.7563 18.3997 14.8774 18.1072 14.7717 17.8521C14.6661 17.597 14.3736 17.4758 14.1184 17.5815L9.49905 19.4949C9.24393 19.6006 9.12278 19.8931 9.22845 20.1482C9.33413 20.4033 9.62661 20.5245 9.88173 20.4188Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19.9995 15.8816L21 16.3819V7.61792L19.9995 8.11816V15.8816Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M16.3811 3L14.8811 6H9.11719L7.61719 3H16.3811Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9.61719 7L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L19 15.3819V8.61792L14.2358 11H13V9.76224L14.3811 7H9.61719Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.49905 19.4949C9.24393 19.6006 9.12278 19.8931 9.22845 20.1482C9.33413 20.4033 9.62661 20.5245 9.88173 20.4188L14.5011 18.5054C14.7563 18.3997 14.8774 18.1072 14.7717 17.8521C14.6661 17.597 14.3736 17.4758 14.1184 17.5815L9.49905 19.4949Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2644 21.3427L14.8838 19.4293C15.6492 19.1123 16.0126 18.2348 15.6956 17.4694C15.3786 16.7041 14.5011 16.3406 13.7358 16.6576L9.11637 18.5711C8.351 18.8881 7.98755 19.7655 8.30457 20.5309C8.6216 21.2963 9.49905 21.6597 10.2644 21.3427ZM9.88173 20.4188L14.5011 18.5054C14.7563 18.3997 14.8774 18.1072 14.7717 17.8521C14.6661 17.597 14.3736 17.4758 14.1184 17.5815L9.49905 19.4949C9.24393 19.6006 9.12278 19.8931 9.22845 20.1482C9.33413 20.4033 9.62661 20.5245 9.88173 20.4188Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-left-75': Obi09ThreewayAnalogLeft75;
  }
}
