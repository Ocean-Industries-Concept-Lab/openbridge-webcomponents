import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-3')
export class ObiResistor3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3134 0.686523L21.8992 7.75759L16.2424 2.10074L23.3134 0.686523Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5859 8L18.3637 4.22228L19.7779 5.6365L17.4144 8H20V11H23L23 13H20V16L9.41437 16L4.22153 21.1928L2.80731 19.7786L6.58594 16L4 16L4 13H1L1 11H4V8L14.5859 8ZM12.5859 10L6 10V14L8.58594 14L12.5859 10ZM11.4144 14L18 14L18 10L15.4144 10L11.4144 14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3134 0.686523L21.8992 7.75759L16.2424 2.10074L23.3134 0.686523Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5859 8L18.3637 4.22228L19.7779 5.6365L17.4144 8H20V11H23L23 13H20V16L9.41437 16L4.22153 21.1928L2.80731 19.7786L6.58594 16L4 16L4 13H1L1 11H4V8L14.5859 8ZM12.5859 10L6 10V14L8.58594 14L12.5859 10ZM11.4144 14L18 14L18 10L15.4144 10L11.4144 14Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-resistor-3': ObiResistor3;
  }
}
