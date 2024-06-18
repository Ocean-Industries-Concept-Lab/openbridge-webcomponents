import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-warning-noack')
export class Obi14WarningNoack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM18.293 19.7072L12.0001 13.4143L5.70718 19.7072L4.29297 18.293L10.5859 12.0001L4.29297 5.70718L5.70718 4.29297L12.0001 10.5859L18.293 4.29297L19.7072 5.70718L13.4143 12.0001L19.7072 18.293L18.293 19.7072Z" fill="currentColor"/>
<path d="M12.0001 13.4143L18.293 19.7072L19.7072 18.293L13.4143 12.0001L19.7072 5.70718L18.293 4.29297L12.0001 10.5859L5.70718 4.29297L4.29297 5.70718L10.5859 12.0001L4.29297 18.293L5.70718 19.7072L12.0001 13.4143Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM18.293 19.7072L12.0001 13.4143L5.70718 19.7072L4.29297 18.293L10.5859 12.0001L4.29297 5.70718L5.70718 4.29297L12.0001 10.5859L18.293 4.29297L19.7072 5.70718L13.4143 12.0001L19.7072 18.293L18.293 19.7072Z" style="fill: var(--warning-enabled-background-color)"/>
<path d="M12.0001 13.4143L18.293 19.7072L19.7072 18.293L13.4143 12.0001L19.7072 5.70718L18.293 4.29297L12.0001 10.5859L5.70718 4.29297L4.29297 5.70718L10.5859 12.0001L4.29297 18.293L5.70718 19.7072L12.0001 13.4143Z" style="fill: var(--on-warning-active-color)" />
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
    'obi-14-warning-noack': Obi14WarningNoack;
  }
}
