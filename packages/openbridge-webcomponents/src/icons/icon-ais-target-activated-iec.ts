import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-ais-target-activated-iec')
export class ObiAisTargetActivatedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18.767 19.3352C18.8807 19.6603 18.6395 20.0004 18.295 20.0004H5.70451C5.36009 20.0004 5.1188 19.6603 5.23258 19.3352L11.5278 1.34874C11.6841 0.902307 12.3154 0.902308 12.4717 1.34874L18.767 19.3352ZM7.81911 18.0004H16.1814L11.9998 6.05408L7.81911 18.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.767 19.3352C18.8807 19.6603 18.6395 20.0004 18.295 20.0004H5.70451C5.36009 20.0004 5.1188 19.6603 5.23258 19.3352L11.5278 1.34874C11.6841 0.902307 12.3154 0.902308 12.4717 1.34874L18.767 19.3352ZM7.81911 18.0004H16.1814L11.9998 6.05408L7.81911 18.0004Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-activated-iec': ObiAisTargetActivatedIec;
  }
}
