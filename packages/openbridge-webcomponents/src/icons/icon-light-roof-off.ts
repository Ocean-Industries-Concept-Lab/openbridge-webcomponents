import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-roof-off')
export class ObiLightRoofOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58497 9.41251L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L14.5874 17.4149C13.804 17.79 12.9265 18 11.9999 18C8.6862 18 5.99991 15.3137 5.99991 12C5.99991 11.0734 6.20993 10.1959 6.58497 9.41251ZM13.0368 15.8643C12.7061 15.9528 12.3585 16 11.9999 16C9.79077 16 7.99991 14.2091 7.99991 12C7.99991 11.6415 8.047 11.2939 8.13549 10.963L13.0368 15.8643Z" fill="currentColor"/>
<path d="M15.9999 12C15.9999 12.3581 15.9528 12.7053 15.8646 13.0356L17.4154 14.5864C17.7901 13.8032 17.9999 12.9261 17.9999 12C17.9999 9.77915 16.7933 7.84012 14.9999 6.80269V5H16.9999V2H6.99991V4.1709L7.82901 5H8.99991V6.1709L10.8639 8.03493L10.9999 7.95628V5H12.9999V7.95628L13.9985 8.53391C15.1993 9.22854 15.9999 10.522 15.9999 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58497 9.41251L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L14.5874 17.4149C13.804 17.79 12.9265 18 11.9999 18C8.6862 18 5.99991 15.3137 5.99991 12C5.99991 11.0734 6.20993 10.1959 6.58497 9.41251ZM13.0368 15.8643C12.7061 15.9528 12.3585 16 11.9999 16C9.79077 16 7.99991 14.2091 7.99991 12C7.99991 11.6415 8.047 11.2939 8.13549 10.963L13.0368 15.8643Z" style="fill: var(--element-active-color)"/>
<path d="M15.9999 12C15.9999 12.3581 15.9528 12.7053 15.8646 13.0356L17.4154 14.5864C17.7901 13.8032 17.9999 12.9261 17.9999 12C17.9999 9.77915 16.7933 7.84012 14.9999 6.80269V5H16.9999V2H6.99991V4.1709L7.82901 5H8.99991V6.1709L10.8639 8.03493L10.9999 7.95628V5H12.9999V7.95628L13.9985 8.53391C15.1993 9.22854 15.9999 10.522 15.9999 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-roof-off': ObiLightRoofOff;
  }
}