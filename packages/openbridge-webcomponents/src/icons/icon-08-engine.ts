import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-engine')
export class Obi08Engine extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.9997 8.94913H19.16L19.1544 11.6603H17.4443L15.4998 7.01237H11.9016V5.37685H14.8845V4H7.10558V5.37685H10.1168V7.01237H7.43631L4.49995 11.6603H3.49997V8.64813H2V16.6522H3.49997V13.8982H4.49995L8.19289 18.9761H17.4443V16.6522H19.1544V18.9761H20.9941C20.9941 18.9761 21.9983 19.5799 21.9983 14.7163C21.9983 14.7163 22.0867 8.94913 20.9997 8.94913Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.9997 8.94913H19.16L19.1544 11.6603H17.4443L15.4998 7.01237H11.9016V5.37685H14.8845V4H7.10558V5.37685H10.1168V7.01237H7.43631L4.49995 11.6603H3.49997V8.64813H2V16.6522H3.49997V13.8982H4.49995L8.19289 18.9761H17.4443V16.6522H19.1544V18.9761H20.9941C20.9941 18.9761 21.9983 19.5799 21.9983 14.7163C21.9983 14.7163 22.0867 8.94913 20.9997 8.94913Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-engine': Obi08Engine;
  }
}
