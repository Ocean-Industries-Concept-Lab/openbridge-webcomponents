import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-aol-colour-off')
export class ObiLightAolColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 11V17H6V18L8.57143 21H15.4286L18 18V17H17V11C17 8.23858 14.7614 6 12 6C9.23858 6 7 8.23858 7 11ZM15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 11V17H6V18L8.57143 21H15.4286L18 18V17H17V11C17 8.23858 14.7614 6 12 6C9.23858 6 7 8.23858 7 11ZM15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-light-aol-colour-off': ObiLightAolColourOff;
  }
}