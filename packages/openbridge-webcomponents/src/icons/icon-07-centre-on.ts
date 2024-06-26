import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-centre-on')
export class Obi07CentreOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 6V2H13V6H11Z" fill="currentColor"/>
<path d="M2 13H6L6 11H2V13Z" fill="currentColor"/>
<path d="M22 13H18V11H22V13Z" fill="currentColor"/>
<path d="M11 22V18H13V22H11Z" fill="currentColor"/>
<path d="M13.649 7.19031L13.6125 7.22705L4.37744 16.462L7.50244 19.587L16.7528 10.3367L16.7741 10.3154L16.7953 10.2942C16.8029 10.2865 16.8106 10.279 16.8182 10.2714C16.8295 10.2602 16.8407 10.249 16.8518 10.2377C18.5038 8.55042 19.4445 6.4386 19.6644 4.30005C17.5258 4.52002 15.4141 5.46069 13.7268 7.11267C13.7189 7.12047 13.7111 7.12835 13.7032 7.13624C13.6975 7.14206 13.6917 7.14788 13.6858 7.15369L13.649 7.19031Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 6V2H13V6H11Z" style="fill: var(--element-active-color)"/>
<path d="M2 13H6L6 11H2V13Z" style="fill: var(--element-active-color)"/>
<path d="M22 13H18V11H22V13Z" style="fill: var(--element-active-color)"/>
<path d="M11 22V18H13V22H11Z" style="fill: var(--element-active-color)"/>
<path d="M13.649 7.19031L13.6125 7.22705L4.37744 16.462L7.50244 19.587L16.7528 10.3367L16.7741 10.3154L16.7953 10.2942C16.8029 10.2865 16.8106 10.279 16.8182 10.2714C16.8295 10.2602 16.8407 10.249 16.8518 10.2377C18.5038 8.55042 19.4445 6.4386 19.6644 4.30005C17.5258 4.52002 15.4141 5.46069 13.7268 7.11267C13.7189 7.12047 13.7111 7.12835 13.7032 7.13624C13.6975 7.14206 13.6917 7.14788 13.6858 7.15369L13.649 7.19031Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-centre-on': Obi07CentreOn;
  }
}
