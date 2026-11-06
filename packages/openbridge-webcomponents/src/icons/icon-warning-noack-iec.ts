import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-warning-noack-iec')
export class ObiWarningNoackIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<mask id="stroke0_2002_1119" fill="white">
<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill-rule="evenodd" clip-rule="evenodd"/>
</mask>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="2" stroke="currentColor" mask="url(#stroke0_2002_1119)"/>
<path d="M19.743 5.67145L13.4143 12.0001L19.7429 18.3288C19.3198 18.8459 18.8458 19.3198 18.3287 19.743L12.0001 13.4143L5.67134 19.743C5.15423 19.3199 4.68028 18.8459 4.25711 18.3288L10.5859 12.0001L4.25705 5.67129C4.68021 5.15419 5.15416 4.68024 5.67126 4.25708L12.0001 10.5859L18.3288 4.25722C18.8459 4.68038 19.3199 5.15433 19.743 5.67145Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--alert-warning-color)"/>
<mask id="stroke0_2002_1119" fill="white">
<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill-rule="evenodd" clip-rule="evenodd"/>
</mask>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="2" style="stroke: var(--alert-warning-outline-color)" mask="url(#stroke0_2002_1119)"/>
<path d="M19.743 5.67145L13.4143 12.0001L19.7429 18.3288C19.3198 18.8459 18.8458 19.3198 18.3287 19.743L12.0001 13.4143L5.67134 19.743C5.15423 19.3199 4.68028 18.8459 4.25711 18.3288L10.5859 12.0001L4.25705 5.67129C4.68021 5.15419 5.15416 4.68024 5.67126 4.25708L12.0001 10.5859L18.3288 4.25722C18.8459 4.68038 19.3199 5.15433 19.743 5.67145Z" style="fill: var(--on-warning-active-color)"/>
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
    'obi-warning-noack-iec': ObiWarningNoackIec;
  }
}
