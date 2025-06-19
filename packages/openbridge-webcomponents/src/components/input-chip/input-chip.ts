import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './input-chip.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-close-google.js';

/**
 * @fires remove-chip - Fired when the chip is removed
 */
@customElement('obc-input-chip')
export class ObcInputChip extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean, reflect: true}) showIcon = true;

  private handleRemove() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('remove-chip', {
        detail: {
          label: this.label,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderLeadingIcon() {
    console.log('renderLeadingIcon called, showIcon:', this.showIcon);
    if (this.showIcon) {
      return html`
        <div class="chip-icon-wrapper">
          <slot></slot>
        </div>
      `;
    }
    return html``;
  }

  override render() {
    console.log('render called, showIcon:', this.showIcon);
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'status-enabled': !this.disabled,
        })}
        @click=${this.handleRemove}
        ?disabled=${this.disabled}
        aria-label="Remove ${this.label}"
      >
        <div class="chip-container">
          ${this.renderLeadingIcon()}

          <div class="chip-label-container">
            <span class="chip-label">${this.label}</span>
          </div>

          <div class="chip-icon-wrapper">
            <obi-close-google class="chip-icon"></obi-close-google>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-input-chip': ObcInputChip;
  }
}
