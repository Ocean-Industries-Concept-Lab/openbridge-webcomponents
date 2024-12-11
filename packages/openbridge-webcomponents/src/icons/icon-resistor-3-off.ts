import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-3-off')
export class ObiResistor3Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9L19 9V15L5 15L5 9Z" fill="currentColor"/>
<path d="M23.3135 0.685547L21.8993 7.75661L16.2425 2.09976L23.3135 0.685547Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5851 8L18.3638 4.22131L19.778 5.63552L17.4135 8H20V11H23L23 13H20V16L9.41351 16L4.22165 21.1919L2.80743 19.7777L6.58509 16L4 16L4 13H1L1 11H4V8L14.5851 8ZM13.5851 9L5 9L5 15L7.58509 15L13.5851 9ZM10.4135 15L19 15L19 9L16.4135 9L10.4135 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 9L19 9V15L5 15L5 9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23.3135 0.685547L21.8993 7.75661L16.2425 2.09976L23.3135 0.685547Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5851 8L18.3638 4.22131L19.778 5.63552L17.4135 8H20V11H23L23 13H20V16L9.41351 16L4.22165 21.1919L2.80743 19.7777L6.58509 16L4 16L4 13H1L1 11H4V8L14.5851 8ZM13.5851 9L5 9L5 15L7.58509 15L13.5851 9ZM10.4135 15L19 15L19 9L16.4135 9L10.4135 15Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-resistor-3-off': ObiResistor3Off;
  }
}