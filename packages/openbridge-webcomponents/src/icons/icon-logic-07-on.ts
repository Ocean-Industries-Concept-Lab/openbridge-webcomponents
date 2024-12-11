import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-logic-07-on')
export class ObiLogic07On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5224 17H11.7104L11.7104 12.044C11.7104 11.908 11.7104 11.74 11.7104 11.54C11.7184 11.34 11.7264 11.132 11.7344 10.916C11.7424 10.7 11.7504 10.508 11.7584 10.34C11.7184 10.388 11.6304 10.476 11.4944 10.604C11.3664 10.724 11.2464 10.832 11.1344 10.928L10.1504 11.72L9.27441 10.628L12.0344 8.432H13.5224L13.5224 17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 14.45V23C21 23.5523 20.5523 24 20 24L4 24C3.44772 24 3 23.5523 3 23L3 1C3 0.447716 3.44772 0 4 0L20 0C20.5523 0 21 0.447715 21 1V9.55001C21.1616 9.51721 21.3288 9.5 21.5 9.5C22.8807 9.5 24 10.6193 24 12C24 13.3807 22.8807 14.5 21.5 14.5C21.3288 14.5 21.1616 14.4828 21 14.45ZM4 1L20 1V9.99982C19.3928 10.4559 19 11.1821 19 12C19 12.8179 19.3928 13.5441 20 14.0002V23L4 23L4 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1L4 1L4 23L20 23V14.0002C19.3928 13.5441 19 12.8179 19 12C19 11.1821 19.3928 10.4559 20 9.99982V1ZM11.7104 17H13.5224V8.432L12.0344 8.432L9.27441 10.628L10.1504 11.72L11.1344 10.928C11.2464 10.832 11.3664 10.724 11.4944 10.604C11.6304 10.476 11.7184 10.388 11.7584 10.34C11.7504 10.508 11.7424 10.7 11.7344 10.916C11.7264 11.132 11.7184 11.34 11.7104 11.54V12.044L11.7104 17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5224 17H11.7104L11.7104 12.044C11.7104 11.908 11.7104 11.74 11.7104 11.54C11.7184 11.34 11.7264 11.132 11.7344 10.916C11.7424 10.7 11.7504 10.508 11.7584 10.34C11.7184 10.388 11.6304 10.476 11.4944 10.604C11.3664 10.724 11.2464 10.832 11.1344 10.928L10.1504 11.72L9.27441 10.628L12.0344 8.432H13.5224L13.5224 17Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 14.45V23C21 23.5523 20.5523 24 20 24L4 24C3.44772 24 3 23.5523 3 23L3 1C3 0.447716 3.44772 0 4 0L20 0C20.5523 0 21 0.447715 21 1V9.55001C21.1616 9.51721 21.3288 9.5 21.5 9.5C22.8807 9.5 24 10.6193 24 12C24 13.3807 22.8807 14.5 21.5 14.5C21.3288 14.5 21.1616 14.4828 21 14.45ZM4 1L20 1V9.99982C19.3928 10.4559 19 11.1821 19 12C19 12.8179 19.3928 13.5441 20 14.0002V23L4 23L4 1Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 1L4 1L4 23L20 23V14.0002C19.3928 13.5441 19 12.8179 19 12C19 11.1821 19.3928 10.4559 20 9.99982V1ZM11.7104 17H13.5224V8.432L12.0344 8.432L9.27441 10.628L10.1504 11.72L11.1344 10.928C11.2464 10.832 11.3664 10.724 11.4944 10.604C11.6304 10.476 11.7184 10.388 11.7584 10.34C11.7504 10.508 11.7424 10.7 11.7344 10.916C11.7264 11.132 11.7184 11.34 11.7104 11.54V12.044L11.7104 17Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-logic-07-on': ObiLogic07On;
  }
}
