import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './tag.css?inline';

export enum TagColor {
  gray = 'gray',
  blue = 'blue',
  cyan = 'cyan',
  teal = 'teal',
  green = 'green',
  yellow = 'yellow',
  orange = 'orange',
  red = 'red',
  purple = 'purple',
  indigo = 'indigo',
}

@customElement('obc-tag')
export class ObcTag extends LitElement {
  @property({type: String}) label = 'Label';

  @property({type: String}) color: TagColor = TagColor.gray;

  @property({type: Boolean}) hasIcon = false;

  private renderLeadingIcon() {
    if (this.hasIcon) {
      return html`
        <div class="tag-icon-wrapper">
          <slot></slot>
        </div>
      `;
    }
    return html``;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['color-' + this.color]: true,
        })}
      >
        ${this.renderLeadingIcon()}
        <div class="tag-label-container">
          <span class="tag-label">${this.label}</span>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tag': ObcTag;
  }
}
