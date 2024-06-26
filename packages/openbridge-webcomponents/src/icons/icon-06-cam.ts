import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-cam')
export class Obi06Cam extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4305 13.652V14.7912H12.5695V13.652H11.4305Z" fill="currentColor"/>
<path d="M11.4305 9.09511V12.5127H12.5695V9.09511H11.4305Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM5.98879 16.5C5.61829 16.5 5.38287 16.1033 5.56029 15.778L11.5715 4.75444C11.7565 4.41519 12.2435 4.41519 12.4285 4.75444L18.4397 15.778C18.6171 16.1033 18.3817 16.5 18.0112 16.5H5.98879Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4305 13.652V14.7912H12.5695V13.652H11.4305Z" style="fill: var(--element-active-color)"/>
<path d="M11.4305 9.09511V12.5127H12.5695V9.09511H11.4305Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM5.98879 16.5C5.61829 16.5 5.38287 16.1033 5.56029 15.778L11.5715 4.75444C11.7565 4.41519 12.2435 4.41519 12.4285 4.75444L18.4397 15.778C18.6171 16.1033 18.3817 16.5 18.0112 16.5H5.98879Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-cam': Obi06Cam;
  }
}
