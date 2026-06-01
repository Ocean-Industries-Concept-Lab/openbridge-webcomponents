import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-cancel-send')
export class ObiCancelSend extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5358 16.1217L19.6569 14.0015L21.071 15.4156L18.9499 17.5357L21.071 19.6578L19.6569 21.0718L17.5348 18.9498L15.4137 21.0718L13.9997 19.6578L16.1208 17.5357L13.9997 15.4146L15.4147 14.0006L17.5358 16.1217Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.986 2.732C20.7835 2.44248 21.5565 3.21573 21.2672 4.01325L18.3629 12.0006H16.235L17.8463 7.56697L11.9352 13.4781L11.9499 13.5103C11.9728 13.558 11.9965 13.6055 12.0163 13.6549L12.3131 14.398L10.7682 15.9234L10.1588 14.398C10.0572 14.1443 9.85587 13.943 9.6022 13.8414L2.43228 10.9732L2.28189 10.9C1.58491 10.4844 1.65269 9.39825 2.46158 9.10407L19.986 2.732ZM5.60708 10.0884L10.3444 11.984L10.486 12.0445C10.4923 12.0474 10.4984 12.051 10.5045 12.0543C10.5101 12.0573 10.5164 12.0603 10.5221 12.0631L16.4352 6.14997L5.60708 10.0884Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5358 16.1217L19.6569 14.0015L21.071 15.4156L18.9499 17.5357L21.071 19.6578L19.6569 21.0718L17.5348 18.9498L15.4137 21.0718L13.9997 19.6578L16.1208 17.5357L13.9997 15.4146L15.4147 14.0006L17.5358 16.1217Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.986 2.732C20.7835 2.44248 21.5565 3.21573 21.2672 4.01325L18.3629 12.0006H16.235L17.8463 7.56697L11.9352 13.4781L11.9499 13.5103C11.9728 13.558 11.9965 13.6055 12.0163 13.6549L12.3131 14.398L10.7682 15.9234L10.1588 14.398C10.0572 14.1443 9.85587 13.943 9.6022 13.8414L2.43228 10.9732L2.28189 10.9C1.58491 10.4844 1.65269 9.39825 2.46158 9.10407L19.986 2.732ZM5.60708 10.0884L10.3444 11.984L10.486 12.0445C10.4923 12.0474 10.4984 12.051 10.5045 12.0543C10.5101 12.0573 10.5164 12.0603 10.5221 12.0631L16.4352 6.14997L5.60708 10.0884Z" style="fill: var(--element-active-color)"/>
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
    'obi-cancel-send': ObiCancelSend;
  }
}
