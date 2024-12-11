import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-direction')
export class ObiDuctDirection extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99916 6H0V18H6.99857L12.99 12L6.99916 6Z" fill="currentColor"/>
<path d="M12.6474 18H24V6H12.6474L18.6474 12L12.6474 18Z" fill="currentColor"/>
<path d="M7.99713 17L6.99857 18H0V17H7.99713Z" fill="currentColor"/>
<path d="M0 7H7.99764L6.99916 6H0V7Z" fill="currentColor"/>
<path d="M24 17H13.6474L12.6474 18H24V17Z" fill="currentColor"/>
<path d="M13.6474 7H24V6H12.6474L13.6474 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.99916 6H0V18H6.99857L12.99 12L6.99916 6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M12.6474 18H24V6H12.6474L18.6474 12L12.6474 18Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M7.99713 17L6.99857 18H0V17H7.99713Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M0 7H7.99764L6.99916 6H0V7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M24 17H13.6474L12.6474 18H24V17Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M13.6474 7H24V6H12.6474L13.6474 7Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.48979 6L14.4807 12L8.48926 18H11.3107L17.3107 12L11.3107 6H8.48979Z" style="fill: var(--element-active-color)"/>
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
    'obi-duct-direction': ObiDuctDirection;
  }
}