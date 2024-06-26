import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-unack')
export class Obi14AlarmUnack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" fill="currentColor"/>
<path d="M8.50855 16.3814L11.6442 19.5171V9.4829L8.50855 12.6186H6V16.3814H8.50855Z" fill="currentColor"/>
<path d="M14.4664 14.5C14.4664 13.39 13.8267 12.4367 12.8985 11.9726V17.0211C13.8267 16.5633 14.4664 15.61 14.4664 14.5Z" fill="currentColor"/>
<path d="M12.8985 10.2919C14.7109 10.8312 16.0342 12.512 16.0342 14.5C16.0342 16.488 14.7109 18.1688 12.8985 18.7081V20C15.4133 19.4293 17.2885 17.1842 17.2885 14.5C17.2885 11.8159 15.4133 9.5707 12.8985 9V10.2919Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" style="fill: var(--alarm-enabled-background-color)"/>
<path d="M8.50855 16.3814L11.6442 19.5171V9.4829L8.50855 12.6186H6V16.3814H8.50855Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M14.4664 14.5C14.4664 13.39 13.8267 12.4367 12.8985 11.9726V17.0211C13.8267 16.5633 14.4664 15.61 14.4664 14.5Z" style="fill: var(--on-alarm-active-color)"/>
<path d="M12.8985 10.2919C14.7109 10.8312 16.0342 12.512 16.0342 14.5C16.0342 16.488 14.7109 18.1688 12.8985 18.7081V20C15.4133 19.4293 17.2885 17.1842 17.2885 14.5C17.2885 11.8159 15.4133 9.5707 12.8985 9V10.2919Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-14-alarm-unack': Obi14AlarmUnack;
  }
}
