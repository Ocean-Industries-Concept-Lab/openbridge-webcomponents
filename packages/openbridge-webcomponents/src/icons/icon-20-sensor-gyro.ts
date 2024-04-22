import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-sensor-gyro')
export class Obi20SensorGyro extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.46873 11.353C7.37401 11.6038 7.28514 11.8535 7.20311 12.1016C5.75584 10.6526 5.08104 9.22023 5.59373 8.33302C6.07616 7.49635 7.50682 7.33155 9.32713 7.75831C9.25389 7.86695 9.18162 7.97731 9.11033 8.08937C8.99119 8.27491 8.87498 8.46485 8.76073 8.65919C8.62889 8.63356 8.49998 8.61158 8.37498 8.59352C8.10838 8.55519 7.86717 8.53566 7.65233 8.53175C7.35155 8.52638 7.10252 8.55152 6.90526 8.5984C6.5703 8.67823 6.48241 8.79371 6.45994 8.83302C6.43651 8.87208 6.38084 9.00636 6.47948 9.33619C6.57811 9.66871 6.81053 10.1038 7.20994 10.6118C7.3242 10.7573 7.45018 10.9053 7.58592 11.0552L7.46873 11.353Z" fill="currentColor"/>
<path d="M16.4228 13.0144C16.5644 12.6638 16.6924 12.3145 16.8066 11.9683C18.2519 13.4165 18.9267 14.8482 18.414 15.7351C17.9316 16.5713 16.5019 16.7363 14.6826 16.3103C14.8769 16.022 15.0664 15.7212 15.249 15.4092L15.3847 15.4348L15.4922 15.4529L15.6328 15.4744C16.2724 15.5667 16.7656 15.5501 17.1025 15.4695C17.4375 15.3899 17.5254 15.2744 17.5488 15.2351C17.5713 15.1961 17.6269 15.0615 17.5283 14.7319C17.4297 14.3992 17.1972 13.9641 16.7978 13.4563C16.6836 13.3113 16.5586 13.1638 16.4228 13.0144Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.67321 17.8034C7.25704 16.9857 7.60034 13.7398 9.44001 10.5534C11.2797 7.36706 13.919 5.4468 15.3352 6.26443C16.7514 7.08206 16.4081 10.3279 14.5684 13.5143C12.7288 16.7007 10.0894 18.621 8.67321 17.8034ZM9.13645 13.7129C8.97883 14.2371 8.87693 14.7293 8.83012 15.1719C8.76953 15.7447 8.80632 16.1864 8.89609 16.491C8.98386 16.7889 9.10096 16.8956 9.17321 16.9373C9.24546 16.979 9.39644 17.0271 9.69825 16.9542C10.007 16.8796 10.4079 16.6906 10.8737 16.3517C11.2336 16.0899 11.6089 15.7555 11.9841 15.3569C11.5023 15.134 11.0131 14.8808 10.5234 14.5982C10.0342 14.3156 9.5702 14.0187 9.13645 13.7129ZM12.661 14.5653C12.6334 14.5531 12.6057 14.5408 12.5781 14.5283C12.0703 14.301 11.5488 14.0354 11.0234 13.7322C10.4698 13.4124 9.95416 13.0752 9.48353 12.7309C9.70383 12.1866 9.9778 11.622 10.306 11.0534C10.6342 10.4851 10.9861 9.96562 11.3472 9.50278C11.8807 9.73817 12.4302 10.016 12.9844 10.3359C13.5384 10.6557 14.0538 10.993 14.5247 11.3374C14.3044 11.8815 14.0305 12.446 13.7024 13.0143C13.3742 13.5828 13.0222 14.1024 12.661 14.5653ZM12.0238 8.71141C12.3992 8.31255 12.7747 7.978 13.1347 7.71606C13.6006 7.37716 14.0014 7.18819 14.3102 7.1136C14.612 7.04069 14.763 7.08874 14.8352 7.13045C14.9075 7.17217 15.0246 7.27889 15.1123 7.57673C15.2021 7.88139 15.2389 8.32305 15.1783 8.89592C15.1315 9.33863 15.0295 9.83106 14.8718 10.3555C14.4378 10.0495 13.974 9.75242 13.4844 9.46974C13.2305 9.32301 12.9765 9.18434 12.7236 9.05348C12.4894 8.93254 12.2562 8.81844 12.0238 8.71141Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.1279 1.13404C17.8896 0.996104 17.6172 0.968028 17.3701 1.03419C17.123 1.10035 16.9004 1.261 16.7627 1.50025L15.9785 2.85792C11.0273 0.708995 5.23436 2.88502 2.93944 7.80738C0.895491 12.19 2.30174 17.2966 6.04295 20.0662L5.50975 20.9895C5.23436 21.4678 5.39744 22.0794 5.87596 22.3555C6.35448 22.6316 6.9658 22.4678 7.24217 21.9895L7.7617 21.0899L7.77635 21.0967C12.7812 23.4307 18.7314 21.2651 21.0654 16.2598C23.1514 11.7861 21.6435 6.55812 17.7256 3.83131L18.4941 2.50025C18.7705 2.02198 18.6064 1.41041 18.1279 1.13404ZM19.2529 15.4146C17.3857 19.419 12.626 21.1514 8.62108 19.2842C4.61717 17.4168 2.88475 12.657 4.75194 8.6526C6.61912 4.64845 11.3789 2.91603 15.3838 4.78321C19.3877 6.6504 21.1201 11.4102 19.2529 15.4146Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.46873 11.353C7.37401 11.6038 7.28514 11.8535 7.20311 12.1016C5.75584 10.6526 5.08104 9.22023 5.59373 8.33302C6.07616 7.49635 7.50682 7.33155 9.32713 7.75831C9.25389 7.86695 9.18162 7.97731 9.11033 8.08937C8.99119 8.27491 8.87498 8.46485 8.76073 8.65919C8.62889 8.63356 8.49998 8.61158 8.37498 8.59352C8.10838 8.55519 7.86717 8.53566 7.65233 8.53175C7.35155 8.52638 7.10252 8.55152 6.90526 8.5984C6.5703 8.67823 6.48241 8.79371 6.45994 8.83302C6.43651 8.87208 6.38084 9.00636 6.47948 9.33619C6.57811 9.66871 6.81053 10.1038 7.20994 10.6118C7.3242 10.7573 7.45018 10.9053 7.58592 11.0552L7.46873 11.353Z" style="fill: var(--element-active-color)"/>
<path d="M16.4228 13.0144C16.5644 12.6638 16.6924 12.3145 16.8066 11.9683C18.2519 13.4165 18.9267 14.8482 18.414 15.7351C17.9316 16.5713 16.5019 16.7363 14.6826 16.3103C14.8769 16.022 15.0664 15.7212 15.249 15.4092L15.3847 15.4348L15.4922 15.4529L15.6328 15.4744C16.2724 15.5667 16.7656 15.5501 17.1025 15.4695C17.4375 15.3899 17.5254 15.2744 17.5488 15.2351C17.5713 15.1961 17.6269 15.0615 17.5283 14.7319C17.4297 14.3992 17.1972 13.9641 16.7978 13.4563C16.6836 13.3113 16.5586 13.1638 16.4228 13.0144Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.67321 17.8034C7.25704 16.9857 7.60034 13.7398 9.44001 10.5534C11.2797 7.36706 13.919 5.4468 15.3352 6.26443C16.7514 7.08206 16.4081 10.3279 14.5684 13.5143C12.7288 16.7007 10.0894 18.621 8.67321 17.8034ZM9.13645 13.7129C8.97883 14.2371 8.87693 14.7293 8.83012 15.1719C8.76953 15.7447 8.80632 16.1864 8.89609 16.491C8.98386 16.7889 9.10096 16.8956 9.17321 16.9373C9.24546 16.979 9.39644 17.0271 9.69825 16.9542C10.007 16.8796 10.4079 16.6906 10.8737 16.3517C11.2336 16.0899 11.6089 15.7555 11.9841 15.3569C11.5023 15.134 11.0131 14.8808 10.5234 14.5982C10.0342 14.3156 9.5702 14.0187 9.13645 13.7129ZM12.661 14.5653C12.6334 14.5531 12.6057 14.5408 12.5781 14.5283C12.0703 14.301 11.5488 14.0354 11.0234 13.7322C10.4698 13.4124 9.95416 13.0752 9.48353 12.7309C9.70383 12.1866 9.9778 11.622 10.306 11.0534C10.6342 10.4851 10.9861 9.96562 11.3472 9.50278C11.8807 9.73817 12.4302 10.016 12.9844 10.3359C13.5384 10.6557 14.0538 10.993 14.5247 11.3374C14.3044 11.8815 14.0305 12.446 13.7024 13.0143C13.3742 13.5828 13.0222 14.1024 12.661 14.5653ZM12.0238 8.71141C12.3992 8.31255 12.7747 7.978 13.1347 7.71606C13.6006 7.37716 14.0014 7.18819 14.3102 7.1136C14.612 7.04069 14.763 7.08874 14.8352 7.13045C14.9075 7.17217 15.0246 7.27889 15.1123 7.57673C15.2021 7.88139 15.2389 8.32305 15.1783 8.89592C15.1315 9.33863 15.0295 9.83106 14.8718 10.3555C14.4378 10.0495 13.974 9.75242 13.4844 9.46974C13.2305 9.32301 12.9765 9.18434 12.7236 9.05348C12.4894 8.93254 12.2562 8.81844 12.0238 8.71141Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.1279 1.13404C17.8896 0.996104 17.6172 0.968028 17.3701 1.03419C17.123 1.10035 16.9004 1.261 16.7627 1.50025L15.9785 2.85792C11.0273 0.708995 5.23436 2.88502 2.93944 7.80738C0.895491 12.19 2.30174 17.2966 6.04295 20.0662L5.50975 20.9895C5.23436 21.4678 5.39744 22.0794 5.87596 22.3555C6.35448 22.6316 6.9658 22.4678 7.24217 21.9895L7.7617 21.0899L7.77635 21.0967C12.7812 23.4307 18.7314 21.2651 21.0654 16.2598C23.1514 11.7861 21.6435 6.55812 17.7256 3.83131L18.4941 2.50025C18.7705 2.02198 18.6064 1.41041 18.1279 1.13404ZM19.2529 15.4146C17.3857 19.419 12.626 21.1514 8.62108 19.2842C4.61717 17.4168 2.88475 12.657 4.75194 8.6526C6.61912 4.64845 11.3789 2.91603 15.3838 4.78321C19.3877 6.6504 21.1201 11.4102 19.2529 15.4146Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-sensor-gyro': Obi20SensorGyro;
  }
}