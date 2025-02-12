import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import iconStyle from './icon-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum IconButtonVariant {
  normal = 'normal',
  raised = 'raised',
  flat = 'flat',
}

@customElement('obc-icon-button')
export class ObcIconButton extends LitElement {
  @property({type: String}) variant: IconButtonVariant =
    IconButtonVariant.normal;
  @property({type: Boolean}) activated = false;
  @property({type: Boolean}) cornerLeft = false;
  @property({type: Boolean}) cornerRight = false;
  @property({type: Boolean}) activeColor = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['variant-' + this.variant]: true,
          activated: this.activated,
          'corner-left': this.cornerLeft,
          'corner-right': this.cornerRight,
          'active-color': this.activeColor,
        })}
      >
        <div class="visible-wrapper">
          <div class="icon" part="icon">
            <slot></slot>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon-button': ObcIconButton;
  }
}
