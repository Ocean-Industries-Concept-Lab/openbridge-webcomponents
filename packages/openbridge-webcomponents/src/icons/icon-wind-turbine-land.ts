import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wind-turbine-land')
export class ObiWindTurbineLand extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4576 3.42866L11.6272 6.52772C10.545 6.68951 9.68945 7.54501 9.52762 8.62727L4.4967 9.9753C4.78259 11.0422 5.87926 11.6754 6.94619 11.3895L10.0455 10.5591C10.3003 10.8781 10.6315 11.1334 11.0115 11.2971V17.5573H12.9885V11.4028L16.5962 15.0105C17.3773 14.2295 17.3773 12.9631 16.5962 12.1821L14.3278 9.91368C14.439 9.6307 14.5 9.32254 14.5 9.00012C14.5 8.20903 14.1326 7.50375 13.559 7.04566L14.9071 2.01445C13.8402 1.72856 12.7435 2.36173 12.4576 3.42866ZM12 10.0001C11.4477 10.0001 11 9.55241 11 9.00012C11 8.44784 11.4477 8.00012 12 8.00012C12.5523 8.00012 13 8.44784 13 9.00012C13 9.55241 12.5523 10.0001 12 10.0001Z" fill="currentColor"/>
<path d="M21 19.0001V21.0001H3V19.0001H21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4576 3.42866L11.6272 6.52772C10.545 6.68951 9.68945 7.54501 9.52762 8.62727L4.4967 9.9753C4.78259 11.0422 5.87926 11.6754 6.94619 11.3895L10.0455 10.5591C10.3003 10.8781 10.6315 11.1334 11.0115 11.2971V17.5573H12.9885V11.4028L16.5962 15.0105C17.3773 14.2295 17.3773 12.9631 16.5962 12.1821L14.3278 9.91368C14.439 9.6307 14.5 9.32254 14.5 9.00012C14.5 8.20903 14.1326 7.50375 13.559 7.04566L14.9071 2.01445C13.8402 1.72856 12.7435 2.36173 12.4576 3.42866ZM12 10.0001C11.4477 10.0001 11 9.55241 11 9.00012C11 8.44784 11.4477 8.00012 12 8.00012C12.5523 8.00012 13 8.44784 13 9.00012C13 9.55241 12.5523 10.0001 12 10.0001Z" style="fill: var(--element-active-color)"/>
<path d="M21 19.0001V21.0001H3V19.0001H21Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-turbine-land': ObiWindTurbineLand;
  }
}
