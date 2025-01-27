import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-logic-03-off')
export class ObiLogic03Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1H4V23H20V1ZM4 0C3.44772 0 3 0.447716 3 1V23C3 23.5523 3.44772 24 4 24H20C20.5523 24 21 23.5523 21 23V1C21 0.447715 20.5523 0 20 0H4Z" fill="currentColor"/>
<path d="M6.14881 12.272V11H11.9688V12.272H6.14881ZM6.14881 14.552V13.268H11.9688V14.552H6.14881Z" fill="currentColor"/>
<path d="M17.456 17H15.644V12.044C15.644 11.908 15.644 11.74 15.644 11.54C15.652 11.34 15.66 11.132 15.668 10.916C15.676 10.7 15.684 10.508 15.692 10.34C15.652 10.388 15.564 10.476 15.428 10.604C15.3 10.724 15.18 10.832 15.068 10.928L14.084 11.72L13.208 10.628L15.968 8.432H17.456V17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1H20V23H4V1ZM6.14881 11V12.272H11.9688V11H6.14881ZM6.14881 14.552V13.268H11.9688V14.552H6.14881ZM15.644 17H17.456V8.432H15.968L13.208 10.628L14.084 11.72L15.068 10.928C15.18 10.832 15.3 10.724 15.428 10.604C15.564 10.476 15.652 10.388 15.692 10.34C15.684 10.508 15.676 10.7 15.668 10.916C15.66 11.132 15.652 11.34 15.644 11.54V12.044V17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1H4V23H20V1ZM4 0C3.44772 0 3 0.447716 3 1V23C3 23.5523 3.44772 24 4 24H20C20.5523 24 21 23.5523 21 23V1C21 0.447715 20.5523 0 20 0H4Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M6.14881 12.272V11H11.9688V12.272H6.14881ZM6.14881 14.552V13.268H11.9688V14.552H6.14881Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M17.456 17H15.644V12.044C15.644 11.908 15.644 11.74 15.644 11.54C15.652 11.34 15.66 11.132 15.668 10.916C15.676 10.7 15.684 10.508 15.692 10.34C15.652 10.388 15.564 10.476 15.428 10.604C15.3 10.724 15.18 10.832 15.068 10.928L14.084 11.72L13.208 10.628L15.968 8.432H17.456V17Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1H20V23H4V1ZM6.14881 11V12.272H11.9688V11H6.14881ZM6.14881 14.552V13.268H11.9688V14.552H6.14881ZM15.644 17H17.456V8.432H15.968L13.208 10.628L14.084 11.72L15.068 10.928C15.18 10.832 15.3 10.724 15.428 10.604C15.564 10.476 15.652 10.388 15.692 10.34C15.684 10.508 15.676 10.7 15.668 10.916C15.66 11.132 15.652 11.34 15.644 11.54V12.044V17Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-logic-03-off': ObiLogic03Off;
  }
}
