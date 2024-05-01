import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-analog-top-75')
export class Obi09ThreewayAnalogTop75 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M21 16.3819L18 14.8819V9.11792L21 7.61792V16.3819Z" fill="currentColor"/>
<path d="M4 8.1179L3 7.6179L3 16.3818L4 15.8818L4 8.1179Z" fill="currentColor"/>
<path d="M13 9.76224L16.3811 3H7.61719L11 9.76562V11H9.76416L5 8.61792L5 15.3819L9.7637 13H14.2363L17 14.3819V9.61792L14.2358 11H13V9.76224Z" fill="currentColor"/>
<path d="M9.4971 18.5053C9.24197 18.3996 9.12082 18.1071 9.2265 17.852C9.33217 17.5969 9.62466 17.4758 9.87978 17.5814L14.4992 19.4948C14.7543 19.6005 14.8755 19.893 14.7698 20.1481C14.6641 20.4032 14.3716 20.5244 14.1165 20.4187L9.4971 18.5053Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2625 16.6575L14.8819 18.571C15.6472 18.888 16.0107 19.7654 15.6937 20.5308C15.3766 21.2962 14.4992 21.6596 13.7338 21.3426L9.11441 19.4292C8.34905 19.1122 7.98559 18.2347 8.30262 17.4693C8.61964 16.704 9.4971 16.3405 10.2625 16.6575ZM9.87978 17.5814L14.4992 19.4948C14.7543 19.6005 14.8755 19.893 14.7698 20.1481C14.6641 20.4032 14.3716 20.5244 14.1165 20.4187L9.4971 18.5053C9.24197 18.3996 9.12082 18.1071 9.2265 17.852C9.33217 17.5969 9.62466 17.4758 9.87978 17.5814Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M21 16.3819L18 14.8819V9.11792L21 7.61792V16.3819Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M4 8.1179L3 7.6179L3 16.3818L4 15.8818L4 8.1179Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M13 9.76224L16.3811 3H7.61719L11 9.76562V11H9.76416L5 8.61792L5 15.3819L9.7637 13H14.2363L17 14.3819V9.61792L14.2358 11H13V9.76224Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.4971 18.5053C9.24197 18.3996 9.12082 18.1071 9.2265 17.852C9.33217 17.5969 9.62466 17.4758 9.87978 17.5814L14.4992 19.4948C14.7543 19.6005 14.8755 19.893 14.7698 20.1481C14.6641 20.4032 14.3716 20.5244 14.1165 20.4187L9.4971 18.5053Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2625 16.6575L14.8819 18.571C15.6472 18.888 16.0107 19.7654 15.6937 20.5308C15.3766 21.2962 14.4992 21.6596 13.7338 21.3426L9.11441 19.4292C8.34905 19.1122 7.98559 18.2347 8.30262 17.4693C8.61964 16.704 9.4971 16.3405 10.2625 16.6575ZM9.87978 17.5814L14.4992 19.4948C14.7543 19.6005 14.8755 19.893 14.7698 20.1481C14.6641 20.4032 14.3716 20.5244 14.1165 20.4187L9.4971 18.5053C9.24197 18.3996 9.12082 18.1071 9.2265 17.852C9.33217 17.5969 9.62466 17.4758 9.87978 17.5814Z" style="fill: var(--automation-device-tertiary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-threeway-analog-top-75': Obi09ThreewayAnalogTop75;
  }
}
