import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-command-auto-track')
export class ObiCommandAutoTrack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.135 16.75H12.863V9.63401H15.227V8.18201H8.77097V9.63401H11.135V16.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5614 3.08056L14.8769 4.53287C13.9841 4.18869 13.0141 4 12 4C10.9859 4 10.0159 4.18869 9.12308 4.53288L8.43854 3.08056C8.09427 2.35016 7.19926 2.06999 6.49997 2.47372C5.80068 2.87746 5.59581 3.79264 6.05622 4.45599L6.97279 5.77654C5.4642 6.99667 4.40818 8.75419 4.09584 10.758L2.49482 10.6245C1.69014 10.5575 1 11.1925 1 12C1 12.8074 1.69014 13.4425 2.49482 13.3754L4.09583 13.242C4.40816 15.2458 5.4642 17.0033 6.9728 18.2235L6.05628 19.5439C5.59587 20.2073 5.80074 21.1225 6.50003 21.5262C7.19933 21.93 8.09433 21.6498 8.4386 20.9194L9.12311 19.4671C10.0159 19.8113 10.9859 20 12 20C13.0141 20 13.9841 19.8113 14.8769 19.4671L15.5614 20.9194C15.9057 21.6498 16.8007 21.93 17.5 21.5262C18.1993 21.1225 18.4041 20.2073 17.9437 19.5439L17.0272 18.2235C18.5358 17.0033 19.5918 15.2458 19.9042 13.242L21.5052 13.3754C22.3099 13.4425 23 12.8074 23 12C23 11.1925 22.3099 10.5575 21.5052 10.6245L19.9042 10.758C19.5918 8.75418 18.5358 6.99665 17.0272 5.77651L17.9437 4.45599C18.4041 3.79264 18.1993 2.87746 17.5 2.47372C16.8007 2.06999 15.9057 2.35016 15.5614 3.08056ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.135 16.75H12.863V9.63401H15.227V8.18201H8.77097V9.63401H11.135V16.75Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5614 3.08056L14.8769 4.53287C13.9841 4.18869 13.0141 4 12 4C10.9859 4 10.0159 4.18869 9.12308 4.53288L8.43854 3.08056C8.09427 2.35016 7.19926 2.06999 6.49997 2.47372C5.80068 2.87746 5.59581 3.79264 6.05622 4.45599L6.97279 5.77654C5.4642 6.99667 4.40818 8.75419 4.09584 10.758L2.49482 10.6245C1.69014 10.5575 1 11.1925 1 12C1 12.8074 1.69014 13.4425 2.49482 13.3754L4.09583 13.242C4.40816 15.2458 5.4642 17.0033 6.9728 18.2235L6.05628 19.5439C5.59587 20.2073 5.80074 21.1225 6.50003 21.5262C7.19933 21.93 8.09433 21.6498 8.4386 20.9194L9.12311 19.4671C10.0159 19.8113 10.9859 20 12 20C13.0141 20 13.9841 19.8113 14.8769 19.4671L15.5614 20.9194C15.9057 21.6498 16.8007 21.93 17.5 21.5262C18.1993 21.1225 18.4041 20.2073 17.9437 19.5439L17.0272 18.2235C18.5358 17.0033 19.5918 15.2458 19.9042 13.242L21.5052 13.3754C22.3099 13.4425 23 12.8074 23 12C23 11.1925 22.3099 10.5575 21.5052 10.6245L19.9042 10.758C19.5918 8.75418 18.5358 6.99665 17.0272 5.77651L17.9437 4.45599C18.4041 3.79264 18.1993 2.87746 17.5 2.47372C16.8007 2.06999 15.9057 2.35016 15.5614 3.08056ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-command-auto-track': ObiCommandAutoTrack;
  }
}
