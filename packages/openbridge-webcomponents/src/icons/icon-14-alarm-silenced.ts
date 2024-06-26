import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-silenced')
export class Obi14AlarmSilenced extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" fill="currentColor"/>
<path d="M6.99848 10.8967L7.88021 10.015L17.3 19.2682L16.4183 20.1499L15.1363 18.868C14.4859 19.387 13.7168 19.7747 12.8788 19.9623V18.6741C13.3791 18.5303 13.8356 18.2864 14.2421 17.98L11.6281 15.366V19.487L8.50138 16.3603H6V12.6082H8.50138L8.68273 12.4206L6.99848 10.8967Z" fill="currentColor"/>
<path d="M15.7491 15.9476C15.9117 15.4911 16.0055 14.9971 16.0055 14.4843C16.0055 12.5019 14.6861 10.826 12.8788 10.2882V9C15.3864 9.56907 17.2562 11.8078 17.2562 14.4843C17.2562 15.3535 17.0561 16.1727 16.7059 16.9044L15.7491 15.9476Z" fill="currentColor"/>
<path d="M12.8788 11.9641C13.8043 12.4269 14.4422 13.3774 14.4422 14.4843C14.4422 14.5343 14.4359 14.5843 14.4297 14.6344L12.8788 13.0835V11.9641Z" fill="currentColor"/>
<path d="M10.4525 10.6572L11.6281 9.48152V11.8328L10.4525 10.6572Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" style="fill: var(--alarm-enabled-background-color)"/>
<path d="M6.99848 10.8967L7.88021 10.015L17.3 19.2682L16.4183 20.1499L15.1363 18.868C14.4859 19.387 13.7168 19.7747 12.8788 19.9623V18.6741C13.3791 18.5303 13.8356 18.2864 14.2421 17.98L11.6281 15.366V19.487L8.50138 16.3603H6V12.6082H8.50138L8.68273 12.4206L6.99848 10.8967Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M15.7491 15.9476C15.9117 15.4911 16.0055 14.9971 16.0055 14.4843C16.0055 12.5019 14.6861 10.826 12.8788 10.2882V9C15.3864 9.56907 17.2562 11.8078 17.2562 14.4843C17.2562 15.3535 17.0561 16.1727 16.7059 16.9044L15.7491 15.9476Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M12.8788 11.9641C13.8043 12.4269 14.4422 13.3774 14.4422 14.4843C14.4422 14.5343 14.4359 14.5843 14.4297 14.6344L12.8788 13.0835V11.9641Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M10.4525 10.6572L11.6281 9.48152V11.8328L10.4525 10.6572Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-14-alarm-silenced': Obi14AlarmSilenced;
  }
}
