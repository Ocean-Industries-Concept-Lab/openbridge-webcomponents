import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-actuator-reference-static')
export class ObiActuatorReferenceStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 15" stroke-linecap="round" stroke="currentColor"/>
<path d="M12 0.5C16.1421 0.5 19.5 3.85786 19.5 8C19.5 12.1421 16.1421 15.5 12 15.5C7.85786 15.5 4.5 12.1421 4.5 8C4.5 3.85786 7.85786 0.5 12 0.5Z" fill="currentColor" stroke="currentColor"/>
<path d="M11.5 5.5H12.5V7.5H14.5V8.5H12.5V10.5H11.5V8.5H9.5V7.5H11.5V5.5Z" fill="currentColor"/>
<path d="M6.80607 7.25801L11.258 2.80607C11.6661 2.39798 12.3339 2.39798 12.742 2.80607L17.1939 7.25801C17.602 7.6661 17.602 8.3339 17.1939 8.74199L12.742 13.1939C12.3339 13.602 11.6661 13.602 11.258 13.1939L6.80607 8.74199C6.39798 8.3339 6.39798 7.6661 6.80607 7.25801ZM12 3.5L7.5 8L12 12.5L16.5 8L12 3.5Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 24L12 15" stroke-linecap="round" style="stroke: var(--automation-symbol-static-background-color)"/>
<path d="M12 0.5C16.1421 0.5 19.5 3.85786 19.5 8C19.5 12.1421 16.1421 15.5 12 15.5C7.85786 15.5 4.5 12.1421 4.5 8C4.5 3.85786 7.85786 0.5 12 0.5Z" style="fill: var(--automation-symbol-static-background-color); stroke: var(--automation-symbol-static-border-color)"/>
<path d="M11.5 5.5H12.5V7.5H14.5V8.5H12.5V10.5H11.5V8.5H9.5V7.5H11.5V5.5Z" style="fill: var(--automation-symbol-static-border-color)"/>
<path d="M6.80607 7.25801L11.258 2.80607C11.6661 2.39798 12.3339 2.39798 12.742 2.80607L17.1939 7.25801C17.602 7.6661 17.602 8.3339 17.1939 8.74199L12.742 13.1939C12.3339 13.602 11.6661 13.602 11.258 13.1939L6.80607 8.74199C6.39798 8.3339 6.39798 7.6661 6.80607 7.25801ZM12 3.5L7.5 8L12 12.5L16.5 8L12 3.5Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-static-border-color)"/>
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
    'obi-actuator-reference-static': ObiActuatorReferenceStatic;
  }
}
