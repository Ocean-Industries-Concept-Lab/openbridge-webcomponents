import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-transformer-02')
export class ObiTransformer02 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5C8.2223 5 8.44217 5.01036 8.65917 5.03063C9.77632 2.64918 12.1956 1 15 1C18.866 1 22 4.13401 22 8C22 9.48725 21.5362 10.8662 20.7453 12C21.5362 13.1338 22 14.5128 22 16C22 19.866 18.866 23 15 23C12.1956 23 9.77632 21.3508 8.65917 18.9694C8.44217 18.9896 8.2223 19 8 19C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM10.6565 18.4783C11.5179 19.9848 13.1404 21 15 21C17.7614 21 20 18.7614 20 16C20 15.0892 19.7565 14.2352 19.3309 13.4997C18.1394 14.4393 16.6352 15 15 15C14.7777 15 14.5578 14.9896 14.3408 14.9694C13.5983 16.5523 12.2804 17.8118 10.6565 18.4783ZM19.3309 10.5003C19.7565 9.76477 20 8.91083 20 8C20 5.23858 17.7614 3 15 3C13.1404 3 11.5179 4.01522 10.6565 5.52165C12.2804 6.18825 13.5983 7.44767 14.3408 9.03063C14.5578 9.01036 14.7777 9 15 9C16.6352 9 18.1394 9.56068 19.3309 10.5003ZM14.9292 11.0005C14.9527 11.0002 14.9764 11 15 11C16.1258 11 17.1647 11.3721 18.0005 12C17.1647 12.6279 16.1258 13 15 13C14.9764 13 14.9527 12.9998 14.9292 12.9995C14.9759 12.6731 15 12.3394 15 12C15 11.6606 14.9759 11.3269 14.9292 11.0005ZM12.3435 9.52165C11.8173 8.60135 11.007 7.86438 10.0321 7.43021C10.0109 7.61721 10 7.80733 10 8C10 8.91083 10.2435 9.76477 10.6691 10.5003C11.1754 10.101 11.7382 9.77013 12.3435 9.52165ZM11.9995 12C12.2981 11.7756 12.6227 11.5839 12.9679 11.4302C12.9891 11.6172 13 11.8073 13 12C13 12.1927 12.9891 12.3828 12.9679 12.5698C12.6227 12.4161 12.2981 12.2244 11.9995 12ZM10.6691 13.4997C11.1754 13.899 11.7382 14.2299 12.3435 14.4783C11.8173 15.3987 11.007 16.1356 10.0321 16.5698C10.0109 16.3828 10 16.1927 10 16C10 15.0892 10.2435 14.2352 10.6691 13.4997ZM9.25469 12C8.46381 13.1338 8 14.5128 8 16C8 16.3393 8.02415 16.6731 8.07082 16.9995C8.04725 16.9998 8.02365 17 8 17C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7C8.02365 7 8.04725 7.00017 8.07082 7.00049C8.02415 7.32694 8 7.66065 8 8C8 9.48725 8.46381 10.8662 9.25469 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5C8.2223 5 8.44217 5.01036 8.65917 5.03063C9.77632 2.64918 12.1956 1 15 1C18.866 1 22 4.13401 22 8C22 9.48725 21.5362 10.8662 20.7453 12C21.5362 13.1338 22 14.5128 22 16C22 19.866 18.866 23 15 23C12.1956 23 9.77632 21.3508 8.65917 18.9694C8.44217 18.9896 8.2223 19 8 19C4.13401 19 1 15.866 1 12C1 8.13401 4.13401 5 8 5ZM10.6565 18.4783C11.5179 19.9848 13.1404 21 15 21C17.7614 21 20 18.7614 20 16C20 15.0892 19.7565 14.2352 19.3309 13.4997C18.1394 14.4393 16.6352 15 15 15C14.7777 15 14.5578 14.9896 14.3408 14.9694C13.5983 16.5523 12.2804 17.8118 10.6565 18.4783ZM19.3309 10.5003C19.7565 9.76477 20 8.91083 20 8C20 5.23858 17.7614 3 15 3C13.1404 3 11.5179 4.01522 10.6565 5.52165C12.2804 6.18825 13.5983 7.44767 14.3408 9.03063C14.5578 9.01036 14.7777 9 15 9C16.6352 9 18.1394 9.56068 19.3309 10.5003ZM14.9292 11.0005C14.9527 11.0002 14.9764 11 15 11C16.1258 11 17.1647 11.3721 18.0005 12C17.1647 12.6279 16.1258 13 15 13C14.9764 13 14.9527 12.9998 14.9292 12.9995C14.9759 12.6731 15 12.3394 15 12C15 11.6606 14.9759 11.3269 14.9292 11.0005ZM12.3435 9.52165C11.8173 8.60135 11.007 7.86438 10.0321 7.43021C10.0109 7.61721 10 7.80733 10 8C10 8.91083 10.2435 9.76477 10.6691 10.5003C11.1754 10.101 11.7382 9.77013 12.3435 9.52165ZM11.9995 12C12.2981 11.7756 12.6227 11.5839 12.9679 11.4302C12.9891 11.6172 13 11.8073 13 12C13 12.1927 12.9891 12.3828 12.9679 12.5698C12.6227 12.4161 12.2981 12.2244 11.9995 12ZM10.6691 13.4997C11.1754 13.899 11.7382 14.2299 12.3435 14.4783C11.8173 15.3987 11.007 16.1356 10.0321 16.5698C10.0109 16.3828 10 16.1927 10 16C10 15.0892 10.2435 14.2352 10.6691 13.4997ZM9.25469 12C8.46381 13.1338 8 14.5128 8 16C8 16.3393 8.02415 16.6731 8.07082 16.9995C8.04725 16.9998 8.02365 17 8 17C5.23858 17 3 14.7614 3 12C3 9.23858 5.23858 7 8 7C8.02365 7 8.04725 7.00017 8.07082 7.00049C8.02415 7.32694 8 7.66065 8 8C8 9.48725 8.46381 10.8662 9.25469 12Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-transformer-02': ObiTransformer02;
  }
}