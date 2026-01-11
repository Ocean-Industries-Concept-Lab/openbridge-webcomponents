import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-motor-boat-filled')
export class ObiVesselTypeMotorBoatFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 21H6.54546L6.21132 11.9572C6.07765 8.33964 7.58421 4.85506 10.3112 2.47431L12 1L13.6888 2.47431C16.4158 4.85505 17.9223 8.33964 17.7887 11.9572L17.4545 21H14V22C14 22.5523 13.5523 23 13 23H11C10.4477 23 10 22.5523 10 22V21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 21H6.54546L6.21132 11.9572C6.07765 8.33964 7.58421 4.85506 10.3112 2.47431L12 1L13.6888 2.47431C16.4158 4.85505 17.9223 8.33964 17.7887 11.9572L17.4545 21H14V22C14 22.5523 13.5523 23 13 23H11C10.4477 23 10 22.5523 10 22V21ZM11.2977 3.60429L12 2.99119L12.7023 3.60429C15.0884 5.68744 16.4067 8.73645 16.2897 11.9018L16.0089 19.5H14V18C14 17.4477 13.5523 17 13 17H11C10.4477 17 10 17.4477 10 18V19.5H7.99105L7.7103 11.9018C7.59334 8.73645 8.91158 5.68744 11.2977 3.60429Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 21H6.54546L6.21132 11.9572C6.07765 8.33964 7.58421 4.85506 10.3112 2.47431L12 1L13.6888 2.47431C16.4158 4.85505 17.9223 8.33964 17.7887 11.9572L17.4545 21H14V22C14 22.5523 13.5523 23 13 23H11C10.4477 23 10 22.5523 10 22V21Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 21H6.54546L6.21132 11.9572C6.07765 8.33964 7.58421 4.85506 10.3112 2.47431L12 1L13.6888 2.47431C16.4158 4.85505 17.9223 8.33964 17.7887 11.9572L17.4545 21H14V22C14 22.5523 13.5523 23 13 23H11C10.4477 23 10 22.5523 10 22V21ZM11.2977 3.60429L12 2.99119L12.7023 3.60429C15.0884 5.68744 16.4067 8.73645 16.2897 11.9018L16.0089 19.5H14V18C14 17.4477 13.5523 17 13 17H11C10.4477 17 10 17.4477 10 18V19.5H7.99105L7.7103 11.9018C7.59334 8.73645 8.91158 5.68744 11.2977 3.60429Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-motor-boat-filled': ObiVesselTypeMotorBoatFilled;
  }
}
