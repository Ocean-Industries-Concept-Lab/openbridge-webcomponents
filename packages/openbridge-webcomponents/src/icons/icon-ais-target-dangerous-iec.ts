import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ais-target-dangerous-iec')
export class ObiAisTargetDangerousIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.475 22.3683C19.5787 22.6791 19.3471 23 19.0193 23H4.98073C4.65285 23 4.42134 22.6791 4.52502 22.3683L11.5443 1.32818C11.6903 0.890607 12.3097 0.890607 12.4557 1.32818L19.475 22.3683ZM6.97969 21.0802H17.0194L12 6.03287L6.97969 21.0802Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.475 22.3683C19.5787 22.6791 19.3471 23 19.0193 23H4.98073C4.65285 23 4.42134 22.6791 4.52502 22.3683L11.5443 1.32818C11.6903 0.890607 12.3097 0.890607 12.4557 1.32818L19.475 22.3683ZM6.97969 21.0802H17.0194L12 6.03287L6.97969 21.0802Z" fill="currentColor"/>
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
    'obi-ais-target-dangerous-iec': ObiAisTargetDangerousIec;
  }
}
