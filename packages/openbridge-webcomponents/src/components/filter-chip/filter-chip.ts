import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './filter-chip.css?inline';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-check-google.js';

export enum ChipState {
  Unchecked = 'unchecked',
  Checked = 'checked',
}

export type ObcFilterChipChangeEvent = CustomEvent<{
  label: string;
  checked: boolean;
}>;

/**
 *
 * @fires chip-toggle {ObcFilterChipChangeEvent} - Fired when the chip is toggled.
 */
@customElement('obc-filter-chip')
export class ObcFilterChip extends LitElement {
  @property({type: Boolean}) disabled = false;
  @property({type: String}) label = 'Label';
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) showIcon = true; // Whether to show an icon at all

  private handleClick() {
    if (this.disabled) return;

    // Toggle state
    this.checked = !this.checked;

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('chip-toggle', {
        detail: {
          label: this.label,
          checked: this.checked,
        },
      })
    );
  }

  private renderLeadingIcon() {
    const icons = [];

    if (this.checked) {
      icons.push(html`
        <div class="chip-icon-wrapper">
          <obi-check-google class="chip-icon"></obi-check-google>
        </div>
      `);
    }

    if (this.showIcon) {
      icons.push(html`
        <div class="chip-icon-wrapper">
          <slot></slot>
        </div>
      `);
    }

    return icons;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-checked': this.checked,
          'state-unchecked': !this.checked,
          'status-enabled': !this.disabled,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-pressed=${this.checked}
        aria-label=${this.label}
        role="checkbox"
      >
        <div class="chip-container">
          ${this.renderLeadingIcon()}
          <div class="chip-label-container">
            <span class="chip-label">${this.label}</span>
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-filter-chip': ObcFilterChip;
  }
}
