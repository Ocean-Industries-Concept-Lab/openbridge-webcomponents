import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-heat_pump_balance')
export class Obi08Heat_pump_balance extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 18.6C6.16667 18.6 5.45833 18.3083 4.875 17.725C4.29167 17.1417 4 16.4333 4 15.6V6.6H6V15.6C6 15.8833 6.09567 16.1207 6.287 16.312C6.479 16.504 6.71667 16.6 7 16.6C7.28333 16.6 7.521 16.504 7.713 16.312C7.90433 16.1207 8 15.8833 8 15.6V9.6C8 8.76667 8.29167 8.05833 8.875 7.475C9.45833 6.89167 10.1667 6.6 11 6.6C11.8333 6.6 12.5417 6.89167 13.125 7.475C13.7083 8.05833 14 8.76667 14 9.6V15.6C14 15.8833 14.096 16.1207 14.288 16.312C14.4793 16.504 14.7167 16.6 15 16.6C15.2833 16.6 15.521 16.504 15.713 16.312C15.9043 16.1207 16 15.8833 16 15.6V8.6C16 7.76667 16.2917 7.05833 16.875 6.475C17.4583 5.89167 18.1667 5.6 19 5.6H20.175L19 4.425L20.4 3L24 6.6L20.4 10.175L19 8.75L20.175 7.6H19C18.7167 7.6 18.4793 7.69567 18.288 7.887C18.096 8.079 18 8.31667 18 8.6V15.6C18 16.4333 17.7083 17.1417 17.125 17.725C16.5417 18.3083 15.8333 18.6 15 18.6C14.1667 18.6 13.4583 18.3083 12.875 17.725C12.2917 17.1417 12 16.4333 12 15.6V9.6C12 9.31667 11.9043 9.079 11.713 8.887C11.521 8.69567 11.2833 8.6 11 8.6C10.7167 8.6 10.4793 8.69567 10.288 8.887C10.096 9.079 10 9.31667 10 9.6V15.6C10 16.4333 9.70833 17.1417 9.125 17.725C8.54167 18.3083 7.83333 18.6 7 18.6ZM3 21.6C2.45 21.6 1.97933 21.4043 1.588 21.013C1.196 20.621 1 20.15 1 19.6V11.6H23V19.6C23 20.15 22.8043 20.621 22.413 21.013C22.021 21.4043 21.55 21.6 21 21.6H3ZM3 19.6H21V13.6H3V19.6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 18.6C6.16667 18.6 5.45833 18.3083 4.875 17.725C4.29167 17.1417 4 16.4333 4 15.6V6.6H6V15.6C6 15.8833 6.09567 16.1207 6.287 16.312C6.479 16.504 6.71667 16.6 7 16.6C7.28333 16.6 7.521 16.504 7.713 16.312C7.90433 16.1207 8 15.8833 8 15.6V9.6C8 8.76667 8.29167 8.05833 8.875 7.475C9.45833 6.89167 10.1667 6.6 11 6.6C11.8333 6.6 12.5417 6.89167 13.125 7.475C13.7083 8.05833 14 8.76667 14 9.6V15.6C14 15.8833 14.096 16.1207 14.288 16.312C14.4793 16.504 14.7167 16.6 15 16.6C15.2833 16.6 15.521 16.504 15.713 16.312C15.9043 16.1207 16 15.8833 16 15.6V8.6C16 7.76667 16.2917 7.05833 16.875 6.475C17.4583 5.89167 18.1667 5.6 19 5.6H20.175L19 4.425L20.4 3L24 6.6L20.4 10.175L19 8.75L20.175 7.6H19C18.7167 7.6 18.4793 7.69567 18.288 7.887C18.096 8.079 18 8.31667 18 8.6V15.6C18 16.4333 17.7083 17.1417 17.125 17.725C16.5417 18.3083 15.8333 18.6 15 18.6C14.1667 18.6 13.4583 18.3083 12.875 17.725C12.2917 17.1417 12 16.4333 12 15.6V9.6C12 9.31667 11.9043 9.079 11.713 8.887C11.521 8.69567 11.2833 8.6 11 8.6C10.7167 8.6 10.4793 8.69567 10.288 8.887C10.096 9.079 10 9.31667 10 9.6V15.6C10 16.4333 9.70833 17.1417 9.125 17.725C8.54167 18.3083 7.83333 18.6 7 18.6ZM3 21.6C2.45 21.6 1.97933 21.4043 1.588 21.013C1.196 20.621 1 20.15 1 19.6V11.6H23V19.6C23 20.15 22.8043 20.621 22.413 21.013C22.021 21.4043 21.55 21.6 21 21.6H3ZM3 19.6H21V13.6H3V19.6Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-heat_pump_balance': Obi08Heat_pump_balance;
  }
}