import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-send')
export class ObiSend extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.986 2.73187C20.7837 2.44204 21.5568 3.2154 21.2672 4.01312L14.8952 21.5375C14.601 22.3465 13.5157 22.4144 13.1002 21.7172L13.026 21.5678L10.1588 14.3979C10.0572 14.1441 9.85596 13.9429 9.6022 13.8412L2.43228 10.9731L2.28189 10.8998C1.58491 10.4843 1.65269 9.39812 2.46158 9.10394L19.986 2.73187ZM11.9352 13.478C11.9631 13.5363 11.9921 13.5943 12.0163 13.6547L13.9108 18.392L17.8463 7.56683L11.9352 13.478ZM5.60708 10.0883L10.3444 11.9838L10.486 12.0444C10.4983 12.05 10.5099 12.0571 10.5221 12.0629L16.4352 6.14984L5.60708 10.0883Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.986 2.73187C20.7837 2.44204 21.5568 3.2154 21.2672 4.01312L14.8952 21.5375C14.601 22.3465 13.5157 22.4144 13.1002 21.7172L13.026 21.5678L10.1588 14.3979C10.0572 14.1441 9.85596 13.9429 9.6022 13.8412L2.43228 10.9731L2.28189 10.8998C1.58491 10.4843 1.65269 9.39812 2.46158 9.10394L19.986 2.73187ZM11.9352 13.478C11.9631 13.5363 11.9921 13.5943 12.0163 13.6547L13.9108 18.392L17.8463 7.56683L11.9352 13.478ZM5.60708 10.0883L10.3444 11.9838L10.486 12.0444C10.4983 12.05 10.5099 12.0571 10.5221 12.0629L16.4352 6.14984L5.60708 10.0883Z" style="fill: var(--element-active-color)"/>
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
