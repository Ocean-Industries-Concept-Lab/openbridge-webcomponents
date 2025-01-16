import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-command-in')
export class ObiCommandIn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 12C15 13.6568 13.6569 15 12 15C10.3431 15 9 13.6568 9 12C9 10.3431 10.3431 8.99997 12 8.99997C13.6569 8.99997 15 10.3431 15 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.54478 17.3994C6.2728 16.3486 5.37838 14.8571 5.09546 13.1587L2.49482 13.3754C1.69014 13.4425 1 12.8074 1 12C1 11.1925 1.69014 10.5575 2.49482 10.6245L5.09546 10.8413C5.37837 9.14286 6.27278 7.65133 7.54474 6.60059L6.05622 4.45599C5.59581 3.79264 5.80068 2.87746 6.49997 2.47372C7.19926 2.06999 8.09427 2.35016 8.43854 3.08056L9.55082 5.44039C10.3131 5.15564 11.1384 4.99997 12 4.99997C12.8616 4.99997 13.6868 5.15563 14.4491 5.44037L15.5614 3.08056C15.9057 2.35016 16.8007 2.06999 17.5 2.47372C18.1993 2.87746 18.4041 3.79264 17.9437 4.45599L16.4552 6.60056C17.7272 7.6513 18.6216 9.14285 18.9045 10.8413L21.5052 10.6245C22.3099 10.5575 23 11.1925 23 12C23 12.8074 22.3099 13.4425 21.5052 13.3754L18.9045 13.1587C18.6216 14.8571 17.7272 16.3486 16.4552 17.3994L17.9437 19.5439C18.4041 20.2073 18.1993 21.1225 17.5 21.5262C16.8007 21.93 15.9057 21.6498 15.5614 20.9194L14.4491 18.5596C13.6868 18.8443 12.8616 19 12 19C11.1384 19 10.3132 18.8443 9.55087 18.5596L8.4386 20.9194C8.09433 21.6498 7.19933 21.93 6.50003 21.5262C5.80074 21.1225 5.59587 20.2073 6.05628 19.5439L7.54478 17.3994ZM12 6.99997C12.915 6.99997 13.7885 7.2591 14.577 7.71438C15.3019 8.15121 15.9069 8.76675 16.3311 9.5C16.7565 10.2354 17 11.0893 17 12C17 12.9107 16.7565 13.7645 16.3311 14.4999C15.8718 15.2939 15.2053 15.9228 14.4148 16.3792C13.699 16.7748 12.8758 17 12 17C11.1243 17 10.3012 16.7748 9.58535 16.3793C8.79482 15.9229 8.12823 15.294 7.66889 14.4999C7.24348 13.7645 7 12.9107 7 12C7 11.0893 7.24348 10.2354 7.66889 9.5C8.09329 8.76633 8.69876 8.1505 9.42419 7.71363C10.2123 7.25862 11.0856 6.99997 12 6.99997Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 12C15 13.6568 13.6569 15 12 15C10.3431 15 9 13.6568 9 12C9 10.3431 10.3431 8.99997 12 8.99997C13.6569 8.99997 15 10.3431 15 12Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.54478 17.3994C6.2728 16.3486 5.37838 14.8571 5.09546 13.1587L2.49482 13.3754C1.69014 13.4425 1 12.8074 1 12C1 11.1925 1.69014 10.5575 2.49482 10.6245L5.09546 10.8413C5.37837 9.14286 6.27278 7.65133 7.54474 6.60059L6.05622 4.45599C5.59581 3.79264 5.80068 2.87746 6.49997 2.47372C7.19926 2.06999 8.09427 2.35016 8.43854 3.08056L9.55082 5.44039C10.3131 5.15564 11.1384 4.99997 12 4.99997C12.8616 4.99997 13.6868 5.15563 14.4491 5.44037L15.5614 3.08056C15.9057 2.35016 16.8007 2.06999 17.5 2.47372C18.1993 2.87746 18.4041 3.79264 17.9437 4.45599L16.4552 6.60056C17.7272 7.6513 18.6216 9.14285 18.9045 10.8413L21.5052 10.6245C22.3099 10.5575 23 11.1925 23 12C23 12.8074 22.3099 13.4425 21.5052 13.3754L18.9045 13.1587C18.6216 14.8571 17.7272 16.3486 16.4552 17.3994L17.9437 19.5439C18.4041 20.2073 18.1993 21.1225 17.5 21.5262C16.8007 21.93 15.9057 21.6498 15.5614 20.9194L14.4491 18.5596C13.6868 18.8443 12.8616 19 12 19C11.1384 19 10.3132 18.8443 9.55087 18.5596L8.4386 20.9194C8.09433 21.6498 7.19933 21.93 6.50003 21.5262C5.80074 21.1225 5.59587 20.2073 6.05628 19.5439L7.54478 17.3994ZM12 6.99997C12.915 6.99997 13.7885 7.2591 14.577 7.71438C15.3019 8.15121 15.9069 8.76675 16.3311 9.5C16.7565 10.2354 17 11.0893 17 12C17 12.9107 16.7565 13.7645 16.3311 14.4999C15.8718 15.2939 15.2053 15.9228 14.4148 16.3792C13.699 16.7748 12.8758 17 12 17C11.1243 17 10.3012 16.7748 9.58535 16.3793C8.79482 15.9229 8.12823 15.294 7.66889 14.4999C7.24348 13.7645 7 12.9107 7 12C7 11.0893 7.24348 10.2354 7.66889 9.5C8.09329 8.76633 8.69876 8.1505 9.42419 7.71363C10.2123 7.25862 11.0856 6.99997 12 6.99997Z" style="fill: var(--element-active-color)"/>
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
    'obi-command-in': ObiCommandIn;
  }
}
