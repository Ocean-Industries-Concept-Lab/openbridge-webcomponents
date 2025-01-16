import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-light-rain-colour')
export class ObiLightningLightRainColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4966 13.4933L18.5124 7.33325L14.6666 15.1333L17.2426 16.3333L15.5737 23.3333L20 14.6933L17.4966 13.4933Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.87804 23.337C8.14866 22.7506 8.78781 22.5309 9.35635 22.7495L9.3665 22.7534L9.37638 22.758C9.96273 23.0286 10.1825 23.6678 9.96381 24.2363L9.95839 24.2504L8.84004 26.8058C8.65323 27.2664 8.23118 27.49 7.79669 27.49C7.64576 27.49 7.47651 27.444 7.37128 27.4089L7.35377 27.403L7.33701 27.3953C6.75065 27.1247 6.53091 26.4855 6.74958 25.917L6.75499 25.9029L7.87804 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2114 22.0036C21.482 21.4173 22.1211 21.1975 22.6897 21.4162L22.6998 21.4201L22.7097 21.4247C23.2961 21.6953 23.5158 22.3344 23.2971 22.903L23.2917 22.9171L22.1734 25.4724C21.9866 25.9331 21.5645 26.1567 21.13 26.1567C20.9791 26.1567 20.8098 26.1106 20.7046 26.0755L20.6871 26.0697L20.6703 26.062C20.084 25.7913 19.8642 25.1522 20.0829 24.5837L20.0883 24.5696L21.2114 22.0036Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4966 13.4933L18.5124 7.33325L14.6666 15.1333L17.2426 16.3333L15.5737 23.3333L20 14.6933L17.4966 13.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.87804 23.337C8.14866 22.7506 8.78781 22.5309 9.35635 22.7495L9.3665 22.7534L9.37638 22.758C9.96273 23.0286 10.1825 23.6678 9.96381 24.2363L9.95839 24.2504L8.84004 26.8058C8.65323 27.2664 8.23118 27.49 7.79669 27.49C7.64576 27.49 7.47651 27.444 7.37128 27.4089L7.35377 27.403L7.33701 27.3953C6.75065 27.1247 6.53091 26.4855 6.74958 25.917L6.75499 25.9029L7.87804 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2114 22.0036C21.482 21.4173 22.1211 21.1975 22.6897 21.4162L22.6998 21.4201L22.7097 21.4247C23.2961 21.6953 23.5158 22.3344 23.2971 22.903L23.2917 22.9171L22.1734 25.4724C21.9866 25.9331 21.5645 26.1567 21.13 26.1567C20.9791 26.1567 20.8098 26.1106 20.7046 26.0755L20.6871 26.0697L20.6703 26.062C20.084 25.7913 19.8642 25.1522 20.0829 24.5837L20.0883 24.5696L21.2114 22.0036Z" style="fill: var(--data-weather-rain-primary-color)"/>
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
    'obi-lightning-light-rain-colour': ObiLightningLightRainColour;
  }
}
