import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-location-3')
export class Obi07Location3 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.988 15.637C7.31267 17.5957 9.31667 19.7167 12 22C14.6833 19.7167 16.6877 17.5957 18.013 15.637C19.3377 13.679 20 11.8667 20 10.2C20 7.7 19.1957 5.70833 17.587 4.225C15.979 2.74167 14.1167 2 12 2C9.88333 2 8.021 2.74167 6.413 4.225C4.80433 5.70833 4 7.7 4 10.2C4 11.8667 4.66267 13.679 5.988 15.637ZM14.2266 9.86482C14.5508 9.48982 14.7129 9.03475 14.7129 8.49959C14.7129 7.85896 14.4551 7.35896 13.9395 6.99959C13.4277 6.64021 12.7285 6.46053 11.8418 6.46053C10.7598 6.46053 9.82812 6.74178 9.04688 7.30428L9.88477 8.55232C10.2402 8.32186 10.5625 8.15975 10.8516 8.066C11.1445 7.97225 11.4316 7.92537 11.7129 7.92537C12.5254 7.92537 12.9316 8.24959 12.9316 8.89803C12.9316 9.3199 12.7773 9.61873 12.4688 9.79451C12.1641 9.96639 11.6797 10.0523 11.0156 10.0523H10.3535V11.441H11.0039C11.7227 11.441 12.2461 11.525 12.5742 11.6929C12.9023 11.8609 13.0664 12.1461 13.0664 12.5484C13.0664 12.9976 12.9238 13.3238 12.6387 13.5269C12.3535 13.7301 11.9121 13.8316 11.3145 13.8316C10.9238 13.8316 10.5293 13.7789 10.1309 13.6734C9.73242 13.5679 9.36719 13.4312 9.03516 13.2633V14.8043C9.75391 15.1129 10.5781 15.2672 11.5078 15.2672C12.6172 15.2672 13.4707 15.0387 14.0684 14.5816C14.666 14.1207 14.9648 13.4781 14.9648 12.6539C14.9648 12.0875 14.7871 11.6383 14.4316 11.3062C14.0762 10.9703 13.5527 10.7594 12.8613 10.6734V10.6383C13.4473 10.4976 13.9023 10.2398 14.2266 9.86482Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.988 15.637C7.31267 17.5957 9.31667 19.7167 12 22C14.6833 19.7167 16.6877 17.5957 18.013 15.637C19.3377 13.679 20 11.8667 20 10.2C20 7.7 19.1957 5.70833 17.587 4.225C15.979 2.74167 14.1167 2 12 2C9.88333 2 8.021 2.74167 6.413 4.225C4.80433 5.70833 4 7.7 4 10.2C4 11.8667 4.66267 13.679 5.988 15.637ZM14.2266 9.86482C14.5508 9.48982 14.7129 9.03475 14.7129 8.49959C14.7129 7.85896 14.4551 7.35896 13.9395 6.99959C13.4277 6.64021 12.7285 6.46053 11.8418 6.46053C10.7598 6.46053 9.82812 6.74178 9.04688 7.30428L9.88477 8.55232C10.2402 8.32186 10.5625 8.15975 10.8516 8.066C11.1445 7.97225 11.4316 7.92537 11.7129 7.92537C12.5254 7.92537 12.9316 8.24959 12.9316 8.89803C12.9316 9.3199 12.7773 9.61873 12.4688 9.79451C12.1641 9.96639 11.6797 10.0523 11.0156 10.0523H10.3535V11.441H11.0039C11.7227 11.441 12.2461 11.525 12.5742 11.6929C12.9023 11.8609 13.0664 12.1461 13.0664 12.5484C13.0664 12.9976 12.9238 13.3238 12.6387 13.5269C12.3535 13.7301 11.9121 13.8316 11.3145 13.8316C10.9238 13.8316 10.5293 13.7789 10.1309 13.6734C9.73242 13.5679 9.36719 13.4312 9.03516 13.2633V14.8043C9.75391 15.1129 10.5781 15.2672 11.5078 15.2672C12.6172 15.2672 13.4707 15.0387 14.0684 14.5816C14.666 14.1207 14.9648 13.4781 14.9648 12.6539C14.9648 12.0875 14.7871 11.6383 14.4316 11.3062C14.0762 10.9703 13.5527 10.7594 12.8613 10.6734V10.6383C13.4473 10.4976 13.9023 10.2398 14.2266 9.86482Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-location-3': Obi07Location3;
  }
}
