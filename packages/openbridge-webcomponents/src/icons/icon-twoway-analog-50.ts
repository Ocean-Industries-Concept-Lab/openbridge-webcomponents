import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-50')
export class ObiTwowayAnalog50 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.15521C21.0731 4.67454 22 5.14653 22 5.96381V18.0361C22 18.8533 21.0731 19.3252 20.4121 18.8447L13.195 13.5956C13.1095 13.5334 13.0066 13.4999 12.9009 13.4999H11.0991C10.9934 13.4999 10.8905 13.5334 10.805 13.5956L3.58789 18.8447C2.92693 19.3253 2 18.8533 2 18.0361V5.96381C2 5.14654 2.92692 4.67457 3.58789 5.15521L10.805 10.4043C10.8905 10.4665 10.9934 10.4999 11.0991 10.4999H12.9009C13.0066 10.4999 13.1095 10.4665 13.195 10.4043L20.4121 5.15521Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 5.96416C2 5.14702 2.92694 4.67432 3.58789 5.15459L10.8066 10.4046C10.892 10.4666 10.9951 10.5002 11.1006 10.5003H12.8994C13.0049 10.5002 13.108 10.4666 13.1934 10.4046L18.5 6.54522V17.4534L13.1953 13.596C13.1099 13.5338 13.0061 13.5003 12.9004 13.5003H11.0996C10.9939 13.5003 10.8901 13.5338 10.8047 13.596L3.58789 18.845C2.92703 19.3253 2.00026 18.8534 2 18.0364V5.96416Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.15521C21.0731 4.67454 22 5.14653 22 5.96381V18.0361C22 18.8533 21.0731 19.3252 20.4121 18.8447L13.195 13.5956C13.1095 13.5334 13.0066 13.4999 12.9009 13.4999H11.0991C10.9934 13.4999 10.8905 13.5334 10.805 13.5956L3.58789 18.8447C2.92693 19.3253 2 18.8533 2 18.0361V5.96381C2 5.14654 2.92692 4.67457 3.58789 5.15521L10.805 10.4043C10.8905 10.4665 10.9934 10.4999 11.0991 10.4999H12.9009C13.0066 10.4999 13.1095 10.4665 13.195 10.4043L20.4121 5.15521Z" style="fill: var(--automation-symbol-off-line-color); stroke: var(--automation-symbol-off-line-color)"/>
<path d="M2 5.96416C2 5.14702 2.92694 4.67432 3.58789 5.15459L10.8066 10.4046C10.892 10.4666 10.9951 10.5002 11.1006 10.5003H12.8994C13.0049 10.5002 13.108 10.4666 13.1934 10.4046L18.5 6.54522V17.4534L13.1953 13.596C13.1099 13.5338 13.0061 13.5003 12.9004 13.5003H11.0996C10.9939 13.5003 10.8901 13.5338 10.8047 13.596L3.58789 18.845C2.92703 19.3253 2.00026 18.8534 2 18.0364V5.96416Z" style="fill: var(--automation-symbol-on-background-color)" stroke="currentColor"/>
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
    'obi-twoway-analog-50': ObiTwowayAnalog50;
  }
}
