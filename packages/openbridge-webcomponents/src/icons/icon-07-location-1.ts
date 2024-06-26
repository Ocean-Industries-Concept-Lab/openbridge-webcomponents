import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-location-1')
export class Obi07Location1 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.988 15.637C7.31267 17.5957 9.31667 19.7167 12 22C14.6833 19.7167 16.6877 17.5957 18.013 15.637C19.3377 13.679 20 11.8667 20 10.2C20 7.7 19.1957 5.70833 17.587 4.225C15.979 2.74167 14.1167 2 12 2C9.88333 2 8.021 2.74167 6.413 4.225C4.80433 5.70833 4 7.7 4 10.2C4 11.8667 4.66267 13.679 5.988 15.637ZM11.2562 15.079H13.0667V6.51255H11.5785L8.8187 8.70981L9.69174 9.79966L10.6761 9.00864C10.7933 8.91489 11.0023 8.71763 11.3031 8.41685L11.2738 9.30747L11.2562 10.1219V15.079Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.988 15.637C7.31267 17.5957 9.31667 19.7167 12 22C14.6833 19.7167 16.6877 17.5957 18.013 15.637C19.3377 13.679 20 11.8667 20 10.2C20 7.7 19.1957 5.70833 17.587 4.225C15.979 2.74167 14.1167 2 12 2C9.88333 2 8.021 2.74167 6.413 4.225C4.80433 5.70833 4 7.7 4 10.2C4 11.8667 4.66267 13.679 5.988 15.637ZM11.2562 15.079H13.0667V6.51255H11.5785L8.8187 8.70981L9.69174 9.79966L10.6761 9.00864C10.7933 8.91489 11.0023 8.71763 11.3031 8.41685L11.2738 9.30747L11.2562 10.1219V15.079Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-location-1': Obi07Location1;
  }
}
