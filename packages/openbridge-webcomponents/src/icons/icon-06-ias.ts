import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-ias')
export class Obi06Ias extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 4.25C3.37014 4.25 3.69331 4.0489 3.86622 3.75H5V11.75H3.86622C3.69331 11.4511 3.37014 11.25 3 11.25C2.44772 11.25 2 11.6977 2 12.25C2 12.8023 2.44772 13.25 3 13.25C3.37014 13.25 3.69331 13.0489 3.86622 12.75H5V20.75H3.86622C3.69331 20.4511 3.37014 20.25 3 20.25C2.44772 20.25 2 20.6977 2 21.25C2 21.8023 2.44772 22.25 3 22.25C3.37014 22.25 3.69331 22.0489 3.86622 21.75H6V2.75H3.86622C3.69331 2.4511 3.37014 2.25 3 2.25C2.44772 2.25 2 2.69772 2 3.25C2 3.80228 2.44772 4.25 3 4.25Z" fill="currentColor"/>
<path d="M22 12.25C22 12.8023 21.5523 13.25 21 13.25C20.6299 13.25 20.3067 13.0489 20.1338 12.75H19V20.75H20.1338C20.3067 20.4511 20.6299 20.25 21 20.25C21.5523 20.25 22 20.6977 22 21.25C22 21.8023 21.5523 22.25 21 22.25C20.6299 22.25 20.3067 22.0489 20.1338 21.75H18L18 2.75L20.1338 2.75C20.3067 2.4511 20.6299 2.25 21 2.25C21.5523 2.25 22 2.69772 22 3.25C22 3.80228 21.5523 4.25 21 4.25C20.6299 4.25 20.3067 4.0489 20.1338 3.75L19 3.75V11.75H20.1338C20.3067 11.4511 20.6299 11.25 21 11.25C21.5523 11.25 22 11.6977 22 12.25Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9065 13.5781L15.8072 12.7522C15.8301 12.596 15.853 12.4286 15.853 12.2612C15.853 12.0938 15.8416 11.9263 15.8072 11.7701L16.895 10.9442C16.9866 10.8661 17.021 10.7321 16.9523 10.6205L15.9217 8.89063C15.8645 8.77902 15.7271 8.74554 15.6011 8.77902L14.3301 9.28125C14.0668 9.08036 13.7805 8.91295 13.4599 8.79018L13.2653 7.47321C13.2538 7.33929 13.1393 7.25 13.0248 7.25H10.9752C10.8492 7.25 10.7347 7.33929 10.7233 7.46205L10.5286 8.77902C10.2195 8.91295 9.92176 9.0692 9.6584 9.27009L8.38741 8.76786C8.27291 8.72321 8.1355 8.76786 8.0668 8.87946L7.03627 10.6094C6.97902 10.721 6.99047 10.8549 7.09352 10.933L8.18131 11.7589C8.15841 11.9152 8.14696 12.0826 8.14696 12.25C8.14696 12.4174 8.15841 12.5848 8.18131 12.7411L7.09352 13.567C7.00192 13.6451 6.96757 13.779 7.03627 13.8906L8.0668 15.6205C8.12405 15.7321 8.26146 15.7656 8.38741 15.7321L9.6584 15.2299C9.92176 15.4308 10.208 15.5982 10.5286 15.721L10.7233 17.0379C10.7462 17.1607 10.8492 17.25 10.9752 17.25H13.0248C13.1508 17.25 13.2653 17.1607 13.2767 17.0379L13.4714 15.721C13.7805 15.5871 14.0782 15.4308 14.3301 15.2299L15.6126 15.7321C15.7271 15.7768 15.8645 15.7321 15.9332 15.6205L16.9637 13.8906C17.0324 13.7902 16.9981 13.6563 16.9065 13.5781ZM11.9943 13.7567C11.1469 13.7567 10.4485 13.0871 10.4485 12.25C10.4485 11.4129 11.1355 10.7433 11.9943 10.7433C12.8531 10.7433 13.5401 11.4129 13.5401 12.25C13.5401 13.0871 12.8416 13.7567 11.9943 13.7567Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 4.25C3.37014 4.25 3.69331 4.0489 3.86622 3.75H5V11.75H3.86622C3.69331 11.4511 3.37014 11.25 3 11.25C2.44772 11.25 2 11.6977 2 12.25C2 12.8023 2.44772 13.25 3 13.25C3.37014 13.25 3.69331 13.0489 3.86622 12.75H5V20.75H3.86622C3.69331 20.4511 3.37014 20.25 3 20.25C2.44772 20.25 2 20.6977 2 21.25C2 21.8023 2.44772 22.25 3 22.25C3.37014 22.25 3.69331 22.0489 3.86622 21.75H6V2.75H3.86622C3.69331 2.4511 3.37014 2.25 3 2.25C2.44772 2.25 2 2.69772 2 3.25C2 3.80228 2.44772 4.25 3 4.25Z" style="fill: var(--element-active-color)"/>
<path d="M22 12.25C22 12.8023 21.5523 13.25 21 13.25C20.6299 13.25 20.3067 13.0489 20.1338 12.75H19V20.75H20.1338C20.3067 20.4511 20.6299 20.25 21 20.25C21.5523 20.25 22 20.6977 22 21.25C22 21.8023 21.5523 22.25 21 22.25C20.6299 22.25 20.3067 22.0489 20.1338 21.75H18L18 2.75L20.1338 2.75C20.3067 2.4511 20.6299 2.25 21 2.25C21.5523 2.25 22 2.69772 22 3.25C22 3.80228 21.5523 4.25 21 4.25C20.6299 4.25 20.3067 4.0489 20.1338 3.75L19 3.75V11.75H20.1338C20.3067 11.4511 20.6299 11.25 21 11.25C21.5523 11.25 22 11.6977 22 12.25Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9065 13.5781L15.8072 12.7522C15.8301 12.596 15.853 12.4286 15.853 12.2612C15.853 12.0938 15.8416 11.9263 15.8072 11.7701L16.895 10.9442C16.9866 10.8661 17.021 10.7321 16.9523 10.6205L15.9217 8.89063C15.8645 8.77902 15.7271 8.74554 15.6011 8.77902L14.3301 9.28125C14.0668 9.08036 13.7805 8.91295 13.4599 8.79018L13.2653 7.47321C13.2538 7.33929 13.1393 7.25 13.0248 7.25H10.9752C10.8492 7.25 10.7347 7.33929 10.7233 7.46205L10.5286 8.77902C10.2195 8.91295 9.92176 9.0692 9.6584 9.27009L8.38741 8.76786C8.27291 8.72321 8.1355 8.76786 8.0668 8.87946L7.03627 10.6094C6.97902 10.721 6.99047 10.8549 7.09352 10.933L8.18131 11.7589C8.15841 11.9152 8.14696 12.0826 8.14696 12.25C8.14696 12.4174 8.15841 12.5848 8.18131 12.7411L7.09352 13.567C7.00192 13.6451 6.96757 13.779 7.03627 13.8906L8.0668 15.6205C8.12405 15.7321 8.26146 15.7656 8.38741 15.7321L9.6584 15.2299C9.92176 15.4308 10.208 15.5982 10.5286 15.721L10.7233 17.0379C10.7462 17.1607 10.8492 17.25 10.9752 17.25H13.0248C13.1508 17.25 13.2653 17.1607 13.2767 17.0379L13.4714 15.721C13.7805 15.5871 14.0782 15.4308 14.3301 15.2299L15.6126 15.7321C15.7271 15.7768 15.8645 15.7321 15.9332 15.6205L16.9637 13.8906C17.0324 13.7902 16.9981 13.6563 16.9065 13.5781ZM11.9943 13.7567C11.1469 13.7567 10.4485 13.0871 10.4485 12.25C10.4485 11.4129 11.1355 10.7433 11.9943 10.7433C12.8531 10.7433 13.5401 11.4129 13.5401 12.25C13.5401 13.0871 12.8416 13.7567 11.9943 13.7567Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-ias': Obi06Ias;
  }
}
