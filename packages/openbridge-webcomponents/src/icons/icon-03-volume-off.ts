import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-03-volume-off')
export class Obi03VolumeOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8 21.5998L17.775 18.5748C17.3584 18.8415 16.9167 19.0708 16.45 19.2628C15.9834 19.4541 15.5 19.6081 15 19.7248V17.6748C15.2334 17.5915 15.4627 17.5081 15.688 17.4248C15.9127 17.3415 16.125 17.2415 16.325 17.1248L13 13.7998V18.9998L8.00002 13.9998H4.00002V7.9998H7.20002L2.40002 3.1998L3.80002 1.7998L22.2 20.1998L20.8 21.5998ZM20.6 15.7998L19.15 14.3498C19.4334 13.8331 19.646 13.2915 19.788 12.7248C19.9294 12.1581 20 11.5748 20 10.9748C20 9.40814 19.5417 8.00814 18.625 6.77481C17.7084 5.54147 16.5 4.70814 15 4.2748V2.2248C17.0667 2.69147 18.75 3.73714 20.05 5.3618C21.35 6.98714 22 8.85814 22 10.9748C22 11.8581 21.8794 12.7081 21.638 13.5248C21.396 14.3415 21.05 15.0998 20.6 15.7998ZM17.25 12.4498L15 10.1998V6.9498C15.7834 7.31647 16.396 7.86647 16.838 8.5998C17.2794 9.33314 17.5 10.1331 17.5 10.9998C17.5 11.2498 17.4794 11.4958 17.438 11.7378C17.396 11.9791 17.3334 12.2165 17.25 12.4498ZM13 8.1998L10.4 5.5998L13 2.9998V8.1998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8 21.5998L17.775 18.5748C17.3584 18.8415 16.9167 19.0708 16.45 19.2628C15.9834 19.4541 15.5 19.6081 15 19.7248V17.6748C15.2334 17.5915 15.4627 17.5081 15.688 17.4248C15.9127 17.3415 16.125 17.2415 16.325 17.1248L13 13.7998V18.9998L8.00002 13.9998H4.00002V7.9998H7.20002L2.40002 3.1998L3.80002 1.7998L22.2 20.1998L20.8 21.5998ZM20.6 15.7998L19.15 14.3498C19.4334 13.8331 19.646 13.2915 19.788 12.7248C19.9294 12.1581 20 11.5748 20 10.9748C20 9.40814 19.5417 8.00814 18.625 6.77481C17.7084 5.54147 16.5 4.70814 15 4.2748V2.2248C17.0667 2.69147 18.75 3.73714 20.05 5.3618C21.35 6.98714 22 8.85814 22 10.9748C22 11.8581 21.8794 12.7081 21.638 13.5248C21.396 14.3415 21.05 15.0998 20.6 15.7998ZM17.25 12.4498L15 10.1998V6.9498C15.7834 7.31647 16.396 7.86647 16.838 8.5998C17.2794 9.33314 17.5 10.1331 17.5 10.9998C17.5 11.2498 17.4794 11.4958 17.438 11.7378C17.396 11.9791 17.3334 12.2165 17.25 12.4498ZM13 8.1998L10.4 5.5998L13 2.9998V8.1998Z" style="fill: var(--element-active-color)"/>
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
    'obi-03-volume-off': Obi03VolumeOff;
  }
}
