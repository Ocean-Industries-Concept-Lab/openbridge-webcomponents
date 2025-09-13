import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-warning-noack-iec')
export class ObiWarningNoackIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z" fill="currentColor" stroke="#DC7100"/>
<path d="M19.743 5.67138L13.4143 12.0001L19.743 18.3288C19.3198 18.8459 18.8459 19.3198 18.3288 19.743L12.0001 13.4143L5.67138 19.743C5.15426 19.3199 4.68032 18.8459 4.25715 18.3288L10.5859 12.0001L4.25708 5.67129C4.68024 5.15419 5.15419 4.68024 5.67129 4.25708L12.0001 10.5859L18.3288 4.25715C18.8459 4.68032 19.3199 5.15426 19.743 5.67138Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z" style="fill: var(--alert-warning-color)" style="stroke: var(--alert-warning-outline-color)"/>
<path d="M19.743 5.67138L13.4143 12.0001L19.743 18.3288C19.3198 18.8459 18.8459 19.3198 18.3288 19.743L12.0001 13.4143L5.67138 19.743C5.15426 19.3199 4.68032 18.8459 4.25715 18.3288L10.5859 12.0001L4.25708 5.67129C4.68024 5.15419 5.15419 4.68024 5.67129 4.25708L12.0001 10.5859L18.3288 4.25715C18.8459 4.68032 19.3199 5.15426 19.743 5.67138Z" style="fill: var(--on-warning-active-color)"/>
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
