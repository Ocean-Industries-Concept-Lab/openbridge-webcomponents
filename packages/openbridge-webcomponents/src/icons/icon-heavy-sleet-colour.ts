import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-sleet-colour')
export class ObiHeavySleetColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.2113 22.0037C25.482 21.4174 26.1211 21.1976 26.6896 21.4163L26.6998 21.4202L26.7097 21.4247C27.296 21.6954 27.5158 22.3345 27.2971 22.9031L27.2917 22.9171L26.1733 25.4725C25.9865 25.9332 25.5645 26.1567 25.13 26.1567C24.9791 26.1567 24.8098 26.1107 24.7046 26.0756L24.6871 26.0698L24.6703 26.0621C24.0839 25.7914 23.8642 25.1523 24.0829 24.5837L24.0883 24.5697L25.2113 22.0037Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.878 20.6704C16.1486 20.084 16.7878 19.8643 17.3563 20.0829L17.3665 20.0869L17.3763 20.0914C17.9627 20.362 18.1824 21.0012 17.9638 21.5697L17.9583 21.5838L16.84 24.1392C16.6532 24.5999 16.2311 24.8234 15.7967 24.8234C15.6457 24.8234 15.4765 24.7774 15.3712 24.7423L15.3537 24.7365L15.337 24.7287C14.7506 24.4581 14.5309 23.819 14.7495 23.2504L14.755 23.2363L15.878 20.6704Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5447 24.6704C10.8153 24.084 11.4544 23.8643 12.023 24.0829L12.0331 24.0869L12.043 24.0914C12.6294 24.362 12.8491 25.0012 12.6304 25.5697L12.625 25.5838L11.5067 28.1392C11.3199 28.5999 10.8978 28.8234 10.4633 28.8234C10.3124 28.8234 10.1431 28.7774 10.0379 28.7423L10.0204 28.7365L10.0036 28.7287C9.41728 28.4581 9.19753 27.819 9.4162 27.2504L9.42162 27.2363L10.5447 24.6704Z" fill="currentColor"/>
<path d="M5.33337 25.2339C5.01451 25.0293 4.90526 24.576 5.08936 24.2216L5.51201 23.4078H4.66667C4.29848 23.4078 4 23.076 4 22.6667C4 22.2574 4.29848 21.9256 4.66667 21.9256H5.512L5.08936 21.1118C4.90526 20.7573 5.01451 20.3041 5.33337 20.0994C5.65223 19.8948 6.05996 20.0162 6.24406 20.3707L6.66671 21.1845L7.08936 20.3707C7.27345 20.0162 7.68118 19.8948 8.00004 20.0994C8.3189 20.3041 8.42815 20.7573 8.24406 21.1118L7.82141 21.9256H8.66667C9.03486 21.9256 9.33333 22.2574 9.33333 22.6667C9.33333 23.076 9.03486 23.4078 8.66667 23.4078H7.8214L8.24406 24.2216C8.42815 24.576 8.3189 25.0293 8.00004 25.2339C7.68118 25.4386 7.27345 25.3171 7.08936 24.9627L6.66671 24.1489L6.24406 24.9627C6.05996 25.3171 5.65223 25.4386 5.33337 25.2339Z" fill="currentColor"/>
<path d="M18.6667 29.2339C18.3478 29.0293 18.2386 28.576 18.4227 28.2216L18.8453 27.4078H18C17.6318 27.4078 17.3333 27.076 17.3333 26.6667C17.3333 26.2574 17.6318 25.9256 18 25.9256H18.8453L18.4227 25.1118C18.2386 24.7573 18.3478 24.3041 18.6667 24.0994C18.9856 23.8948 19.3933 24.0162 19.5774 24.3707L20 25.1845L20.4227 24.3707C20.6068 24.0162 21.0145 23.8948 21.3334 24.0994C21.6522 24.3041 21.7615 24.7573 21.5774 25.1118L21.1547 25.9256H22C22.3682 25.9256 22.6667 26.2574 22.6667 26.6667C22.6667 27.076 22.3682 27.4078 22 27.4078H21.1547L21.5774 28.2216C21.7615 28.576 21.6522 29.0293 21.3334 29.2339C21.0145 29.4386 20.6068 29.3171 20.4227 28.9627L20 28.1489L19.5774 28.9627C19.3933 29.3171 18.9856 29.4386 18.6667 29.2339Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2391 3.33325C15.7935 3.33325 13.5607 4.78582 12.4613 7.11736L12.0451 7.99982L11.1527 7.60555C10.9177 7.50176 10.6811 7.45799 10.4274 7.45799C9.54935 7.45799 8.78584 8.00763 8.48292 8.85646L8.19898 9.65211L7.36708 9.5051C7.27647 9.48909 7.20203 9.4871 7.00777 9.4871C6.00812 9.4871 5.08283 9.89685 4.39048 10.657C3.70861 11.4069 3.33325 12.3653 3.33325 13.3769V13.4314C3.36163 14.5558 3.77291 15.5276 4.47891 16.2245L4.49162 16.2371L4.50388 16.25C5.1622 16.9481 6.05989 17.3333 7.00776 17.3333H24.4823C26.3629 17.3333 27.9999 15.6987 27.9999 13.5765C27.9999 11.7971 26.8571 10.3217 25.3791 9.91734L24.7565 9.74697L24.6554 9.10942C24.1292 5.79117 21.3735 3.33325 18.2391 3.33325ZM11.0542 5.50734C12.5726 2.95032 15.2593 1.33325 18.2391 1.33325C22.243 1.33325 25.6237 4.28953 26.5147 8.19534C28.5969 9.05046 29.9999 11.1904 29.9999 13.5765C29.9999 16.71 27.5585 19.3333 24.4823 19.3333H7.00776C5.5145 19.3333 4.09596 18.7254 3.0612 17.6353C1.95806 16.5395 1.37015 15.059 1.33352 13.4664L1.33325 13.4549V13.3769C1.33325 11.8605 1.89899 10.424 2.91109 9.31116C3.95619 8.16348 5.38193 7.51112 6.92191 7.48775C7.63391 6.25968 8.93634 5.45799 10.4274 5.45799C10.6338 5.45799 10.8431 5.47326 11.0542 5.50734Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2391 3.33325C15.7935 3.33325 13.5607 4.78582 12.4613 7.11736L12.0451 7.99982L11.1527 7.60555C10.9177 7.50176 10.6811 7.45799 10.4274 7.45799C9.54935 7.45799 8.78584 8.00763 8.48292 8.85646L8.19898 9.65211L7.36708 9.5051C7.27647 9.48909 7.20203 9.4871 7.00777 9.4871C6.00812 9.4871 5.08284 9.89685 4.39048 10.657C3.70861 11.4069 3.33325 12.3653 3.33325 13.3769V13.4314C3.36163 14.5558 3.77291 15.5276 4.47891 16.2245L4.49162 16.2371L4.50388 16.25C5.1622 16.9481 6.05989 17.3333 7.00776 17.3333H24.4823C26.3629 17.3333 27.9999 15.6987 27.9999 13.5765C27.9999 11.7971 26.8571 10.3217 25.3791 9.91734L24.7565 9.74697L24.6554 9.10942C24.1292 5.79117 21.3735 3.33325 18.2391 3.33325Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.2113 22.0037C25.482 21.4174 26.1211 21.1976 26.6896 21.4163L26.6998 21.4202L26.7097 21.4247C27.296 21.6954 27.5158 22.3345 27.2971 22.9031L27.2917 22.9171L26.1733 25.4725C25.9865 25.9332 25.5645 26.1567 25.13 26.1567C24.9791 26.1567 24.8098 26.1107 24.7046 26.0756L24.6871 26.0698L24.6703 26.0621C24.0839 25.7914 23.8642 25.1523 24.0829 24.5837L24.0883 24.5697L25.2113 22.0037Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.878 20.6704C16.1486 20.084 16.7878 19.8643 17.3563 20.0829L17.3665 20.0869L17.3763 20.0914C17.9627 20.362 18.1824 21.0012 17.9638 21.5697L17.9583 21.5838L16.84 24.1392C16.6532 24.5999 16.2311 24.8234 15.7967 24.8234C15.6457 24.8234 15.4765 24.7774 15.3712 24.7423L15.3537 24.7365L15.337 24.7287C14.7506 24.4581 14.5309 23.819 14.7495 23.2504L14.755 23.2363L15.878 20.6704Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5447 24.6704C10.8153 24.084 11.4544 23.8643 12.023 24.0829L12.0331 24.0869L12.043 24.0914C12.6294 24.362 12.8491 25.0012 12.6304 25.5697L12.625 25.5838L11.5067 28.1392C11.3199 28.5999 10.8978 28.8234 10.4633 28.8234C10.3124 28.8234 10.1431 28.7774 10.0379 28.7423L10.0204 28.7365L10.0036 28.7287C9.41728 28.4581 9.19753 27.819 9.4162 27.2504L9.42162 27.2363L10.5447 24.6704Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path d="M5.33337 25.2339C5.01451 25.0293 4.90526 24.576 5.08936 24.2216L5.51201 23.4078H4.66667C4.29848 23.4078 4 23.076 4 22.6667C4 22.2574 4.29848 21.9256 4.66667 21.9256H5.512L5.08936 21.1118C4.90526 20.7573 5.01451 20.3041 5.33337 20.0994C5.65223 19.8948 6.05996 20.0162 6.24406 20.3707L6.66671 21.1845L7.08936 20.3707C7.27345 20.0162 7.68118 19.8948 8.00004 20.0994C8.3189 20.3041 8.42815 20.7573 8.24406 21.1118L7.82141 21.9256H8.66667C9.03486 21.9256 9.33333 22.2574 9.33333 22.6667C9.33333 23.076 9.03486 23.4078 8.66667 23.4078H7.8214L8.24406 24.2216C8.42815 24.576 8.3189 25.0293 8.00004 25.2339C7.68118 25.4386 7.27345 25.3171 7.08936 24.9627L6.66671 24.1489L6.24406 24.9627C6.05996 25.3171 5.65223 25.4386 5.33337 25.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M18.6667 29.2339C18.3478 29.0293 18.2386 28.576 18.4227 28.2216L18.8453 27.4078H18C17.6318 27.4078 17.3333 27.076 17.3333 26.6667C17.3333 26.2574 17.6318 25.9256 18 25.9256H18.8453L18.4227 25.1118C18.2386 24.7573 18.3478 24.3041 18.6667 24.0994C18.9856 23.8948 19.3933 24.0162 19.5774 24.3707L20 25.1845L20.4227 24.3707C20.6068 24.0162 21.0145 23.8948 21.3334 24.0994C21.6522 24.3041 21.7615 24.7573 21.5774 25.1118L21.1547 25.9256H22C22.3682 25.9256 22.6667 26.2574 22.6667 26.6667C22.6667 27.076 22.3682 27.4078 22 27.4078H21.1547L21.5774 28.2216C21.7615 28.576 21.6522 29.0293 21.3334 29.2339C21.0145 29.4386 20.6068 29.3171 20.4227 28.9627L20 28.1489L19.5774 28.9627C19.3933 29.3171 18.9856 29.4386 18.6667 29.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2391 3.33325C15.7935 3.33325 13.5607 4.78582 12.4613 7.11736L12.0451 7.99982L11.1527 7.60555C10.9177 7.50176 10.6811 7.45799 10.4274 7.45799C9.54935 7.45799 8.78584 8.00763 8.48292 8.85646L8.19898 9.65211L7.36708 9.5051C7.27647 9.48909 7.20203 9.4871 7.00777 9.4871C6.00812 9.4871 5.08283 9.89685 4.39048 10.657C3.70861 11.4069 3.33325 12.3653 3.33325 13.3769V13.4314C3.36163 14.5558 3.77291 15.5276 4.47891 16.2245L4.49162 16.2371L4.50388 16.25C5.1622 16.9481 6.05989 17.3333 7.00776 17.3333H24.4823C26.3629 17.3333 27.9999 15.6987 27.9999 13.5765C27.9999 11.7971 26.8571 10.3217 25.3791 9.91734L24.7565 9.74697L24.6554 9.10942C24.1292 5.79117 21.3735 3.33325 18.2391 3.33325ZM11.0542 5.50734C12.5726 2.95032 15.2593 1.33325 18.2391 1.33325C22.243 1.33325 25.6237 4.28953 26.5147 8.19534C28.5969 9.05046 29.9999 11.1904 29.9999 13.5765C29.9999 16.71 27.5585 19.3333 24.4823 19.3333H7.00776C5.5145 19.3333 4.09596 18.7254 3.0612 17.6353C1.95806 16.5395 1.37015 15.059 1.33352 13.4664L1.33325 13.4549V13.3769C1.33325 11.8605 1.89899 10.424 2.91109 9.31116C3.95619 8.16348 5.38193 7.51112 6.92191 7.48775C7.63391 6.25968 8.93634 5.45799 10.4274 5.45799C10.6338 5.45799 10.8431 5.47326 11.0542 5.50734Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2391 3.33325C15.7935 3.33325 13.5607 4.78582 12.4613 7.11736L12.0451 7.99982L11.1527 7.60555C10.9177 7.50176 10.6811 7.45799 10.4274 7.45799C9.54935 7.45799 8.78584 8.00763 8.48292 8.85646L8.19898 9.65211L7.36708 9.5051C7.27647 9.48909 7.20203 9.4871 7.00777 9.4871C6.00812 9.4871 5.08284 9.89685 4.39048 10.657C3.70861 11.4069 3.33325 12.3653 3.33325 13.3769V13.4314C3.36163 14.5558 3.77291 15.5276 4.47891 16.2245L4.49162 16.2371L4.50388 16.25C5.1622 16.9481 6.05989 17.3333 7.00776 17.3333H24.4823C26.3629 17.3333 27.9999 15.6987 27.9999 13.5765C27.9999 11.7971 26.8571 10.3217 25.3791 9.91734L24.7565 9.74697L24.6554 9.10942C24.1292 5.79117 21.3735 3.33325 18.2391 3.33325Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
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
    'obi-heavy-sleet-colour': ObiHeavySleetColour;
  }
}