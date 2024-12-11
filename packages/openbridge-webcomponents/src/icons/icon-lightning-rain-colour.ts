import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-rain-colour')
export class ObiLightningRainColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4969 13.493L18.5128 7.33301L14.667 15.133L17.243 16.333L15.574 23.333L20.0003 14.693L17.4969 13.493Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21141 23.337C9.48204 22.7506 10.1212 22.5309 10.6897 22.7495L10.6999 22.7534L10.7098 22.758C11.2961 23.0286 11.5159 23.6678 11.2972 24.2363L11.2918 24.2504L10.1734 26.8058C9.9866 27.2664 9.56455 27.49 9.13007 27.49C8.97914 27.49 8.80989 27.444 8.70466 27.4089L8.68714 27.403L8.67038 27.3953C8.08402 27.1247 7.86428 26.4855 8.08295 25.917L8.08837 25.9029L9.21141 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.2114 22.0036C25.482 21.4173 26.1212 21.1975 26.6897 21.4162L26.6999 21.4201L26.7098 21.4247C27.2961 21.6953 27.5159 22.3344 27.2972 22.903L27.2918 22.9171L26.1734 25.4724C25.9866 25.9331 25.5646 26.1567 25.1301 26.1567C24.9791 26.1567 24.8099 26.1106 24.7047 26.0755L24.6871 26.0697L24.6704 26.062C24.084 25.7913 23.8643 25.1522 24.083 24.5837L24.0884 24.5696L25.2114 22.0036Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8154 22.7506 19.4545 22.5309 20.0231 22.7495L20.0332 22.7534L20.0431 22.758C20.6294 23.0286 20.8492 23.6678 20.6305 24.2363L20.6251 24.2504L19.5067 26.8058C19.3199 27.2664 18.8979 27.49 18.4634 27.49C18.3125 27.49 18.1432 27.444 18.038 27.4089L18.0205 27.403L18.0037 27.3953C17.4174 27.1247 17.1976 26.4855 17.4163 25.917L17.4217 25.9029L18.5447 23.337Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4969 13.493L18.5128 7.33301L14.667 15.133L17.243 16.333L15.574 23.333L20.0003 14.693L17.4969 13.493Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-rain-secondary-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21141 23.337C9.48204 22.7506 10.1212 22.5309 10.6897 22.7495L10.6999 22.7534L10.7098 22.758C11.2961 23.0286 11.5159 23.6678 11.2972 24.2363L11.2918 24.2504L10.1734 26.8058C9.9866 27.2664 9.56455 27.49 9.13007 27.49C8.97914 27.49 8.80989 27.444 8.70466 27.4089L8.68714 27.403L8.67038 27.3953C8.08402 27.1247 7.86428 26.4855 8.08295 25.917L8.08837 25.9029L9.21141 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.2114 22.0036C25.482 21.4173 26.1212 21.1975 26.6897 21.4162L26.6999 21.4201L26.7098 21.4247C27.2961 21.6953 27.5159 22.3344 27.2972 22.903L27.2918 22.9171L26.1734 25.4724C25.9866 25.9331 25.5646 26.1567 25.1301 26.1567C24.9791 26.1567 24.8099 26.1106 24.7047 26.0755L24.6871 26.0697L24.6704 26.062C24.084 25.7913 23.8643 25.1522 24.083 24.5837L24.0884 24.5696L25.2114 22.0036Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8154 22.7506 19.4545 22.5309 20.0231 22.7495L20.0332 22.7534L20.0431 22.758C20.6294 23.0286 20.8492 23.6678 20.6305 24.2363L20.6251 24.2504L19.5067 26.8058C19.3199 27.2664 18.8979 27.49 18.4634 27.49C18.3125 27.49 18.1432 27.444 18.038 27.4089L18.0205 27.403L18.0037 27.3953C17.4174 27.1247 17.1976 26.4855 17.4163 25.917L17.4217 25.9029L18.5447 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
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
    'obi-lightning-rain-colour': ObiLightningRainColour;
  }
}
