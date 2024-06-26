import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-digital-closed-left')
export class Obi09ThreewayDigitalClosedLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.191 2H6.80902C6.43732 2 6.19558 2.39116 6.3618 2.72361L10 10L2.72361 6.3618C2.39116 6.19558 2 6.43733 2 6.80902V17.191C2 17.5627 2.39116 17.8044 2.72361 17.6382L10 14H14L21.2764 17.6382C21.6088 17.8044 22 17.5627 22 17.191V6.80902C22 6.43733 21.6088 6.19558 21.2764 6.3618L14 10L17.6382 2.72361C17.8044 2.39116 17.5627 2 17.191 2Z" fill="currentColor"/>
<path d="M10 12.8819L3 16.3819V7.61792L10 11.1179V12.8819Z" fill="currentColor"/>
<path d="M7.61888 3L11 9.76224V13H14.2363L21 16.3819V7.61792L14.2358 11H13V9.76562L16.3828 3H7.61888Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.191 2H6.80902C6.43732 2 6.19558 2.39116 6.3618 2.72361L10 10L2.72361 6.3618C2.39116 6.19558 2 6.43733 2 6.80902V17.191C2 17.5627 2.39116 17.8044 2.72361 17.6382L10 14H14L21.2764 17.6382C21.6088 17.8044 22 17.5627 22 17.191V6.80902C22 6.43733 21.6088 6.19558 21.2764 6.3618L14 10L17.6382 2.72361C17.8044 2.39116 17.5627 2 17.191 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10 12.8819L3 16.3819V7.61792L10 11.1179V12.8819Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M7.61888 3L11 9.76224V13H14.2363L21 16.3819V7.61792L14.2358 11H13V9.76562L16.3828 3H7.61888Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-09-threeway-digital-closed-left': Obi09ThreewayDigitalClosedLeft;
  }
}
