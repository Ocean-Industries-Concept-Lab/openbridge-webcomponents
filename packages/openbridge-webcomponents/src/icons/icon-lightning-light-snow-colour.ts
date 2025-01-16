import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-light-snow-colour')
export class ObiLightningLightSnowColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4966 13.4933L18.5124 7.33325L14.6666 15.1333L17.2426 16.3333L15.5737 23.3333L20 14.6933L17.4966 13.4933Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" fill="currentColor"/>
<path d="M8.66675 27.2338C8.34788 27.0292 8.23863 26.5759 8.42273 26.2215L8.84538 25.4077H8.00004C7.63185 25.4077 7.33337 25.0759 7.33337 24.6666C7.33337 24.2573 7.63185 23.9255 8.00004 23.9255H8.84538L8.42273 23.1117C8.23863 22.7572 8.34788 22.304 8.66675 22.0993C8.98561 21.8947 9.39333 22.0161 9.57743 22.3706L10.0001 23.1844L10.4227 22.3706C10.6068 22.0161 11.0146 21.8947 11.3334 22.0993C11.6523 22.304 11.7615 22.7572 11.5774 23.1117L11.1548 23.9255H12C12.3682 23.9255 12.6667 24.2573 12.6667 24.6666C12.6667 25.0759 12.3682 25.4077 12 25.4077H11.1548L11.5774 26.2215C11.7615 26.5759 11.6523 27.0292 11.3334 27.2338C11.0146 27.4385 10.6068 27.317 10.4227 26.9626L10.0001 26.1488L9.57743 26.9626C9.39334 27.317 8.98561 27.4385 8.66675 27.2338Z" fill="currentColor"/>
<path d="M21.3334 26.5672C21.0146 26.3625 20.9053 25.9093 21.0894 25.5548L21.512 24.741H20.6667C20.2985 24.741 20 24.4092 20 23.9999C20 23.5906 20.2985 23.2588 20.6667 23.2588H21.512L21.0894 22.445C20.9053 22.0906 21.0146 21.6373 21.3334 21.4327C21.6523 21.228 22.06 21.3495 22.2441 21.7039L22.6667 22.5177L23.0894 21.7039C23.2735 21.3495 23.6812 21.228 24.0001 21.4327C24.3189 21.6373 24.4282 22.0906 24.2441 22.445L23.8215 23.2588H24.6667C25.0349 23.2588 25.3334 23.5906 25.3334 23.9999C25.3334 24.4092 25.0349 24.741 24.6667 24.741H23.8214L24.2441 25.5548C24.4282 25.9093 24.3189 26.3625 24.0001 26.5672C23.6812 26.7718 23.2735 26.6504 23.0894 26.2959L22.6667 25.4821L22.2441 26.2959C22.06 26.6504 21.6523 26.7718 21.3334 26.5672Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4966 13.4933L18.5124 7.33325L14.6666 15.1333L17.2426 16.3333L15.5737 23.3333L20 14.6933L17.4966 13.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L21.1867 15.3012C21.3507 14.9811 21.3784 14.6082 21.2635 14.2673C21.1486 13.9264 20.9008 13.6465 20.5764 13.491L18.975 12.7233L19.8281 7.55025C19.9356 6.89826 19.5494 6.26588 18.9202 6.06382C18.2911 5.86176 17.6089 6.15099 17.3166 6.74366L13.4708 14.5437C13.3122 14.8654 13.2899 15.2375 13.409 15.5759C13.5281 15.9143 13.7785 16.1904 14.1037 16.3419L15.6933 17.0825L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50176 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path d="M12.4614 7.11736C13.5609 4.78582 15.7936 3.33325 18.2393 3.33325C21.3737 3.33325 24.1293 5.79117 24.6555 9.10942L24.7566 9.74697L25.3793 9.91734C26.8572 10.3217 28 11.7971 28 13.5765C28 15.6987 26.363 17.3333 24.4824 17.3333H20.1457L19.1211 19.3333H24.4824C27.5587 19.3333 30 16.71 30 13.5765C30 11.1904 28.597 9.05046 26.5148 8.19534C25.6239 4.28953 22.2431 1.33325 18.2393 1.33325C15.2594 1.33325 12.5728 2.95032 11.0544 5.50734C10.8432 5.47326 10.6339 5.45799 10.4275 5.45799C8.93646 5.45799 7.63403 6.25968 6.92203 7.48775C5.38205 7.51112 3.95631 8.16348 2.91121 9.31116C1.89911 10.424 1.33337 11.8605 1.33337 13.3769V13.4549L1.33364 13.4664C1.37027 15.059 1.95818 16.5395 3.06133 17.6353C4.09608 18.7254 5.51463 19.3333 7.00788 19.3333H15.1567L15.6336 17.3333H7.00788C6.06001 17.3333 5.16232 16.9481 4.504 16.25L4.49175 16.2371L4.47904 16.2245C3.77303 15.5276 3.36175 14.5558 3.33337 13.4314V13.3769C3.33337 12.3653 3.70873 11.4069 4.39061 10.657C5.08296 9.89685 6.00825 9.4871 7.00789 9.4871C7.20215 9.4871 7.27659 9.48909 7.3672 9.5051L8.1991 9.65211L8.48304 8.85646C8.78596 8.00763 9.54947 7.45799 10.4275 7.45799C10.6813 7.45799 10.9179 7.50177 11.1528 7.60555L12.0452 7.99982L12.4614 7.11736Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path d="M8.66675 27.2338C8.34788 27.0292 8.23863 26.5759 8.42273 26.2215L8.84538 25.4077H8.00004C7.63185 25.4077 7.33337 25.0759 7.33337 24.6666C7.33337 24.2573 7.63185 23.9255 8.00004 23.9255H8.84538L8.42273 23.1117C8.23863 22.7572 8.34788 22.304 8.66675 22.0993C8.98561 21.8947 9.39333 22.0161 9.57743 22.3706L10.0001 23.1844L10.4227 22.3706C10.6068 22.0161 11.0146 21.8947 11.3334 22.0993C11.6523 22.304 11.7615 22.7572 11.5774 23.1117L11.1548 23.9255H12C12.3682 23.9255 12.6667 24.2573 12.6667 24.6666C12.6667 25.0759 12.3682 25.4077 12 25.4077H11.1548L11.5774 26.2215C11.7615 26.5759 11.6523 27.0292 11.3334 27.2338C11.0146 27.4385 10.6068 27.317 10.4227 26.9626L10.0001 26.1488L9.57743 26.9626C9.39334 27.317 8.98561 27.4385 8.66675 27.2338Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M21.3334 26.5672C21.0146 26.3625 20.9053 25.9093 21.0894 25.5548L21.512 24.741H20.6667C20.2985 24.741 20 24.4092 20 23.9999C20 23.5906 20.2985 23.2588 20.6667 23.2588H21.512L21.0894 22.445C20.9053 22.0906 21.0146 21.6373 21.3334 21.4327C21.6523 21.228 22.06 21.3495 22.2441 21.7039L22.6667 22.5177L23.0894 21.7039C23.2735 21.3495 23.6812 21.228 24.0001 21.4327C24.3189 21.6373 24.4282 22.0906 24.2441 22.445L23.8215 23.2588H24.6667C25.0349 23.2588 25.3334 23.5906 25.3334 23.9999C25.3334 24.4092 25.0349 24.741 24.6667 24.741H23.8214L24.2441 25.5548C24.4282 25.9093 24.3189 26.3625 24.0001 26.5672C23.6812 26.7718 23.2735 26.6504 23.0894 26.2959L22.6667 25.4821L22.2441 26.2959C22.06 26.6504 21.6523 26.7718 21.3334 26.5672Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-lightning-light-snow-colour': ObiLightningLightSnowColour;
  }
}
