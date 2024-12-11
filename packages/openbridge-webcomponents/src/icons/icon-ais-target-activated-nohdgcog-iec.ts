import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-activated-nohdgcog-iec')
export class ObiAisTargetActivatedNohdgcogIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.96997 6.50012L1.96997 8.23217L8.20817 11.8338L5 21H19L17.7124 17.321L21.0225 19.2322L22.0225 17.5001L2.96997 6.50012ZM7.81896 19L9.97093 12.8515L15.0568 15.7878L16.181 19H7.81896Z" fill="currentColor"/>
<path d="M13.0308 9.99934L12 7.05418L11.3158 9.00916L9.553 7.99143L12 1L15.6864 11.5325L13.0308 9.99934Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.96997 6.50012L1.96997 8.23217L8.20817 11.8338L5 21H19L17.7124 17.321L21.0225 19.2322L22.0225 17.5001L2.96997 6.50012ZM7.81896 19L9.97093 12.8515L15.0568 15.7878L16.181 19H7.81896Z" style="fill: var(--element-active-color)"/>
<path d="M13.0308 9.99934L12 7.05418L11.3158 9.00916L9.553 7.99143L12 1L15.6864 11.5325L13.0308 9.99934Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-activated-nohdgcog-iec': ObiAisTargetActivatedNohdgcogIec;
  }
}
