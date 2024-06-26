import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-warning-unacknowledged')
export class Obi14WarningUnacknowledged extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.9654L8.66667 14.5446H6V10.4397H8.66667L12 7.01898V17.9654ZM13.3333 9.73506C14.32 10.2413 15 11.2812 15 12.4922C15 13.7031 14.32 14.743 13.3333 15.2425V9.73506ZM16.6667 12.4922C16.6667 10.3234 15.26 8.48991 13.3333 7.90154V6.49219C16.0067 7.11476 18 9.56402 18 12.4922C18 15.4204 16.0067 17.8696 13.3333 18.4922V17.0828C15.26 16.4945 16.6667 14.6609 16.6667 12.4922Z" fill="currentColor"/>
<path d="M8.66667 14.5446L12 17.9654V7.01898L8.66667 10.4397H6V14.5446H8.66667Z" fill="currentColor" />
<path d="M15 12.4922C15 11.2812 14.32 10.2413 13.3333 9.73506V15.2425C14.32 14.743 15 13.7031 15 12.4922Z" fill="currentColor" />
<path d="M13.3333 7.90154C15.26 8.48991 16.6667 10.3234 16.6667 12.4922C16.6667 14.6609 15.26 16.4945 13.3333 17.0828V18.4922C16.0067 17.8696 18 15.4204 18 12.4922C18 9.56402 16.0067 7.11476 13.3333 6.49219V7.90154Z" fill="currentColor" />
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.9654L8.66667 14.5446H6V10.4397H8.66667L12 7.01898V17.9654ZM13.3333 9.73506C14.32 10.2413 15 11.2812 15 12.4922C15 13.7031 14.32 14.743 13.3333 15.2425V9.73506ZM16.6667 12.4922C16.6667 10.3234 15.26 8.48991 13.3333 7.90154V6.49219C16.0067 7.11476 18 9.56402 18 12.4922C18 15.4204 16.0067 17.8696 13.3333 18.4922V17.0828C15.26 16.4945 16.6667 14.6609 16.6667 12.4922Z" style="fill: var(--warning-enabled-background-color)"/>
<path d="M8.66667 14.5446L12 17.9654V7.01898L8.66667 10.4397H6V14.5446H8.66667Z" style="fill: var(--on-warning-active-color)" />
<path d="M15 12.4922C15 11.2812 14.32 10.2413 13.3333 9.73506V15.2425C14.32 14.743 15 13.7031 15 12.4922Z" style="fill: var(--on-warning-active-color)" />
<path d="M13.3333 7.90154C15.26 8.48991 16.6667 10.3234 16.6667 12.4922C16.6667 14.6609 15.26 16.4945 13.3333 17.0828V18.4922C16.0067 17.8696 18 15.4204 18 12.4922C18 9.56402 16.0067 7.11476 13.3333 6.49219V7.90154Z" style="fill: var(--on-warning-active-color)" />
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
    'obi-14-warning-unacknowledged': Obi14WarningUnacknowledged;
  }
}
