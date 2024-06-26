import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-target-select')
export class Obi07TargetSelect extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.66667V4.22222C2 3 3 2 4.22222 2H8.66667V4.22222H4.22222V8.66667H2ZM2 15.3334H4.22222V19.7779H8.66667V22.0001H4.22222C3 22.0001 2 21.0001 2 19.7779V15.3334ZM19.7778 19.7779H15.3333V22.0001H19.7778C21 22.0001 22 21.0001 22 19.7779V15.3334H19.7778V19.7779ZM15.3333 2H19.7778C21 2 22 3 22 4.22222V8.66667H19.7778V4.22222H15.3333V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 8.66667V4.22222C2 3 3 2 4.22222 2H8.66667V4.22222H4.22222V8.66667H2ZM2 15.3334H4.22222V19.7779H8.66667V22.0001H4.22222C3 22.0001 2 21.0001 2 19.7779V15.3334ZM19.7778 19.7779H15.3333V22.0001H19.7778C21 22.0001 22 21.0001 22 19.7779V15.3334H19.7778V19.7779ZM15.3333 2H19.7778C21 2 22 3 22 4.22222V8.66667H19.7778V4.22222H15.3333V2Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-target-select': Obi07TargetSelect;
  }
}
