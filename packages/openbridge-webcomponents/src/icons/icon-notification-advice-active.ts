import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-notification-advice-active')
export class ObiNotificationAdviceActive extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 19C2.89543 19 2 18.1046 2 17V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V17C22 18.1046 21.1046 19 20 19H15L12 22L9 19H4ZM11.9999 13.5759L9.32009 15.1495C8.93971 15.3728 8.47753 15.03 8.58083 14.6012L9.28416 11.6815L6.93972 9.7184C6.5962 9.43075 6.77528 8.87125 7.22199 8.83654L10.3263 8.59537L11.5414 5.80017C11.7157 5.39929 12.2842 5.39929 12.4585 5.80017L13.6736 8.59537L16.7779 8.83654C17.2246 8.87125 17.4037 9.43075 17.0602 9.7184L14.7157 11.6815L15.4191 14.6012C15.5224 15.03 15.0602 15.3728 14.6798 15.1495L11.9999 13.5759Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 19C2.89543 19 2 18.1046 2 17V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V17C22 18.1046 21.1046 19 20 19H15L12 22L9 19H4ZM11.9999 13.5759L9.32009 15.1495C8.93971 15.3728 8.47753 15.03 8.58083 14.6012L9.28416 11.6815L6.93972 9.7184C6.5962 9.43075 6.77528 8.87125 7.22199 8.83654L10.3263 8.59537L11.5414 5.80017C11.7157 5.39929 12.2842 5.39929 12.4585 5.80017L13.6736 8.59537L16.7779 8.83654C17.2246 8.87125 17.4037 9.43075 17.0602 9.7184L14.7157 11.6815L15.4191 14.6012C15.5224 15.03 15.0602 15.3728 14.6798 15.1495L11.9999 13.5759Z" style="fill: var(--element-active-color)"/>
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
    'obi-notification-advice-active': ObiNotificationAdviceActive;
  }
}