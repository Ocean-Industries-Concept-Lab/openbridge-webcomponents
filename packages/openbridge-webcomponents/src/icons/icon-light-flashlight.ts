import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-flashlight')
export class ObiLightFlashlight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V4H13V1H11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" fill="currentColor"/>
<path d="M19.3658 2.9737L17.8658 5.57178L16.1338 4.57178L17.6338 1.9737L19.3658 2.9737Z" fill="currentColor"/>
<path d="M7.86584 4.57178L6.36584 1.9737L4.63379 2.9737L6.13379 5.57178L7.86584 4.57178Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V4H13V1H11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" style="fill: var(--element-active-color)"/>
<path d="M19.3658 2.9737L17.8658 5.57178L16.1338 4.57178L17.6338 1.9737L19.3658 2.9737Z" style="fill: var(--element-active-color)"/>
<path d="M7.86584 4.57178L6.36584 1.9737L4.63379 2.9737L6.13379 5.57178L7.86584 4.57178Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-flashlight': ObiLightFlashlight;
  }
}
