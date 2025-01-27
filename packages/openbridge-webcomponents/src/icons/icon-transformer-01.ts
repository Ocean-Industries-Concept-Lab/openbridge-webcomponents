import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-transformer-01')
export class ObiTransformer01 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.7453C10.8662 18.5362 9.48725 19 8 19C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5C9.48725 5 10.8662 5.46381 12 6.25469C13.1338 5.46381 14.5128 5 16 5C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19C14.5128 19 13.1338 18.5362 12 17.7453ZM10.5003 16.3309C9.76477 16.7565 8.91083 17 8 17C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7C8.91083 7 9.76477 7.24354 10.5003 7.66906C9.56068 8.86059 9 10.3648 9 12C9 13.6352 9.56068 15.1394 10.5003 16.3309ZM13.4997 7.66907C14.2352 7.24355 15.0892 7 16 7C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17C15.0892 17 14.2352 16.7565 13.4997 16.3309C14.4393 15.1394 15 13.6352 15 12C15 10.3648 14.4393 8.86059 13.4997 7.66907ZM12 8.99952C12.6279 9.83526 13 10.8742 13 12C13 13.1258 12.6279 14.1647 12 15.0005C11.3721 14.1647 11 13.1258 11 12C11 10.8742 11.3721 9.83526 12 8.99952Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.7453C10.8662 18.5362 9.48725 19 8 19C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5C9.48725 5 10.8662 5.46381 12 6.25469C13.1338 5.46381 14.5128 5 16 5C19.866 5 23 8.13401 23 12C23 15.866 19.866 19 16 19C14.5128 19 13.1338 18.5362 12 17.7453ZM10.5003 16.3309C9.76477 16.7565 8.91083 17 8 17C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7C8.91083 7 9.76477 7.24354 10.5003 7.66906C9.56068 8.86059 9 10.3648 9 12C9 13.6352 9.56068 15.1394 10.5003 16.3309ZM13.4997 7.66907C14.2352 7.24355 15.0892 7 16 7C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17C15.0892 17 14.2352 16.7565 13.4997 16.3309C14.4393 15.1394 15 13.6352 15 12C15 10.3648 14.4393 8.86059 13.4997 7.66907ZM12 8.99952C12.6279 9.83526 13 10.8742 13 12C13 13.1258 12.6279 14.1647 12 15.0005C11.3721 14.1647 11 13.1258 11 12C11 10.8742 11.3721 9.83526 12 8.99952Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-transformer-01': ObiTransformer01;
  }
}
