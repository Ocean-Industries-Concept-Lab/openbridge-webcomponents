import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-communication')
export class ObiCommunication extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C10.3431 2 9 3.34315 9 5V11.5C9 13.1569 10.3431 14.5 12 14.5C13.6569 14.5 15 13.1569 15 11.5V5C15 3.34315 13.6569 2 12 2ZM13 11.5V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11.5C11 12.0523 11.4477 12.5 12 12.5C12.5523 12.5 13 12.0523 13 11.5Z" fill="currentColor"/>
<path d="M12 16C9.23858 16 7 13.7614 7 11H5C5 14.5265 7.60771 17.4439 11 17.9291V22H13V17.9291C16.3923 17.4439 19 14.5265 19 11H17C17 13.7614 14.7614 16 12 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C10.3431 2 9 3.34315 9 5V11.5C9 13.1569 10.3431 14.5 12 14.5C13.6569 14.5 15 13.1569 15 11.5V5C15 3.34315 13.6569 2 12 2ZM13 11.5V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11.5C11 12.0523 11.4477 12.5 12 12.5C12.5523 12.5 13 12.0523 13 11.5Z" style="fill: var(--element-active-color)"/>
<path d="M12 16C9.23858 16 7 13.7614 7 11H5C5 14.5265 7.60771 17.4439 11 17.9291V22H13V17.9291C16.3923 17.4439 19 14.5265 19 11H17C17 13.7614 14.7614 16 12 16Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-communication': ObiCommunication;
  }
}