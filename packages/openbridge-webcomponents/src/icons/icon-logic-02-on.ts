import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-logic-02-on')
export class ObiLogic02On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1L4 1L4 23L20 23L20 1ZM4 0C3.44772 0 3 0.447716 3 1L3 23C3 23.5523 3.44772 24 4 24L20 24C20.5523 24 21 23.5523 21 23L21 1C21 0.447715 20.5523 0 20 0L4 0Z" fill="currentColor"/>
<path d="M6.14881 14.408L10.1568 12.764L6.14881 10.904V9.5L11.9688 12.404V13.244L6.14881 15.812L6.14881 14.408Z" fill="currentColor"/>
<path d="M17.456 17H15.644L15.644 12.044C15.644 11.908 15.644 11.74 15.644 11.54C15.652 11.34 15.66 11.132 15.668 10.916C15.676 10.7 15.684 10.508 15.692 10.34C15.652 10.388 15.564 10.476 15.428 10.604C15.3 10.724 15.18 10.832 15.068 10.928L14.084 11.72L13.208 10.628L15.968 8.432H17.456L17.456 17Z" fill="currentColor"/>
<path d="M6.15 16L12 16L12 17H6.15V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1L20 1L20 23L4 23L4 1ZM10.1568 12.764L6.14881 14.408V15.812L11.9688 13.244V12.404L6.14881 9.5V10.904L10.1568 12.764ZM6.15 16L12 16V17H6.15L6.15 16ZM15.644 17H17.456V8.432H15.968L13.208 10.628L14.084 11.72L15.068 10.928C15.18 10.832 15.3 10.724 15.428 10.604C15.564 10.476 15.652 10.388 15.692 10.34C15.684 10.508 15.676 10.7 15.668 10.916C15.66 11.132 15.652 11.34 15.644 11.54V12.044V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1L4 1L4 23L20 23L20 1ZM4 0C3.44772 0 3 0.447716 3 1L3 23C3 23.5523 3.44772 24 4 24L20 24C20.5523 24 21 23.5523 21 23L21 1C21 0.447715 20.5523 0 20 0L4 0Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6.14881 14.408L10.1568 12.764L6.14881 10.904V9.5L11.9688 12.404V13.244L6.14881 15.812L6.14881 14.408Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M17.456 17H15.644L15.644 12.044C15.644 11.908 15.644 11.74 15.644 11.54C15.652 11.34 15.66 11.132 15.668 10.916C15.676 10.7 15.684 10.508 15.692 10.34C15.652 10.388 15.564 10.476 15.428 10.604C15.3 10.724 15.18 10.832 15.068 10.928L14.084 11.72L13.208 10.628L15.968 8.432H17.456L17.456 17Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6.15 16L12 16L12 17H6.15V16Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1L20 1L20 23L4 23L4 1ZM10.1568 12.764L6.14881 14.408V15.812L11.9688 13.244V12.404L6.14881 9.5V10.904L10.1568 12.764ZM6.15 16L12 16V17H6.15L6.15 16ZM15.644 17H17.456V8.432H15.968L13.208 10.628L14.084 11.72L15.068 10.928C15.18 10.832 15.3 10.724 15.428 10.604C15.564 10.476 15.652 10.388 15.692 10.34C15.684 10.508 15.676 10.7 15.668 10.916C15.66 11.132 15.652 11.34 15.644 11.54V12.044V17Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-logic-02-on': ObiLogic02On;
  }
}