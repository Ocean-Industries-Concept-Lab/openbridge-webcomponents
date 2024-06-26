import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-mute')
export class Obi14Mute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34018 2.93018L2.93018 4.34018L7.29018 8.70018L7.00018 9.00018H3.00018V15.0002H7.00018L12.0002 20.0002V13.4102L16.1802 17.5902C15.5302 18.0802 14.8002 18.4702 14.0002 18.7002V20.7602C15.3402 20.4602 16.5702 19.8402 17.6102 19.0102L19.6602 21.0602L21.0702 19.6502L4.34018 2.93018ZM19.0002 12.0002C19.0002 12.8202 18.8502 13.6102 18.5902 14.3402L20.1202 15.8702C20.6802 14.7002 21.0002 13.3902 21.0002 12.0002C21.0002 7.72018 18.0102 4.14018 14.0002 3.23018V5.29018C16.8902 6.15018 19.0002 8.83018 19.0002 12.0002ZM12.0002 4.00018L10.1202 5.88018L12.0002 7.76018V4.00018ZM16.5002 12.0002C16.5002 10.2302 15.4802 8.71018 14.0002 7.97018V9.76017L16.4802 12.2402C16.4902 12.1602 16.5002 12.0802 16.5002 12.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.34018 2.93018L2.93018 4.34018L7.29018 8.70018L7.00018 9.00018H3.00018V15.0002H7.00018L12.0002 20.0002V13.4102L16.1802 17.5902C15.5302 18.0802 14.8002 18.4702 14.0002 18.7002V20.7602C15.3402 20.4602 16.5702 19.8402 17.6102 19.0102L19.6602 21.0602L21.0702 19.6502L4.34018 2.93018ZM19.0002 12.0002C19.0002 12.8202 18.8502 13.6102 18.5902 14.3402L20.1202 15.8702C20.6802 14.7002 21.0002 13.3902 21.0002 12.0002C21.0002 7.72018 18.0102 4.14018 14.0002 3.23018V5.29018C16.8902 6.15018 19.0002 8.83018 19.0002 12.0002ZM12.0002 4.00018L10.1202 5.88018L12.0002 7.76018V4.00018ZM16.5002 12.0002C16.5002 10.2302 15.4802 8.71018 14.0002 7.97018V9.76017L16.4802 12.2402C16.4902 12.1602 16.5002 12.0802 16.5002 12.0002Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-mute': Obi14Mute;
  }
}
