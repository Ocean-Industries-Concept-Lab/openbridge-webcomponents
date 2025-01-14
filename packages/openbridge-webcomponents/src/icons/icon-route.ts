import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route')
export class ObiRoute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.38393 22V16H9.37615C12.1726 16 14.5365 18 15.3687 19C14.5365 20 12.1728 22 9.37633 22H3.38393ZM12.3374 19C12.2555 18.9466 12.1711 18.8937 12.0844 18.8418C11.2391 18.3361 10.3036 18 9.37615 18H5.3814V20H9.37633C10.3037 20 11.2392 19.6639 12.0844 19.1582C12.1711 19.1063 12.2555 19.0535 12.3374 19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8643 7C19.6917 7 20.3624 6.32843 20.3624 5.5C20.3624 4.67157 19.6917 4 18.8643 4C18.0369 4 17.3662 4.67157 17.3662 5.5C17.3662 6.32843 18.0369 7 18.8643 7ZM18.8643 9C20.7948 9 22.3599 7.433 22.3599 5.5C22.3599 3.567 20.7948 2 18.8643 2C16.9337 2 15.3687 3.567 15.3687 5.5C15.3687 7.433 16.9337 9 18.8643 9Z" fill="currentColor"/>
<path d="M9.87569 4H7.87822V6H9.87569V4Z" fill="currentColor"/>
<path d="M13.3713 4H11.3738V6H13.3713V4Z" fill="currentColor"/>
<path d="M9.87569 11H7.87822V13H9.87569V11Z" fill="currentColor"/>
<path d="M13.3713 11H11.3738V13H13.3713V11Z" fill="currentColor"/>
<path d="M16.8668 11H14.8694V13H16.8668V11Z" fill="currentColor"/>
<path d="M5.2052 6.63146L3.40439 5.59165C4.08721 4.76597 5.05491 4.18508 6.15667 4L6.15563 6.08134C5.79809 6.19395 5.47477 6.38385 5.2052 6.63146Z" fill="currentColor"/>
<path d="M5.2052 10.3685C5.47478 10.6162 5.7981 10.806 6.15563 10.9187L6.15667 13C5.05492 12.8149 4.08721 12.234 3.40439 11.4084L5.2052 10.3685Z" fill="currentColor"/>
<path d="M4.44409 9.0497C4.36593 8.69572 4.36593 8.30429 4.44409 7.9503L2.64383 6.90839C2.26521 7.9269 2.26521 9.0731 2.64383 10.0916L4.44409 9.0497Z" fill="currentColor"/>
<path d="M19.3164 13.6315L21.1172 12.5917C20.4344 11.766 19.4667 11.1851 18.3649 11L18.366 13.0813C18.7235 13.194 19.0468 13.3838 19.3164 13.6315Z" fill="currentColor"/>
<path d="M19.3164 17.3685C19.0468 17.6162 18.7235 17.806 18.366 17.9187L18.3649 20C19.4667 19.8149 20.4344 19.234 21.1172 18.4084L19.3164 17.3685Z" fill="currentColor"/>
<path d="M20.0775 16.0497C20.1557 15.6957 20.1557 15.3043 20.0775 14.9503L21.8778 13.9084C22.2564 14.9269 22.2564 16.0731 21.8778 17.0916L20.0775 16.0497Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.38393 22V16H9.37615C12.1726 16 14.5365 18 15.3687 19C14.5365 20 12.1728 22 9.37633 22H3.38393ZM12.3374 19C12.2555 18.9466 12.1711 18.8937 12.0844 18.8418C11.2391 18.3361 10.3036 18 9.37615 18H5.3814V20H9.37633C10.3037 20 11.2392 19.6639 12.0844 19.1582C12.1711 19.1063 12.2555 19.0535 12.3374 19Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8643 7C19.6917 7 20.3624 6.32843 20.3624 5.5C20.3624 4.67157 19.6917 4 18.8643 4C18.0369 4 17.3662 4.67157 17.3662 5.5C17.3662 6.32843 18.0369 7 18.8643 7ZM18.8643 9C20.7948 9 22.3599 7.433 22.3599 5.5C22.3599 3.567 20.7948 2 18.8643 2C16.9337 2 15.3687 3.567 15.3687 5.5C15.3687 7.433 16.9337 9 18.8643 9Z" style="fill: var(--element-active-color)"/>
<path d="M9.87569 4H7.87822V6H9.87569V4Z" style="fill: var(--element-active-color)"/>
<path d="M13.3713 4H11.3738V6H13.3713V4Z" style="fill: var(--element-active-color)"/>
<path d="M9.87569 11H7.87822V13H9.87569V11Z" style="fill: var(--element-active-color)"/>
<path d="M13.3713 11H11.3738V13H13.3713V11Z" style="fill: var(--element-active-color)"/>
<path d="M16.8668 11H14.8694V13H16.8668V11Z" style="fill: var(--element-active-color)"/>
<path d="M5.2052 6.63146L3.40439 5.59165C4.08721 4.76597 5.05491 4.18508 6.15667 4L6.15563 6.08134C5.79809 6.19395 5.47477 6.38385 5.2052 6.63146Z" style="fill: var(--element-active-color)"/>
<path d="M5.2052 10.3685C5.47478 10.6162 5.7981 10.806 6.15563 10.9187L6.15667 13C5.05492 12.8149 4.08721 12.234 3.40439 11.4084L5.2052 10.3685Z" style="fill: var(--element-active-color)"/>
<path d="M4.44409 9.0497C4.36593 8.69572 4.36593 8.30429 4.44409 7.9503L2.64383 6.90839C2.26521 7.9269 2.26521 9.0731 2.64383 10.0916L4.44409 9.0497Z" style="fill: var(--element-active-color)"/>
<path d="M19.3164 13.6315L21.1172 12.5917C20.4344 11.766 19.4667 11.1851 18.3649 11L18.366 13.0813C18.7235 13.194 19.0468 13.3838 19.3164 13.6315Z" style="fill: var(--element-active-color)"/>
<path d="M19.3164 17.3685C19.0468 17.6162 18.7235 17.806 18.366 17.9187L18.3649 20C19.4667 19.8149 20.4344 19.234 21.1172 18.4084L19.3164 17.3685Z" style="fill: var(--element-active-color)"/>
<path d="M20.0775 16.0497C20.1557 15.6957 20.1557 15.3043 20.0775 14.9503L21.8778 13.9084C22.2564 14.9269 22.2564 16.0731 21.8778 17.0916L20.0775 16.0497Z" style="fill: var(--element-active-color)"/>
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
    'obi-route': ObiRoute;
  }
}