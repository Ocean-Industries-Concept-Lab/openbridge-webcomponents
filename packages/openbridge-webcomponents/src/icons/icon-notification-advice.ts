import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-notification-advice')
export class ObiNotificationAdvice extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 19L12 22L15 19H20C21.1046 19 22 18.1046 22 17V5C22 3.89543 21.1046 3 20 3H4C2.89543 3 2 3.89543 2 5V17C2 18.1046 2.89543 19 4 19H9ZM12 19.1716L14.1716 17H20V5H4L4 17H9.82843L12 19.1716Z" fill="currentColor"/>
<path d="M9.73374 14.6603L11.9999 13.3297L14.2661 14.6603C14.5878 14.8492 14.9786 14.5593 14.8912 14.1967L14.2965 11.7277L16.279 10.0676C16.5695 9.82438 16.4181 9.35125 16.0403 9.32191L13.4152 9.11796L12.3877 6.75425C12.2403 6.41525 11.7595 6.41525 11.6122 6.75425L10.5846 9.11796L7.95951 9.32191C7.58176 9.35125 7.43032 9.82438 7.72082 10.0676L9.70335 11.7277L9.10859 14.1967C9.02124 14.5593 9.41208 14.8492 9.73374 14.6603Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 19L12 22L15 19H20C21.1046 19 22 18.1046 22 17V5C22 3.89543 21.1046 3 20 3H4C2.89543 3 2 3.89543 2 5V17C2 18.1046 2.89543 19 4 19H9ZM12 19.1716L14.1716 17H20V5H4L4 17H9.82843L12 19.1716Z" style="fill: var(--element-active-color)"/>
<path d="M9.73374 14.6603L11.9999 13.3297L14.2661 14.6603C14.5878 14.8492 14.9786 14.5593 14.8912 14.1967L14.2965 11.7277L16.279 10.0676C16.5695 9.82438 16.4181 9.35125 16.0403 9.32191L13.4152 9.11796L12.3877 6.75425C12.2403 6.41525 11.7595 6.41525 11.6122 6.75425L10.5846 9.11796L7.95951 9.32191C7.58176 9.35125 7.43032 9.82438 7.72082 10.0676L9.70335 11.7277L9.10859 14.1967C9.02124 14.5593 9.41208 14.8492 9.73374 14.6603Z" style="fill: var(--element-active-color)"/>
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
    'obi-notification-advice': ObiNotificationAdvice;
  }
}