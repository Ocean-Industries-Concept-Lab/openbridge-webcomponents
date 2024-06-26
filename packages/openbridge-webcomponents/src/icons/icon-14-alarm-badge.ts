import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-badge')
export class Obi14AlarmBadge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2655 20.5002C22.0358 20.5002 22.5169 19.6659 22.1309 18.9992L12.8654 2.99506C12.4802 2.32977 11.5197 2.32977 11.1345 2.99506L1.86898 18.9992C1.48301 19.6659 1.96407 20.5002 2.73441 20.5002H21.2655Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2655 20.5002C22.0358 20.5002 22.5169 19.6659 22.1309 18.9992L12.8654 2.99506C12.4802 2.32977 11.5197 2.32977 11.1345 2.99506L1.86898 18.9992C1.48301 19.6659 1.96407 20.5002 2.73441 20.5002H21.2655Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm-badge': Obi14AlarmBadge;
  }
}
