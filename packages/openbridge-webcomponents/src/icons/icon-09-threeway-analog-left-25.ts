import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-left-25')
export class Obi09ThreewayAnalogLeft25 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M15.8811 4L16.3811 3H7.61719L8.11719 4H15.8811Z" fill="currentColor"/>
<path d="M18 14.8819L21 16.3819V7.61792L18 9.11792V14.8819Z" fill="currentColor"/>
<path d="M8.61719 5L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L17 14.3819V9.61792L14.2358 11H13V9.76224L15.3811 5H8.61719Z" fill="currentColor"/>
<path d="M10.58 21.1186C10.4743 21.3738 10.5955 21.6662 10.8506 21.7719C11.1057 21.8776 11.3982 21.7564 11.5039 21.5013L13.4173 16.8819C13.523 16.6268 13.4018 16.3343 13.1467 16.2286C12.8916 16.123 12.5991 16.2441 12.4934 16.4992L10.58 21.1186Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4278 21.884L14.3412 17.2646C14.6582 16.4992 14.2948 15.6218 13.5294 15.3048C12.764 14.9877 11.8866 15.3512 11.5696 16.1165L9.65613 20.7359C9.33911 21.5013 9.70256 22.3788 10.4679 22.6958C11.2333 23.0128 12.1107 22.6494 12.4278 21.884ZM11.5039 21.5013L13.4173 16.8819C13.523 16.6268 13.4018 16.3343 13.1467 16.2286C12.8916 16.123 12.5991 16.2441 12.4934 16.4992L10.58 21.1186C10.4743 21.3738 10.5955 21.6662 10.8506 21.7719C11.1057 21.8776 11.3982 21.7564 11.5039 21.5013Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M15.8811 4L16.3811 3H7.61719L8.11719 4H15.8811Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M18 14.8819L21 16.3819V7.61792L18 9.11792V14.8819Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M8.61719 5L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L17 14.3819V9.61792L14.2358 11H13V9.76224L15.3811 5H8.61719Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M10.58 21.1186C10.4743 21.3738 10.5955 21.6662 10.8506 21.7719C11.1057 21.8776 11.3982 21.7564 11.5039 21.5013L13.4173 16.8819C13.523 16.6268 13.4018 16.3343 13.1467 16.2286C12.8916 16.123 12.5991 16.2441 12.4934 16.4992L10.58 21.1186Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4278 21.884L14.3412 17.2646C14.6582 16.4992 14.2948 15.6218 13.5294 15.3048C12.764 14.9877 11.8866 15.3512 11.5696 16.1165L9.65613 20.7359C9.33911 21.5013 9.70256 22.3788 10.4679 22.6958C11.2333 23.0128 12.1107 22.6494 12.4278 21.884ZM11.5039 21.5013L13.4173 16.8819C13.523 16.6268 13.4018 16.3343 13.1467 16.2286C12.8916 16.123 12.5991 16.2441 12.4934 16.4992L10.58 21.1186C10.4743 21.3738 10.5955 21.6662 10.8506 21.7719C11.1057 21.8776 11.3982 21.7564 11.5039 21.5013Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-threeway-analog-left-25': Obi09ThreewayAnalogLeft25;
  }
}
