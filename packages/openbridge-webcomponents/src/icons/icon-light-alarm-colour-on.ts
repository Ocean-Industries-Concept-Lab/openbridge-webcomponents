import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-alarm-colour-on')
export class ObiLightAlarmColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V3V5H11V1H13Z" fill="currentColor"/>
<path d="M20.4863 4.92871L19.0721 3.5145L16.2437 6.34292L17.6579 7.75714L20.4863 4.92871Z" fill="currentColor"/>
<path d="M3.5145 4.92886L4.92871 3.51465L6.34292 4.92886L7.75714 6.34308L6.34292 7.75729L3.5145 4.92886Z" fill="currentColor"/>
<path d="M1 13H5V11H1V13Z" fill="currentColor"/>
<path d="M19 13H23V11H19V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.66123 9.58094L5.42857 20H3V22H21V20H18.5714L16.3388 9.58094C16.1412 8.6588 15.3262 8 14.3832 8H9.61683C8.67376 8 7.85883 8.6588 7.66123 9.58094ZM14.3832 10H9.61683L7.47397 20H11V17.7324C10.4022 17.3866 10 16.7403 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16C14 16.7403 13.5978 17.3866 13 17.7324V20H16.526L14.3832 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3832 10H9.61686L7.474 20H11V17.7324C10.4022 17.3866 10 16.7403 10 16C10 14.8954 10.8955 14 12 14C13.1046 14 14 14.8954 14 16C14 16.7403 13.5978 17.3866 13 17.7324V20H16.5261L14.3832 10Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V3V5H11V1H13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20.4863 4.92871L19.0721 3.5145L16.2437 6.34292L17.6579 7.75714L20.4863 4.92871Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3.5145 4.92886L4.92871 3.51465L6.34292 4.92886L7.75714 6.34308L6.34292 7.75729L3.5145 4.92886Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M1 13H5V11H1V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19 13H23V11H19V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.66123 9.58094L5.42857 20H3V22H21V20H18.5714L16.3388 9.58094C16.1412 8.6588 15.3262 8 14.3832 8H9.61683C8.67376 8 7.85883 8.6588 7.66123 9.58094ZM14.3832 10H9.61683L7.47397 20H11V17.7324C10.4022 17.3866 10 16.7403 10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16C14 16.7403 13.5978 17.3866 13 17.7324V20H16.526L14.3832 10Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.3832 10H9.61686L7.474 20H11V17.7324C10.4022 17.3866 10 16.7403 10 16C10 14.8954 10.8955 14 12 14C13.1046 14 14 14.8954 14 16C14 16.7403 13.5978 17.3866 13 17.7324V20H16.5261L14.3832 10Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-alarm-colour-on': ObiLightAlarmColourOn;
  }
}
