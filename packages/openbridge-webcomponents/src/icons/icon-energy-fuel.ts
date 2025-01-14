import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-energy-fuel')
export class ObiEnergyFuel extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 2.29297L20.1213 5.70718C20.6839 6.26979 21 7.03285 21 7.8285V18.2501C21 19.7689 19.7688 21.0001 18.25 21.0001C16.7312 21.0001 15.5 19.7689 15.5 18.2501V15.0001C15.5 14.4478 15.0523 14.0001 14.5 14.0001H14V21H4V5C4 4.45 4.19583 3.97917 4.5875 3.5875C4.97917 3.19583 5.45 3 6 3H12C12.55 3 13.0208 3.19583 13.4125 3.5875C13.8042 3.97917 14 4.45 14 5V12.0001H14.5C16.1569 12.0001 17.5 13.3432 17.5 15.0001V18.2501C17.5 18.6643 17.8358 19.0001 18.25 19.0001C18.6642 19.0001 19 18.6643 19 18.2501V10.45C18.8384 10.4828 18.6712 10.5 18.5 10.5C17.1193 10.5 16 9.38071 16 8C16 7.02989 16.5526 6.18884 17.3601 5.7744L15.2929 3.70718L16.7071 2.29297ZM6 10H12V5H6V10ZM6 19H12V12H6V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 2.29297L20.1213 5.70718C20.6839 6.26979 21 7.03285 21 7.8285V18.2501C21 19.7689 19.7688 21.0001 18.25 21.0001C16.7312 21.0001 15.5 19.7689 15.5 18.2501V15.0001C15.5 14.4478 15.0523 14.0001 14.5 14.0001H14V21H4V5C4 4.45 4.19583 3.97917 4.5875 3.5875C4.97917 3.19583 5.45 3 6 3H12C12.55 3 13.0208 3.19583 13.4125 3.5875C13.8042 3.97917 14 4.45 14 5V12.0001H14.5C16.1569 12.0001 17.5 13.3432 17.5 15.0001V18.2501C17.5 18.6643 17.8358 19.0001 18.25 19.0001C18.6642 19.0001 19 18.6643 19 18.2501V10.45C18.8384 10.4828 18.6712 10.5 18.5 10.5C17.1193 10.5 16 9.38071 16 8C16 7.02989 16.5526 6.18884 17.3601 5.7744L15.2929 3.70718L16.7071 2.29297ZM6 10H12V5H6V10ZM6 19H12V12H6V19Z" fill="currentColor"/>
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
    'obi-energy-fuel': ObiEnergyFuel;
  }
}