import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-send')
export class ObiSend extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9862 2.73187C20.784 2.44204 21.557 3.2154 21.2675 4.01312L14.8954 21.5375C14.6012 22.3465 13.5159 22.4144 13.1005 21.7172L13.0263 21.5678L10.1591 14.3979C10.0575 14.1441 9.85621 13.9429 9.60245 13.8412L2.43252 10.9731L2.28213 10.8998C1.58516 10.4843 1.65293 9.39812 2.46182 9.10394L19.9862 2.73187ZM11.9355 13.478C11.9633 13.5363 11.9923 13.5943 12.0165 13.6547L13.911 18.392L17.8466 7.56683L11.9355 13.478ZM5.60733 10.0883L10.3446 11.9838L10.4862 12.0444C10.4985 12.05 10.5102 12.0571 10.5224 12.0629L16.4355 6.14984L5.60733 10.0883Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9862 2.73187C20.784 2.44204 21.557 3.2154 21.2675 4.01312L14.8954 21.5375C14.6012 22.3465 13.5159 22.4144 13.1005 21.7172L13.0263 21.5678L10.1591 14.3979C10.0575 14.1441 9.85621 13.9429 9.60245 13.8412L2.43252 10.9731L2.28213 10.8998C1.58516 10.4843 1.65293 9.39812 2.46182 9.10394L19.9862 2.73187ZM11.9355 13.478C11.9633 13.5363 11.9923 13.5943 12.0165 13.6547L13.911 18.392L17.8466 7.56683L11.9355 13.478ZM5.60733 10.0883L10.3446 11.9838L10.4862 12.0444C10.4985 12.05 10.5102 12.0571 10.5224 12.0629L16.4355 6.14984L5.60733 10.0883Z" style="fill: var(--element-active-color)"/>
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
    'obi-send': ObiSend;
  }
}
