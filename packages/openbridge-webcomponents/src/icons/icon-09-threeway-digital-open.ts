import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-threeway-digital-open')
export class Obi09ThreewayDigitalOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L17.6382 15.8191L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="currentColor"/>
<path d="M13 9.76224L16.3811 3H7.61719L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L21 16.3819V7.61792L14.2358 11H13V9.76224Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L17.6382 15.8191L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M13 9.76224L16.3811 3H7.61719L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L21 16.3819V7.61792L14.2358 11H13V9.76224Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-09-threeway-digital-open': Obi09ThreewayDigitalOpen;
  }
}
