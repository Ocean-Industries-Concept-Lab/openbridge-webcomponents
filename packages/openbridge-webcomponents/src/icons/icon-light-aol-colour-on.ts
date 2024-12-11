import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-aol-colour-on')
export class ObiLightAolColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 4V1H11V4H13Z" fill="currentColor"/>
<path d="M4 13H1V11H4V13Z" fill="currentColor"/>
<path d="M23 13H20V11H23V13Z" fill="currentColor"/>
<path d="M5.63687 7.05026L3.51555 4.92894L4.92976 3.51473L7.05108 5.63605L5.63687 7.05026Z" fill="currentColor"/>
<path d="M19.0719 3.51473L16.9506 5.63605L18.3648 7.05026L20.4861 4.92894L19.0719 3.51473Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 11V17H6V18L8.57143 21H15.4286L18 18V17H17V11C17 8.23858 14.7614 6 12 6C9.23858 6 7 8.23858 7 11ZM15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 4V1H11V4H13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M4 13H1V11H4V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M23 13H20V11H23V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M5.63687 7.05026L3.51555 4.92894L4.92976 3.51473L7.05108 5.63605L5.63687 7.05026Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19.0719 3.51473L16.9506 5.63605L18.3648 7.05026L20.4861 4.92894L19.0719 3.51473Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 11V17H6V18L8.57143 21H15.4286L18 18V17H17V11C17 8.23858 14.7614 6 12 6C9.23858 6 7 8.23858 7 11ZM15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17V11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11V17H15Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-aol-colour-on': ObiLightAolColourOn;
  }
}