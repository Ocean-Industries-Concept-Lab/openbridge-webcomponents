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

@customElement('obc-filter-chip')
export class ObcFilterChip extends LitElement {
  @property({type: Boolean}) disabled = false;
  @property({type: String}) label = 'Label';
  @property({type: String}) state: ChipState = ChipState.Unchecked;
  @property({type: Boolean}) showIcon = true; // Whether to show an icon at all

  private get isChecked() {
    return this.state === ChipState.Checked;
  }

  private handleClick() {
    if (this.disabled) return;

    // Toggle state
    if (this.isChecked) {
      this.state = ChipState.Unchecked;
    } else {
      this.state = ChipState.Checked;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('chip-toggle', {
        detail: {
          state: this.state,
          label: this.label,
          checked: this.isChecked,
        },
        bubbles: true,
      })
    );
  }

  private renderLeadingIcon() {
    const icons = [];

    if (this.isChecked) {
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
          'state-checked': this.isChecked,
          'state-unchecked': !this.isChecked,
          'status-disabled': this.disabled,
          'status-enabled': !this.disabled,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
      >
        <div
          class="chip-container"
          aria-pressed="${this.isChecked}"
          ?aria-disabled="${this.disabled}"
        >
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
