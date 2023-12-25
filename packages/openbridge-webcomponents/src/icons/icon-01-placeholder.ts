import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-placeholder')
export class Obi01Placeholder extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.61214 10.516L10.516 1.61214C11.3322 0.795953 12.6678 0.795953 13.484 1.61214L22.3879 10.516C23.204 11.3322 23.204 12.6678 22.3879 13.484L13.484 22.3879C12.6678 23.204 11.3322 23.204 10.516 22.3879L1.61214 13.484C0.795953 12.6678 0.795953 11.3322 1.61214 10.516ZM12 3L3 12L12 21L21 12L12 3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.61214 10.516L10.516 1.61214C11.3322 0.795953 12.6678 0.795953 13.484 1.61214L22.3879 10.516C23.204 11.3322 23.204 12.6678 22.3879 13.484L13.484 22.3879C12.6678 23.204 11.3322 23.204 10.516 22.3879L1.61214 13.484C0.795953 12.6678 0.795953 11.3322 1.61214 10.516ZM12 3L3 12L12 21L21 12L12 3Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-01-placeholder': Obi01Placeholder;
  }
}
