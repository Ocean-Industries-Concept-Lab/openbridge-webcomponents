import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-radar')
export class Obi06Radar extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0017 20.6619C21.7846 17.9005 23.4233 11.7846 20.6619 7.00167C17.9005 2.21874 11.7846 0.579992 7.00167 3.34142C2.21874 6.10284 0.579992 12.2187 3.34142 17.0017C6.10284 21.7846 12.2187 23.4233 17.0017 20.6619ZM16.0017 18.9299C19.6826 16.8047 21.0358 12.1959 19.1665 8.44217L17.5107 9.39815C17.5079 9.39985 17.505 9.40152 17.5022 9.40317C17.4993 9.40482 17.4964 9.40644 17.4936 9.40803L15.2992 10.675C15.2939 10.6782 15.2886 10.6815 15.2832 10.6846C15.2778 10.6877 15.2723 10.6907 15.2669 10.6936L12.2516 12.4345L11.7516 11.5685L14.3136 10.0893C14.0451 9.76475 13.7101 9.49889 13.329 9.31095C12.7968 9.04852 12.1988 8.94979 11.6105 9.02723C11.0223 9.10468 10.4702 9.35483 10.0241 9.74605C9.57796 10.1373 9.25789 10.652 9.10432 11.2251C9.03285 11.4918 8.75868 11.6501 8.49195 11.5787C8.22522 11.5072 8.06692 11.233 8.13839 10.9663C8.34315 10.2021 8.76992 9.51583 9.36472 8.99421C9.95951 8.47258 10.6956 8.13905 11.48 8.03579C12.2644 7.93253 13.0617 8.06417 13.7713 8.41408C14.3302 8.68973 14.8149 9.09107 15.1888 9.58397L16.5496 8.79832C15.874 7.83904 14.9092 7.11415 13.7901 6.73425C12.5122 6.30049 11.1203 6.34605 9.87359 6.86246C8.62687 7.37887 7.6104 8.33089 7.01357 9.54116C6.41673 10.7514 6.28022 12.1374 6.62948 13.4409C6.70095 13.7076 6.54266 13.9818 6.27593 14.0532C6.00919 14.1247 5.73502 13.9664 5.66355 13.6997C5.2515 12.1619 5.41255 10.5267 6.11669 9.09887C6.82084 7.67101 8.02005 6.54783 9.4909 5.93858C10.9618 5.32933 12.6039 5.27557 14.1115 5.78732C15.4605 6.24525 16.6194 7.12806 17.4186 8.2966L18.6664 7.57616C16.3502 4.08072 11.6825 2.94833 8.00167 5.07347C4.17533 7.28261 2.86433 12.1753 5.07347 16.0017C7.28261 19.828 12.1753 21.139 16.0017 18.9299Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0017 20.6619C21.7846 17.9005 23.4233 11.7846 20.6619 7.00167C17.9005 2.21874 11.7846 0.579992 7.00167 3.34142C2.21874 6.10284 0.579992 12.2187 3.34142 17.0017C6.10284 21.7846 12.2187 23.4233 17.0017 20.6619ZM16.0017 18.9299C19.6826 16.8047 21.0358 12.1959 19.1665 8.44217L17.5107 9.39815C17.5079 9.39985 17.505 9.40152 17.5022 9.40317C17.4993 9.40482 17.4964 9.40644 17.4936 9.40803L15.2992 10.675C15.2939 10.6782 15.2886 10.6815 15.2832 10.6846C15.2778 10.6877 15.2723 10.6907 15.2669 10.6936L12.2516 12.4345L11.7516 11.5685L14.3136 10.0893C14.0451 9.76475 13.7101 9.49889 13.329 9.31095C12.7968 9.04852 12.1988 8.94979 11.6105 9.02723C11.0223 9.10468 10.4702 9.35483 10.0241 9.74605C9.57796 10.1373 9.25789 10.652 9.10432 11.2251C9.03285 11.4918 8.75868 11.6501 8.49195 11.5787C8.22522 11.5072 8.06692 11.233 8.13839 10.9663C8.34315 10.2021 8.76992 9.51583 9.36472 8.99421C9.95951 8.47258 10.6956 8.13905 11.48 8.03579C12.2644 7.93253 13.0617 8.06417 13.7713 8.41408C14.3302 8.68973 14.8149 9.09107 15.1888 9.58397L16.5496 8.79832C15.874 7.83904 14.9092 7.11415 13.7901 6.73425C12.5122 6.30049 11.1203 6.34605 9.87359 6.86246C8.62687 7.37887 7.6104 8.33089 7.01357 9.54116C6.41673 10.7514 6.28022 12.1374 6.62948 13.4409C6.70095 13.7076 6.54266 13.9818 6.27593 14.0532C6.00919 14.1247 5.73502 13.9664 5.66355 13.6997C5.2515 12.1619 5.41255 10.5267 6.11669 9.09887C6.82084 7.67101 8.02005 6.54783 9.4909 5.93858C10.9618 5.32933 12.6039 5.27557 14.1115 5.78732C15.4605 6.24525 16.6194 7.12806 17.4186 8.2966L18.6664 7.57616C16.3502 4.08072 11.6825 2.94833 8.00167 5.07347C4.17533 7.28261 2.86433 12.1753 5.07347 16.0017C7.28261 19.828 12.1753 21.139 16.0017 18.9299Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-06-radar': Obi06Radar;
  }
}
