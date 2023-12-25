import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-rotate')
export class Obi10Rotate extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6.49146V10L18 5.5L12 1V4C10.22 4 8.47991 4.52784 6.99987 5.51677C5.51983 6.50571 4.36628 7.91131 3.68509 9.55585C3.0039 11.2004 2.82567 13.01 3.17294 14.7558C3.5202 16.5016 4.37737 18.1053 5.63604 19.364C6.89472 20.6226 8.49836 21.4798 10.2442 21.8271C11.99 22.1743 13.7996 21.9961 15.4442 21.3149C17.0887 20.6337 18.4943 19.4802 19.4832 18.0001C20.4722 16.5201 21 14.78 21 13H18.5085C18.5085 14.2873 18.1268 15.5456 17.4117 16.616C16.6965 17.6863 15.68 18.5205 14.4907 19.0131C13.3014 19.5057 11.9928 19.6346 10.7303 19.3835C9.46772 19.1323 8.30801 18.5125 7.39777 17.6022C6.48753 16.692 5.86766 15.5323 5.61652 14.2698C5.36539 13.0072 5.49428 11.6986 5.9869 10.5093C6.47951 9.32001 7.31373 8.30351 8.38405 7.58835C9.45438 6.87318 10.7127 6.49146 12 6.49146Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6.49146V10L18 5.5L12 1V4C10.22 4 8.47991 4.52784 6.99987 5.51677C5.51983 6.50571 4.36628 7.91131 3.68509 9.55585C3.0039 11.2004 2.82567 13.01 3.17294 14.7558C3.5202 16.5016 4.37737 18.1053 5.63604 19.364C6.89472 20.6226 8.49836 21.4798 10.2442 21.8271C11.99 22.1743 13.7996 21.9961 15.4442 21.3149C17.0887 20.6337 18.4943 19.4802 19.4832 18.0001C20.4722 16.5201 21 14.78 21 13H18.5085C18.5085 14.2873 18.1268 15.5456 17.4117 16.616C16.6965 17.6863 15.68 18.5205 14.4907 19.0131C13.3014 19.5057 11.9928 19.6346 10.7303 19.3835C9.46772 19.1323 8.30801 18.5125 7.39777 17.6022C6.48753 16.692 5.86766 15.5323 5.61652 14.2698C5.36539 13.0072 5.49428 11.6986 5.9869 10.5093C6.47951 9.32001 7.31373 8.30351 8.38405 7.58835C9.45438 6.87318 10.7127 6.49146 12 6.49146Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-rotate': Obi10Rotate;
  }
}
