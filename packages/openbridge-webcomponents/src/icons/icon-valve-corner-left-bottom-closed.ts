import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-corner-left-bottom-closed')
export class ObiValveCornerLeftBottomClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2002 15.0665C11.6002 14.5334 12.3998 14.5334 12.7998 15.0665L16.7998 20.3996C17.2942 21.0588 16.824 22.0001 16 22.0001H8C7.17595 22.0001 6.70577 21.0588 7.2002 20.3996L11.2002 15.0665Z" fill="currentColor"/>
<path d="M2 8.00014C2 7.17613 2.94038 6.70602 3.59961 7.20033L8.93359 11.2003C9.46653 11.6004 9.46663 12.4 8.93359 12.7999L3.59961 16.7999C2.94042 17.2941 2.00011 16.824 2 16.0001V8.00014Z" fill="currentColor"/>
<path d="M11.2002 15.0665C11.6002 14.5334 12.3998 14.5334 12.7998 15.0665L16.7998 20.3996C17.2942 21.0588 16.824 22.0001 16 22.0001H8C7.17595 22.0001 6.70577 21.0588 7.2002 20.3996L11.2002 15.0665ZM2 8.00014C2 7.17613 2.94038 6.70602 3.59961 7.20033L8.93359 11.2003C9.46653 11.6004 9.46662 12.4 8.93359 12.7999L3.59961 16.7999C2.94042 17.2941 2.00011 16.824 2 16.0001V8.00014Z" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2002 15.0665C11.6002 14.5334 12.3998 14.5334 12.7998 15.0665L16.7998 20.3996C17.2942 21.0588 16.824 22.0001 16 22.0001H8C7.17595 22.0001 6.70577 21.0588 7.2002 20.3996L11.2002 15.0665Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M2 8.00014C2 7.17613 2.94038 6.70602 3.59961 7.20033L8.93359 11.2003C9.46653 11.6004 9.46663 12.4 8.93359 12.7999L3.59961 16.7999C2.94042 17.2941 2.00011 16.824 2 16.0001V8.00014Z" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M11.2002 15.0665C11.6002 14.5334 12.3998 14.5334 12.7998 15.0665L16.7998 20.3996C17.2942 21.0588 16.824 22.0001 16 22.0001H8C7.17595 22.0001 6.70577 21.0588 7.2002 20.3996L11.2002 15.0665ZM2 8.00014C2 7.17613 2.94038 6.70602 3.59961 7.20033L8.93359 11.2003C9.46653 11.6004 9.46662 12.4 8.93359 12.7999L3.59961 16.7999C2.94042 17.2941 2.00011 16.824 2 16.0001V8.00014Z" style="stroke: var(--automation-symbol-off-border-color)"/>
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
    'obi-valve-corner-left-bottom-closed': ObiValveCornerLeftBottomClosed;
  }
}
