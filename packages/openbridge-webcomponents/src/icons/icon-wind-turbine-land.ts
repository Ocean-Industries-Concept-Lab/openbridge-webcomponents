import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wind-turbine-land')
export class ObiWindTurbineLand extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5424 3.42866L12.3728 6.52772C13.455 6.68951 14.3105 7.54501 14.4724 8.62727L19.5033 9.9753C19.2174 11.0422 18.1207 11.6754 17.0538 11.3895L13.9545 10.5591C13.6997 10.8781 13.3685 11.1334 12.9885 11.2971V17.5573H11.0115V11.4028L7.40378 15.0105C6.62273 14.2295 6.62273 12.9631 7.40378 12.1821L9.67218 9.91368C9.56103 9.6307 9.5 9.32254 9.5 9.00012C9.5 8.20903 9.86745 7.50375 10.441 7.04566L9.09287 2.01445C10.1598 1.72856 11.2565 2.36173 11.5424 3.42866ZM12 10.0001C12.5523 10.0001 13 9.55241 13 9.00012C13 8.44784 12.5523 8.00012 12 8.00012C11.4477 8.00012 11 8.44784 11 9.00012C11 9.55241 11.4477 10.0001 12 10.0001Z" fill="currentColor"/>
<path d="M3 19.0001V21.0001H21V19.0001H3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5424 3.42866L12.3728 6.52772C13.455 6.68951 14.3105 7.54501 14.4724 8.62727L19.5033 9.9753C19.2174 11.0422 18.1207 11.6754 17.0538 11.3895L13.9545 10.5591C13.6997 10.8781 13.3685 11.1334 12.9885 11.2971V17.5573H11.0115V11.4028L7.40378 15.0105C6.62273 14.2295 6.62273 12.9631 7.40378 12.1821L9.67218 9.91368C9.56103 9.6307 9.5 9.32254 9.5 9.00012C9.5 8.20903 9.86745 7.50375 10.441 7.04566L9.09287 2.01445C10.1598 1.72856 11.2565 2.36173 11.5424 3.42866ZM12 10.0001C12.5523 10.0001 13 9.55241 13 9.00012C13 8.44784 12.5523 8.00012 12 8.00012C11.4477 8.00012 11 8.44784 11 9.00012C11 9.55241 11.4477 10.0001 12 10.0001Z" style="fill: var(--element-active-color)"/>
<path d="M3 19.0001V21.0001H21V19.0001H3Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-turbine-land': ObiWindTurbineLand;
  }
}