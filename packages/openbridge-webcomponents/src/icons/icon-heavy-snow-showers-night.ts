import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-snow-showers-night')
export class ObiHeavySnowShowersNight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.39164 10.9585C6.74826 12.0291 11.1299 9.43869 12.1783 5.17262C12.4158 4.20591 12.4619 3.23613 12.3403 2.30184C12.2658 1.72975 12.817 1.22937 13.2975 1.53125C15.5527 2.94814 16.9853 5.4163 17.097 8.10506C17.6382 8.00747 18.2154 7.97259 18.8271 8.02181C22.2421 8.29658 24.1525 10.0865 25.1071 11.9189C25.439 12.5559 25.6451 13.1745 25.7741 13.6989C25.9743 13.7572 26.1852 13.825 26.3987 13.9033C26.9123 14.0915 27.5832 14.3908 28.1496 14.8675C28.7331 15.3587 29.4243 16.2439 29.3275 17.5021C29.178 19.4449 27.6727 21.3487 25.3334 21.3487H6.66671C4.45757 21.3487 2.66671 19.5578 2.66671 17.3487C2.66671 16.437 2.93485 15.4534 3.62239 14.6614C2.7302 13.8771 2.02235 12.9059 1.54478 11.8242C1.31877 11.3122 1.85541 10.8267 2.39164 10.9585ZM27.3334 17.3487C27.4498 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6667 10.0154C16.5283 9.8433 14.8895 11.1452 13.8693 12.309C13.0855 13.203 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 11.9991 13.0139 11.1362 12.6645C10.7797 12.5202 10.3899 12.4871 10 12.682C9.66671 12.8487 9.45837 13.0987 9.33337 13.3799C8.95837 14.2237 9.33337 15.3487 9.33337 15.3487H6.66671C5.33337 15.3487 4.66671 16.2441 4.66671 17.3487C4.66671 18.4533 5.56214 19.3487 6.66671 19.3487H25.3334C26.4379 19.3487 27.2487 18.45 27.3334 17.3487Z" fill="currentColor"/>
<path d="M2.66675 27.9005C2.34788 27.6959 2.23863 27.2426 2.42273 26.8882L2.84538 26.0744H2.00004C1.63185 26.0744 1.33337 25.7426 1.33337 25.3333C1.33337 24.924 1.63185 24.5922 2.00004 24.5922H2.84538L2.42273 23.7784C2.23863 23.4239 2.34788 22.9707 2.66675 22.766C2.98561 22.5614 3.39333 22.6828 3.57743 23.0373L4.00008 23.8511L4.42273 23.0373C4.60682 22.6828 5.01455 22.5614 5.33341 22.766C5.65228 22.9707 5.76153 23.4239 5.57743 23.7784L5.15478 24.5922H6.00004C6.36823 24.5922 6.66671 24.924 6.66671 25.3333C6.66671 25.7426 6.36823 26.0744 6.00004 26.0744H5.15478L5.57743 26.8882C5.76153 27.2426 5.65228 27.6959 5.33341 27.9005C5.01455 28.1052 4.60682 27.9837 4.42273 27.6293L4.00008 26.8155L3.57743 27.6293C3.39334 27.9837 2.98561 28.1052 2.66675 27.9005Z" fill="currentColor"/>
<path d="M15.3334 27.9005C15.0146 27.6959 14.9053 27.2426 15.0894 26.8882L15.512 26.0744H14.6667C14.2985 26.0744 14 25.7426 14 25.3333C14 24.924 14.2985 24.5922 14.6667 24.5922H15.512L15.0894 23.7784C14.9053 23.4239 15.0146 22.9707 15.3334 22.766C15.6523 22.5614 16.06 22.6828 16.2441 23.0373L16.6667 23.8511L17.0894 23.0373C17.2735 22.6828 17.6812 22.5614 18.0001 22.766C18.3189 22.9707 18.4282 23.4239 18.2441 23.7784L17.8215 24.5922H18.6667C19.0349 24.5922 19.3334 24.924 19.3334 25.3333C19.3334 25.7426 19.0349 26.0744 18.6667 26.0744H17.8214L18.2441 26.8882C18.4282 27.2426 18.3189 27.6959 18.0001 27.9005C17.6812 28.1052 17.2735 27.9837 17.0894 27.6293L16.6667 26.8155L16.2441 27.6293C16.06 27.9837 15.6523 28.1052 15.3334 27.9005Z" fill="currentColor"/>
<path d="M26.6667 27.9005C26.3479 27.6959 26.2386 27.2426 26.4227 26.8882L26.8454 26.0744H26C25.6319 26.0744 25.3334 25.7426 25.3334 25.3333C25.3334 24.924 25.6319 24.5922 26 24.5922H26.8454L26.4227 23.7784C26.2386 23.4239 26.3479 22.9707 26.6667 22.766C26.9856 22.5614 27.3933 22.6828 27.5774 23.0373L28.0001 23.8511L28.4227 23.0373C28.6068 22.6828 29.0146 22.5614 29.3334 22.766C29.6523 22.9707 29.7615 23.4239 29.5774 23.7784L29.1548 24.5922H30C30.3682 24.5922 30.6667 24.924 30.6667 25.3333C30.6667 25.7426 30.3682 26.0744 30 26.0744H29.1548L29.5774 26.8882C29.7615 27.2426 29.6523 27.6959 29.3334 27.9005C29.0146 28.1052 28.6068 27.9837 28.4227 27.6293L28.0001 26.8155L27.5774 27.6293C27.3933 27.9837 26.9856 28.1052 26.6667 27.9005Z" fill="currentColor"/>
<path d="M21.3334 30.5672C21.0146 30.3626 20.9053 29.9093 21.0894 29.5548L21.5121 28.7411H20.6667C20.2985 28.7411 20 28.4093 20 28C20 27.5907 20.2985 27.2589 20.6667 27.2589H21.512L21.0894 26.4451C20.9053 26.0906 21.0146 25.6374 21.3334 25.4327C21.6523 25.2281 22.06 25.3495 22.2441 25.704L22.6667 26.5178L23.0894 25.704C23.2735 25.3495 23.6812 25.2281 24.0001 25.4327C24.3189 25.6374 24.4282 26.0906 24.2441 26.4451L23.8215 27.2589H24.6667C25.0349 27.2589 25.3334 27.5907 25.3334 28C25.3334 28.4093 25.0349 28.7411 24.6667 28.7411H23.8214L24.2441 29.5548C24.4282 29.9093 24.3189 30.3626 24.0001 30.5672C23.6812 30.7719 23.2735 30.6504 23.0894 30.2959L22.6667 29.4822L22.2441 30.2959C22.06 30.6504 21.6523 30.7719 21.3334 30.5672Z" fill="currentColor"/>
<path d="M9.33341 30.5672C9.01455 30.3626 8.9053 29.9093 9.0894 29.5548L9.51205 28.7411H8.66671C8.29852 28.7411 8.00004 28.4093 8.00004 28C8.00004 27.5907 8.29852 27.2589 8.66671 27.2589H9.51204L9.0894 26.4451C8.9053 26.0906 9.01455 25.6374 9.33341 25.4327C9.65228 25.2281 10.06 25.3495 10.2441 25.704L10.6667 26.5178L11.0894 25.704C11.2735 25.3495 11.6812 25.2281 12.0001 25.4327C12.3189 25.6374 12.4282 26.0906 12.2441 26.4451L11.8215 27.2589H12.6667C13.0349 27.2589 13.3334 27.5907 13.3334 28C13.3334 28.4093 13.0349 28.7411 12.6667 28.7411H11.8214L12.2441 29.5548C12.4282 29.9093 12.3189 30.3626 12.0001 30.5672C11.6812 30.7719 11.2735 30.6504 11.0894 30.2959L10.6667 29.4822L10.2441 30.2959C10.06 30.6504 9.65228 30.7719 9.33341 30.5672Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.39164 10.9585C6.74826 12.0291 11.1299 9.43869 12.1783 5.17262C12.4158 4.20591 12.4619 3.23613 12.3403 2.30184C12.2658 1.72975 12.817 1.22937 13.2975 1.53125C15.5527 2.94814 16.9853 5.4163 17.097 8.10506C17.6382 8.00747 18.2154 7.97259 18.8271 8.02181C22.2421 8.29658 24.1525 10.0865 25.1071 11.9189C25.439 12.5559 25.6451 13.1745 25.7741 13.6989C25.9743 13.7572 26.1852 13.825 26.3987 13.9033C26.9123 14.0915 27.5832 14.3908 28.1496 14.8675C28.7331 15.3587 29.4243 16.2439 29.3275 17.5021C29.178 19.4449 27.6727 21.3487 25.3334 21.3487H6.66671C4.45757 21.3487 2.66671 19.5578 2.66671 17.3487C2.66671 16.437 2.93485 15.4534 3.62239 14.6614C2.7302 13.8771 2.02235 12.9059 1.54478 11.8242C1.31877 11.3122 1.85541 10.8267 2.39164 10.9585ZM27.3334 17.3487C27.4498 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6667 10.0154C16.5283 9.8433 14.8895 11.1452 13.8693 12.309C13.0855 13.203 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 11.9991 13.0139 11.1362 12.6645C10.7797 12.5202 10.3899 12.4871 10 12.682C9.66671 12.8487 9.45837 13.0987 9.33337 13.3799C8.95837 14.2237 9.33337 15.3487 9.33337 15.3487H6.66671C5.33337 15.3487 4.66671 16.2441 4.66671 17.3487C4.66671 18.4533 5.56214 19.3487 6.66671 19.3487H25.3334C26.4379 19.3487 27.2487 18.45 27.3334 17.3487Z" style="fill: var(--element-active-color)"/>
<path d="M2.66675 27.9005C2.34788 27.6959 2.23863 27.2426 2.42273 26.8882L2.84538 26.0744H2.00004C1.63185 26.0744 1.33337 25.7426 1.33337 25.3333C1.33337 24.924 1.63185 24.5922 2.00004 24.5922H2.84538L2.42273 23.7784C2.23863 23.4239 2.34788 22.9707 2.66675 22.766C2.98561 22.5614 3.39333 22.6828 3.57743 23.0373L4.00008 23.8511L4.42273 23.0373C4.60682 22.6828 5.01455 22.5614 5.33341 22.766C5.65228 22.9707 5.76153 23.4239 5.57743 23.7784L5.15478 24.5922H6.00004C6.36823 24.5922 6.66671 24.924 6.66671 25.3333C6.66671 25.7426 6.36823 26.0744 6.00004 26.0744H5.15478L5.57743 26.8882C5.76153 27.2426 5.65228 27.6959 5.33341 27.9005C5.01455 28.1052 4.60682 27.9837 4.42273 27.6293L4.00008 26.8155L3.57743 27.6293C3.39334 27.9837 2.98561 28.1052 2.66675 27.9005Z" style="fill: var(--element-active-color)"/>
<path d="M15.3334 27.9005C15.0146 27.6959 14.9053 27.2426 15.0894 26.8882L15.512 26.0744H14.6667C14.2985 26.0744 14 25.7426 14 25.3333C14 24.924 14.2985 24.5922 14.6667 24.5922H15.512L15.0894 23.7784C14.9053 23.4239 15.0146 22.9707 15.3334 22.766C15.6523 22.5614 16.06 22.6828 16.2441 23.0373L16.6667 23.8511L17.0894 23.0373C17.2735 22.6828 17.6812 22.5614 18.0001 22.766C18.3189 22.9707 18.4282 23.4239 18.2441 23.7784L17.8215 24.5922H18.6667C19.0349 24.5922 19.3334 24.924 19.3334 25.3333C19.3334 25.7426 19.0349 26.0744 18.6667 26.0744H17.8214L18.2441 26.8882C18.4282 27.2426 18.3189 27.6959 18.0001 27.9005C17.6812 28.1052 17.2735 27.9837 17.0894 27.6293L16.6667 26.8155L16.2441 27.6293C16.06 27.9837 15.6523 28.1052 15.3334 27.9005Z" style="fill: var(--element-active-color)"/>
<path d="M26.6667 27.9005C26.3479 27.6959 26.2386 27.2426 26.4227 26.8882L26.8454 26.0744H26C25.6319 26.0744 25.3334 25.7426 25.3334 25.3333C25.3334 24.924 25.6319 24.5922 26 24.5922H26.8454L26.4227 23.7784C26.2386 23.4239 26.3479 22.9707 26.6667 22.766C26.9856 22.5614 27.3933 22.6828 27.5774 23.0373L28.0001 23.8511L28.4227 23.0373C28.6068 22.6828 29.0146 22.5614 29.3334 22.766C29.6523 22.9707 29.7615 23.4239 29.5774 23.7784L29.1548 24.5922H30C30.3682 24.5922 30.6667 24.924 30.6667 25.3333C30.6667 25.7426 30.3682 26.0744 30 26.0744H29.1548L29.5774 26.8882C29.7615 27.2426 29.6523 27.6959 29.3334 27.9005C29.0146 28.1052 28.6068 27.9837 28.4227 27.6293L28.0001 26.8155L27.5774 27.6293C27.3933 27.9837 26.9856 28.1052 26.6667 27.9005Z" style="fill: var(--element-active-color)"/>
<path d="M21.3334 30.5672C21.0146 30.3626 20.9053 29.9093 21.0894 29.5548L21.5121 28.7411H20.6667C20.2985 28.7411 20 28.4093 20 28C20 27.5907 20.2985 27.2589 20.6667 27.2589H21.512L21.0894 26.4451C20.9053 26.0906 21.0146 25.6374 21.3334 25.4327C21.6523 25.2281 22.06 25.3495 22.2441 25.704L22.6667 26.5178L23.0894 25.704C23.2735 25.3495 23.6812 25.2281 24.0001 25.4327C24.3189 25.6374 24.4282 26.0906 24.2441 26.4451L23.8215 27.2589H24.6667C25.0349 27.2589 25.3334 27.5907 25.3334 28C25.3334 28.4093 25.0349 28.7411 24.6667 28.7411H23.8214L24.2441 29.5548C24.4282 29.9093 24.3189 30.3626 24.0001 30.5672C23.6812 30.7719 23.2735 30.6504 23.0894 30.2959L22.6667 29.4822L22.2441 30.2959C22.06 30.6504 21.6523 30.7719 21.3334 30.5672Z" style="fill: var(--element-active-color)"/>
<path d="M9.33341 30.5672C9.01455 30.3626 8.9053 29.9093 9.0894 29.5548L9.51205 28.7411H8.66671C8.29852 28.7411 8.00004 28.4093 8.00004 28C8.00004 27.5907 8.29852 27.2589 8.66671 27.2589H9.51204L9.0894 26.4451C8.9053 26.0906 9.01455 25.6374 9.33341 25.4327C9.65228 25.2281 10.06 25.3495 10.2441 25.704L10.6667 26.5178L11.0894 25.704C11.2735 25.3495 11.6812 25.2281 12.0001 25.4327C12.3189 25.6374 12.4282 26.0906 12.2441 26.4451L11.8215 27.2589H12.6667C13.0349 27.2589 13.3334 27.5907 13.3334 28C13.3334 28.4093 13.0349 28.7411 12.6667 28.7411H11.8214L12.2441 29.5548C12.4282 29.9093 12.3189 30.3626 12.0001 30.5672C11.6812 30.7719 11.2735 30.6504 11.0894 30.2959L10.6667 29.4822L10.2441 30.2959C10.06 30.6504 9.65228 30.7719 9.33341 30.5672Z" style="fill: var(--element-active-color)"/>
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
    'obi-heavy-snow-showers-night': ObiHeavySnowShowersNight;
  }
}
