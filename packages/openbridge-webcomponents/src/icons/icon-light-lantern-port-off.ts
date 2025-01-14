import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-port-off')
export class ObiLightLanternPortOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00015 9.82745L2.39453 4.22183L3.80874 2.80762L22.1935 21.1924L21.8345 21.5514C21.7602 21.6637 21.6638 21.76 21.5515 21.8344L20.7793 22.6066L20.1727 22H8.00015V20H18.1727L16.1659 17.9932C16.1113 17.9977 16.056 18 16.0002 18H10.0002C8.89558 18 8.00015 17.1046 8.00015 16V9.82745ZM14.1727 16H10.0002V11.8275L14.1727 16Z" fill="currentColor"/>
<path d="M16.0002 8V12.1709L18.0002 14.1709V8C18.0002 6.89543 17.1047 6 16.0002 6H10.0002C9.94485 6 9.89007 6.00224 9.8359 6.00665L11.8293 8H16.0002Z" fill="currentColor"/>
<path d="M20.0002 16.1709L22.0002 18.1709V2H20.0002V16.1709Z" fill="currentColor"/>
<path d="M18.0002 2H8.00015V4H17.0002C17.5524 4 18.0002 3.55228 18.0002 3V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00015 9.82745L2.39453 4.22183L3.80874 2.80762L22.1935 21.1924L21.8345 21.5514C21.7602 21.6637 21.6638 21.76 21.5515 21.8344L20.7793 22.6066L20.1727 22H8.00015V20H18.1727L16.1659 17.9932C16.1113 17.9977 16.056 18 16.0002 18H10.0002C8.89558 18 8.00015 17.1046 8.00015 16V9.82745ZM14.1727 16H10.0002V11.8275L14.1727 16Z" style="fill: var(--element-active-color)"/>
<path d="M16.0002 8V12.1709L18.0002 14.1709V8C18.0002 6.89543 17.1047 6 16.0002 6H10.0002C9.94485 6 9.89007 6.00224 9.8359 6.00665L11.8293 8H16.0002Z" style="fill: var(--element-active-color)"/>
<path d="M20.0002 16.1709L22.0002 18.1709V2H20.0002V16.1709Z" style="fill: var(--element-active-color)"/>
<path d="M18.0002 2H8.00015V4H17.0002C17.5524 4 18.0002 3.55228 18.0002 3V2Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-lantern-port-off': ObiLightLanternPortOff;
  }
}