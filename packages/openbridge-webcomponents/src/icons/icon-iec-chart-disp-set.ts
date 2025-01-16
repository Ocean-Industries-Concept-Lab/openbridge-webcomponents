import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-iec-chart-disp-set')
export class ObiIecChartDispSet extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.35986 6.25C4.70707 6.25 6.60986 4.34721 6.60986 2H8.10986C8.10986 5.17564 5.5355 7.75 2.35986 7.75V6.25Z" fill="currentColor"/>
<path d="M22.3599 17.75C20.0127 17.75 18.1099 19.6528 18.1099 22H16.6099C16.6099 18.8244 19.1842 16.25 22.3599 16.25V17.75Z" fill="currentColor"/>
<path d="M21.6481 14.7844C21.882 14.7617 22.1195 14.75 22.3599 14.75V13.25C22.0709 13.25 21.785 13.264 21.5028 13.2915L21.6481 14.7844Z" fill="currentColor"/>
<path d="M18.9421 15.6043C19.3572 15.3821 19.7962 15.1991 20.2543 15.0603L19.8193 13.6247C19.2655 13.7925 18.7351 14.0136 18.2339 14.2821L18.9421 15.6043Z" fill="currentColor"/>
<path d="M16.755 17.4009C17.0567 17.0338 17.3937 16.6968 17.7608 16.3952L16.8085 15.2362C16.3659 15.5998 15.9597 16.0061 15.5961 16.4487L16.755 17.4009Z" fill="currentColor"/>
<path d="M15.4202 19.8944C15.5589 19.4363 15.7419 18.9973 15.9642 18.5823L14.6419 17.874C14.3735 18.3752 14.1524 18.9057 13.9846 19.4595L15.4202 19.8944Z" fill="currentColor"/>
<path d="M15.1099 22C15.1099 21.7596 15.1215 21.5222 15.1443 21.2882L13.6514 21.1429C13.6239 21.4251 13.6099 21.711 13.6099 22H15.1099Z" fill="currentColor"/>
<path d="M2.35986 9.25C2.60025 9.25 2.83768 9.23833 3.07166 9.21556L3.21695 10.7085C2.93476 10.736 2.64884 10.75 2.35986 10.75V9.25Z" fill="currentColor"/>
<path d="M4.46546 8.93971C4.92356 8.80092 5.36258 8.61794 5.77759 8.39566L6.48582 9.71793C5.98467 9.98635 5.45419 10.2075 4.90039 10.3753L4.46546 8.93971Z" fill="currentColor"/>
<path d="M6.95897 7.60483C7.32608 7.30321 7.66307 6.96622 7.96469 6.5991L9.12367 7.55135C8.76003 7.99394 8.3538 8.40017 7.91121 8.76381L6.95897 7.60483Z" fill="currentColor"/>
<path d="M8.75552 5.41773C8.97781 5.00271 9.16079 4.5637 9.29958 4.1056L10.7351 4.54053C10.5674 5.09433 10.3462 5.62481 10.0778 6.12596L8.75552 5.41773Z" fill="currentColor"/>
<path d="M9.57542 2.71179C9.59819 2.47782 9.60987 2.24038 9.60987 2H11.1099C11.1099 2.28898 11.0958 2.5749 11.0684 2.85709L9.57542 2.71179Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9535 6.88066C16.58 6.88608 17.1945 6.95679 17.7392 7.05028C17.8327 7.59506 17.9034 8.20954 17.9089 8.83599C17.9205 10.1789 17.6327 11.3995 16.8271 12.205L9.96107 19.0711L5.71843 14.8285L12.5845 7.96237C13.39 7.15686 14.6106 6.86906 15.9535 6.88066ZM15.7665 11.1444L9.96107 16.9498L7.83975 14.8285L13.6452 9.02303C14.0332 8.63496 14.7619 8.37042 15.9406 8.38061C16.091 8.38191 16.242 8.38774 16.3922 8.39735C16.4018 8.54756 16.4076 8.69848 16.4089 8.84896C16.4191 10.0276 16.1546 10.7563 15.7665 11.1444Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.35986 6.25C4.70707 6.25 6.60986 4.34721 6.60986 2H8.10986C8.10986 5.17564 5.5355 7.75 2.35986 7.75V6.25Z" style="fill: var(--element-active-color)"/>
<path d="M22.3599 17.75C20.0127 17.75 18.1099 19.6528 18.1099 22H16.6099C16.6099 18.8244 19.1842 16.25 22.3599 16.25V17.75Z" style="fill: var(--element-active-color)"/>
<path d="M21.6481 14.7844C21.882 14.7617 22.1195 14.75 22.3599 14.75V13.25C22.0709 13.25 21.785 13.264 21.5028 13.2915L21.6481 14.7844Z" style="fill: var(--element-active-color)"/>
<path d="M18.9421 15.6043C19.3572 15.3821 19.7962 15.1991 20.2543 15.0603L19.8193 13.6247C19.2655 13.7925 18.7351 14.0136 18.2339 14.2821L18.9421 15.6043Z" style="fill: var(--element-active-color)"/>
<path d="M16.755 17.4009C17.0567 17.0338 17.3937 16.6968 17.7608 16.3952L16.8085 15.2362C16.3659 15.5998 15.9597 16.0061 15.5961 16.4487L16.755 17.4009Z" style="fill: var(--element-active-color)"/>
<path d="M15.4202 19.8944C15.5589 19.4363 15.7419 18.9973 15.9642 18.5823L14.6419 17.874C14.3735 18.3752 14.1524 18.9057 13.9846 19.4595L15.4202 19.8944Z" style="fill: var(--element-active-color)"/>
<path d="M15.1099 22C15.1099 21.7596 15.1215 21.5222 15.1443 21.2882L13.6514 21.1429C13.6239 21.4251 13.6099 21.711 13.6099 22H15.1099Z" style="fill: var(--element-active-color)"/>
<path d="M2.35986 9.25C2.60025 9.25 2.83768 9.23833 3.07166 9.21556L3.21695 10.7085C2.93476 10.736 2.64884 10.75 2.35986 10.75V9.25Z" style="fill: var(--element-active-color)"/>
<path d="M4.46546 8.93971C4.92356 8.80092 5.36258 8.61794 5.77759 8.39566L6.48582 9.71793C5.98467 9.98635 5.45419 10.2075 4.90039 10.3753L4.46546 8.93971Z" style="fill: var(--element-active-color)"/>
<path d="M6.95897 7.60483C7.32608 7.30321 7.66307 6.96622 7.96469 6.5991L9.12367 7.55135C8.76003 7.99394 8.3538 8.40017 7.91121 8.76381L6.95897 7.60483Z" style="fill: var(--element-active-color)"/>
<path d="M8.75552 5.41773C8.97781 5.00271 9.16079 4.5637 9.29958 4.1056L10.7351 4.54053C10.5674 5.09433 10.3462 5.62481 10.0778 6.12596L8.75552 5.41773Z" style="fill: var(--element-active-color)"/>
<path d="M9.57542 2.71179C9.59819 2.47782 9.60987 2.24038 9.60987 2H11.1099C11.1099 2.28898 11.0958 2.5749 11.0684 2.85709L9.57542 2.71179Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9535 6.88066C16.58 6.88608 17.1945 6.95679 17.7392 7.05028C17.8327 7.59506 17.9034 8.20954 17.9089 8.83599C17.9205 10.1789 17.6327 11.3995 16.8271 12.205L9.96107 19.0711L5.71843 14.8285L12.5845 7.96237C13.39 7.15686 14.6106 6.86906 15.9535 6.88066ZM15.7665 11.1444L9.96107 16.9498L7.83975 14.8285L13.6452 9.02303C14.0332 8.63496 14.7619 8.37042 15.9406 8.38061C16.091 8.38191 16.242 8.38774 16.3922 8.39735C16.4018 8.54756 16.4076 8.69848 16.4089 8.84896C16.4191 10.0276 16.1546 10.7563 15.7665 11.1444Z" style="fill: var(--element-active-color)"/>
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
    'obi-iec-chart-disp-set': ObiIecChartDispSet;
  }
}
