import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {SlotController} from '../../slot-controller.js';
import {property} from 'lit/decorators.js';
import iconStyle from './icon-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

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
  @property({type: Number}) progress: undefined | number = undefined;

  private hasLabelController: SlotController = new SlotController(
    this,
    'label'
  );

  get progressSpinner() {
    if (this.progress === undefined) {
      return nothing;
    }
    if (this.progress === 100) {
      return html`<div class="progress-spinner">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="#325B9A"
            stroke-width="4"
            fill="none"
          />
        </svg>
      </div>`;
    }
    const angleRad = (this.progress * 0.95 * 3.6 * Math.PI) / 180;
    const x = 20 + 18 * Math.sin(angleRad);
    const y = 20 - 18 * Math.cos(angleRad);
    const largeArcFlag = angleRad > Math.PI ? 1 : 0;
    return html`<div class="progress-spinner">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="var(--container-backdrop-color)"
          stroke-width="4"
          fill="none"
        />
        <path
          d="M18 2 A18 18 0 ${largeArcFlag} 1 ${x} ${y}"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </div>`;
  }

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
          progress: this.progress !== undefined,
        })}
        ?disabled=${this.disabled}
        part="wrapper"
      >
        ${this.progress !== undefined ? this.progressSpinner : nothing}
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
