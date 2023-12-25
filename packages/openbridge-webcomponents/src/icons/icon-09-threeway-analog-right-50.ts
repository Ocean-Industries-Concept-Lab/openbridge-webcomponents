import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-right-50')
export class Obi09ThreewayAnalogRight50 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M5.00049 15.3816L3 16.3819V7.61792L5.00049 8.61816V15.3816Z" fill="currentColor"/>
<path d="M7.61888 3L8.61888 5H15.3828L16.3828 3H7.61888Z" fill="currentColor"/>
<path d="M14.8828 6L13 9.76562V11H14.2358L21 7.61792V16.3819L14.2363 13H9.7637L6 14.8819V9.11792L9.76416 11H11V9.76224L9.11888 6H14.8828Z" fill="currentColor"/>
<path d="M13.414 21.1213C13.6093 21.3166 13.9259 21.3166 14.1211 21.1213C14.3164 20.926 14.3164 20.6095 14.1211 20.4142L10.5856 16.8787C10.3903 16.6834 10.0738 16.6834 9.87849 16.8787C9.68323 17.0739 9.68323 17.3905 9.87849 17.5858L13.414 21.1213Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8282 19.7071L11.2927 16.1716C10.7069 15.5858 9.75717 15.5858 9.17138 16.1716C8.5856 16.7573 8.5856 17.7071 9.17138 18.2929L12.7069 21.8284C13.2927 22.4142 14.2425 22.4142 14.8282 21.8284C15.414 21.2426 15.414 20.2929 14.8282 19.7071ZM14.1211 20.4142L10.5856 16.8787C10.3903 16.6834 10.0738 16.6834 9.87849 16.8787C9.68323 17.0739 9.68323 17.3905 9.87849 17.5858L13.414 21.1213C13.6093 21.3166 13.9259 21.3166 14.1211 21.1213C14.3164 20.926 14.3164 20.6095 14.1211 20.4142Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M5.00049 15.3816L3 16.3819V7.61792L5.00049 8.61816V15.3816Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M7.61888 3L8.61888 5H15.3828L16.3828 3H7.61888Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14.8828 6L13 9.76562V11H14.2358L21 7.61792V16.3819L14.2363 13H9.7637L6 14.8819V9.11792L9.76416 11H11V9.76224L9.11888 6H14.8828Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M13.414 21.1213C13.6093 21.3166 13.9259 21.3166 14.1211 21.1213C14.3164 20.926 14.3164 20.6095 14.1211 20.4142L10.5856 16.8787C10.3903 16.6834 10.0738 16.6834 9.87849 16.8787C9.68323 17.0739 9.68323 17.3905 9.87849 17.5858L13.414 21.1213Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8282 19.7071L11.2927 16.1716C10.7069 15.5858 9.75717 15.5858 9.17138 16.1716C8.5856 16.7573 8.5856 17.7071 9.17138 18.2929L12.7069 21.8284C13.2927 22.4142 14.2425 22.4142 14.8282 21.8284C15.414 21.2426 15.414 20.2929 14.8282 19.7071ZM14.1211 20.4142L10.5856 16.8787C10.3903 16.6834 10.0738 16.6834 9.87849 16.8787C9.68323 17.0739 9.68323 17.3905 9.87849 17.5858L13.414 21.1213C13.6093 21.3166 13.9259 21.3166 14.1211 21.1213C14.3164 20.926 14.3164 20.6095 14.1211 20.4142Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-right-50': Obi09ThreewayAnalogRight50;
  }
}
