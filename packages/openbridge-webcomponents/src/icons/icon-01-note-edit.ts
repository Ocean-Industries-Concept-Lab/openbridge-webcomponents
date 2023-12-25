import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-note-edit')
export class Obi01NoteEdit extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21V19.225L17.4 13.825L19.175 15.6L13.775 21H12ZM3 15.75V14.25H10.5V15.75H3ZM20.25 14.525L18.475 12.75L19.2 12.025C19.3333 11.8917 19.5083 11.825 19.725 11.825C19.9417 11.825 20.1167 11.8917 20.25 12.025L20.975 12.75C21.1083 12.8833 21.175 13.0583 21.175 13.275C21.175 13.4917 21.1083 13.6667 20.975 13.8L20.25 14.525ZM3 11.625V10.125H14.75V11.625H3ZM3 7.5V6H14.75V7.5H3Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21V19.225L17.4 13.825L19.175 15.6L13.775 21H12ZM3 15.75V14.25H10.5V15.75H3ZM20.25 14.525L18.475 12.75L19.2 12.025C19.3333 11.8917 19.5083 11.825 19.725 11.825C19.9417 11.825 20.1167 11.8917 20.25 12.025L20.975 12.75C21.1083 12.8833 21.175 13.0583 21.175 13.275C21.175 13.4917 21.1083 13.6667 20.975 13.8L20.25 14.525ZM3 11.625V10.125H14.75V11.625H3ZM3 7.5V6H14.75V7.5H3Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-01-note-edit': Obi01NoteEdit;
  }
}
