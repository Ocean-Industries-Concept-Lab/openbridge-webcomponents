import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-generic-line-coming-from')
export class ObiGenericLineComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 16.7375L15 7.26424C15 6.83684 14.4985 6.60646 14.1742 6.88491L9.38375 10.9989L0 10.9989V12.9989H9.36992L14.1746 17.1172C14.4989 17.3952 15 17.1647 15 16.7375Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 16.7375L15 7.26424C15 6.83684 14.4985 6.60646 14.1742 6.88491L9.38375 10.9989L0 10.9989V12.9989H9.36992L14.1746 17.1172C14.4989 17.3952 15 17.1647 15 16.7375Z" style="fill: var(--automation-device-tertiary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-generic-line-coming-from': ObiGenericLineComingFrom;
  }
}