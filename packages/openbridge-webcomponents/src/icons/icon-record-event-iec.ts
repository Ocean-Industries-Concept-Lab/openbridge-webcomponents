import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-record-event-iec')
export class ObiRecordEventIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9575 2.00014H2V22.0001H21V7.26619L19.5 9.86427V14.2501H9.75V9.75014H11.483L12.349 8.25014H9.75V3.50014H15.0914L15.9575 2.00014ZM8.25 9.75014V14.2501H3.5V9.75014H8.25ZM8.25 15.7501H3.5V20.5001H8.25V15.7501ZM19.5 15.7501H9.75V20.5001H19.5V15.7501ZM8.25 8.25014V3.50014H3.5V8.25014H8.25Z" fill="currentColor"/>
<path d="M13.9305 12.6364L13.3805 10.5838L17.1282 4.09265L19.7308 5.59525L15.9831 12.0864L13.9305 12.6364ZM20.2258 4.73793L17.6232 3.23533L18.1358 2.34739C18.2655 2.12285 18.4671 1.97391 18.7408 1.90058C19.0145 1.82725 19.2636 1.8554 19.4881 1.98504L20.3761 2.49769C20.6006 2.62733 20.7495 2.82898 20.8229 3.10266C20.8962 3.37634 20.8681 3.62545 20.7384 3.84999L20.2258 4.73793Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9575 2.00014H2V22.0001H21V7.26619L19.5 9.86427V14.2501H9.75V9.75014H11.483L12.349 8.25014H9.75V3.50014H15.0914L15.9575 2.00014ZM8.25 9.75014V14.2501H3.5V9.75014H8.25ZM8.25 15.7501H3.5V20.5001H8.25V15.7501ZM19.5 15.7501H9.75V20.5001H19.5V15.7501ZM8.25 8.25014V3.50014H3.5V8.25014H8.25Z" style="fill: var(--element-active-color)"/>
<path d="M13.9305 12.6364L13.3805 10.5838L17.1282 4.09265L19.7308 5.59525L15.9831 12.0864L13.9305 12.6364ZM20.2258 4.73793L17.6232 3.23533L18.1358 2.34739C18.2655 2.12285 18.4671 1.97391 18.7408 1.90058C19.0145 1.82725 19.2636 1.8554 19.4881 1.98504L20.3761 2.49769C20.6006 2.62733 20.7495 2.82898 20.8229 3.10266C20.8962 3.37634 20.8681 3.62545 20.7384 3.84999L20.2258 4.73793Z" style="fill: var(--element-active-color)"/>
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
    'obi-record-event-iec': ObiRecordEventIec;
  }
}