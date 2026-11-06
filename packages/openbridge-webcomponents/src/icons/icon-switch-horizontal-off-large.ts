import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-switch-horizontal-off-large')
export class ObiSwitchHorizontalOffLarge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2234_109" fill="currentColor"/>
<mask id="stroke1_2234_109" maskUnits="userSpaceOnUse" x="1.13397" y="4.63397" width="21.9186" height="14.9641" fill="black">
<rect fill="white" x="1.13397" y="4.63397" width="21.9186" height="14.9641"/>
<use xlink:href="#stroke0_2234_109"/>
</mask>
<path d="M3 17.366C2.72386 16.8877 2.88773 16.2761 3.36603 16L19.8205 6.5C20.2988 6.22386 20.9104 6.38773 21.1865 6.86603C21.4627 7.34432 21.2988 7.95591 20.8205 8.23205L4.36603 17.7321C3.88773 18.0082 3.27614 17.8443 3 17.366Z" stroke-width="2" stroke="currentColor" mask="url(#stroke1_2234_109)"/>
<defs>
<path id="stroke0_2234_109" d="M3 17.366C2.72386 16.8877 2.88773 16.2761 3.36603 16L19.8205 6.5C20.2988 6.22386 20.9104 6.38773 21.1865 6.86603C21.4627 7.34432 21.2988 7.95591 20.8205 8.23205L4.36603 17.7321C3.88773 18.0082 3.27614 17.8443 3 17.366Z"/>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2234_109" style="fill: var(--automation-symbol-off-background-color)"/>
<mask id="stroke1_2234_109" maskUnits="userSpaceOnUse" x="1.13397" y="4.63397" width="21.9186" height="14.9641" fill="black">
<rect fill="white" x="1.13397" y="4.63397" width="21.9186" height="14.9641"/>
<use xlink:href="#stroke0_2234_109"/>
</mask>
<path d="M3 17.366C2.72386 16.8877 2.88773 16.2761 3.36603 16L19.8205 6.5C20.2988 6.22386 20.9104 6.38773 21.1865 6.86603C21.4627 7.34432 21.2988 7.95591 20.8205 8.23205L4.36603 17.7321C3.88773 18.0082 3.27614 17.8443 3 17.366Z" stroke-width="2" style="stroke: var(--automation-symbol-off-border-color)" mask="url(#stroke1_2234_109)"/>
<defs>
<path id="stroke0_2234_109" d="M3 17.366C2.72386 16.8877 2.88773 16.2761 3.36603 16L19.8205 6.5C20.2988 6.22386 20.9104 6.38773 21.1865 6.86603C21.4627 7.34432 21.2988 7.95591 20.8205 8.23205L4.36603 17.7321C3.88773 18.0082 3.27614 17.8443 3 17.366Z"/>
</defs>
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
    'obi-switch-horizontal-off-large': ObiSwitchHorizontalOffLarge;
  }
}
