import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-digital-open')
export class ObiTwowayDigitalOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.15534C21.0731 4.67467 22 5.14666 22 5.96393V18.0362C22 18.8534 21.0731 19.3254 20.4121 18.8448L12.9541 13.421H11.0459L3.58789 18.8448C2.92693 19.3254 2 18.8534 2 18.0362V5.96393C2 5.14666 2.92692 4.67467 3.58789 5.15534L10.8281 10.421H13.1719L20.4121 5.15534Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.15534C21.0731 4.67467 22 5.14666 22 5.96393V18.0362C22 18.8534 21.0731 19.3254 20.4121 18.8448L12.9541 13.421H11.0459L3.58789 18.8448C2.92693 19.3254 2 18.8534 2 18.0362V5.96393C2 5.14666 2.92692 4.67467 3.58789 5.15534L10.8281 10.421H13.1719L20.4121 5.15534Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-twoway-digital-open': ObiTwowayDigitalOpen;
  }
}
