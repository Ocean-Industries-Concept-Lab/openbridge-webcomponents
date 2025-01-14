import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-04-off')
export class ObiCapacitor04Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" fill="currentColor"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" fill="currentColor"/>
<path d="M16.2429 2.10074L17.6571 0.686523L23.314 6.34338L21.8998 7.75759L16.2429 2.10074Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9644 5.6225L18.3642 4.22266L19.7784 5.63687L16.9999 8.41535L16.9999 18C16.9999 19.1046 16.1045 20 14.9999 20C13.8954 20 12.9999 19.1046 12.9999 18V12.4154L10.9999 14.4154V18C10.9999 19.1046 10.1045 20 8.99994 20C8.02509 20 7.21315 19.3025 7.03588 18.3794L4.22207 21.1932L2.80786 19.779L6.99994 15.5869V6C6.99994 4.89543 7.89537 4 8.99994 4C10.1045 4 10.9999 4.89543 10.9999 6V11.5869L12.9999 9.58693V6C12.9999 4.89543 13.8954 4 14.9999 4C15.9755 4 16.7878 4.69842 16.9644 5.6225ZM15.9999 6.58693V6C15.9999 5.44771 15.5522 5 14.9999 5C14.4477 5 13.9999 5.44771 13.9999 6V8.58693L15.9999 6.58693ZM13.9999 11.4154V18C13.9999 18.5523 14.4477 19 14.9999 19C15.5522 19 15.9999 18.5523 15.9999 18L15.9999 9.41535L13.9999 11.4154ZM9.99994 12.5869L9.99994 6C9.99994 5.44771 9.55222 5 8.99994 5C8.44765 5 7.99994 5.44771 7.99994 6L7.99994 14.5869L9.99994 12.5869ZM7.99994 17.4153V18C7.99994 18.5523 8.44765 19 8.99994 19C9.55222 19 9.99994 18.5523 9.99994 18V15.4154L7.99994 17.4153Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18V6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 6L16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18L14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16.2429 2.10074L17.6571 0.686523L23.314 6.34338L21.8998 7.75759L16.2429 2.10074Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9644 5.6225L18.3642 4.22266L19.7784 5.63687L16.9999 8.41535L16.9999 18C16.9999 19.1046 16.1045 20 14.9999 20C13.8954 20 12.9999 19.1046 12.9999 18V12.4154L10.9999 14.4154V18C10.9999 19.1046 10.1045 20 8.99994 20C8.02509 20 7.21315 19.3025 7.03588 18.3794L4.22207 21.1932L2.80786 19.779L6.99994 15.5869V6C6.99994 4.89543 7.89537 4 8.99994 4C10.1045 4 10.9999 4.89543 10.9999 6V11.5869L12.9999 9.58693V6C12.9999 4.89543 13.8954 4 14.9999 4C15.9755 4 16.7878 4.69842 16.9644 5.6225ZM15.9999 6.58693V6C15.9999 5.44771 15.5522 5 14.9999 5C14.4477 5 13.9999 5.44771 13.9999 6V8.58693L15.9999 6.58693ZM13.9999 11.4154V18C13.9999 18.5523 14.4477 19 14.9999 19C15.5522 19 15.9999 18.5523 15.9999 18L15.9999 9.41535L13.9999 11.4154ZM9.99994 12.5869L9.99994 6C9.99994 5.44771 9.55222 5 8.99994 5C8.44765 5 7.99994 5.44771 7.99994 6L7.99994 14.5869L9.99994 12.5869ZM7.99994 17.4153V18C7.99994 18.5523 8.44765 19 8.99994 19C9.55222 19 9.99994 18.5523 9.99994 18V15.4154L7.99994 17.4153Z" style="fill: var(--undefined)"/>
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
    'obi-capacitor-04-off': ObiCapacitor04Off;
  }
}