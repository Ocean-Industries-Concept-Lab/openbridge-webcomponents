import {LitElement, html, unsafeCSS} from 'lit';
import {SlotController} from '../../slot-controller.js';
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
  @property({type: Boolean}) wide = false;
  @property({type: Boolean}) disabled = false;

  private hasLabelController: SlotController = new SlotController(
    this,
    'label'
  );

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
          'has-label': this.hasLabelController.hasAssignedElements,
          wide: this.wide,
        })}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="icon" part="icon">
            <slot></slot>
          </div>
        </div>
        <div class="label" part="label">
          <slot name="label"></slot>
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
