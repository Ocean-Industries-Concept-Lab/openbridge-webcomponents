import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-roof-off')
export class ObiLightRoofOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58509 9.41251L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L14.5875 17.4149C13.8041 17.79 12.9266 18 12 18C8.68632 18 6.00003 15.3137 6.00003 12C6.00003 11.0734 6.21005 10.1959 6.58509 9.41251ZM13.0369 15.8643C12.7062 15.9528 12.3586 16 12 16C9.79089 16 8.00003 14.2091 8.00003 12C8.00003 11.6415 8.04713 11.2939 8.13561 10.963L13.0369 15.8643Z" fill="currentColor"/>
<path d="M16 12C16 12.3581 15.953 12.7053 15.8647 13.0356L17.4155 14.5864C17.7902 13.8032 18 12.9261 18 12C18 9.77915 16.7934 7.84012 15 6.80269V5H17V2H7.00003V4.1709L7.82913 5H9.00003V6.1709L10.8641 8.03493L11 7.95628V5H13V7.95628L13.9986 8.53391C15.1994 9.22854 16 10.522 16 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58509 9.41251L1.39441 4.22183L2.80862 2.80762L21.1934 21.1924L19.7792 22.6066L14.5875 17.4149C13.8041 17.79 12.9266 18 12 18C8.68632 18 6.00003 15.3137 6.00003 12C6.00003 11.0734 6.21005 10.1959 6.58509 9.41251ZM13.0369 15.8643C12.7062 15.9528 12.3586 16 12 16C9.79089 16 8.00003 14.2091 8.00003 12C8.00003 11.6415 8.04713 11.2939 8.13561 10.963L13.0369 15.8643Z" style="fill: var(--element-active-color)"/>
<path d="M16 12C16 12.3581 15.953 12.7053 15.8647 13.0356L17.4155 14.5864C17.7902 13.8032 18 12.9261 18 12C18 9.77915 16.7934 7.84012 15 6.80269V5H17V2H7.00003V4.1709L7.82913 5H9.00003V6.1709L10.8641 8.03493L11 7.95628V5H13V7.95628L13.9986 8.53391C15.1994 9.22854 16 10.522 16 12Z" style="fill: var(--element-active-color)"/>
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