import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-check-mixed.js';
import '../../icons/icon-check-google.js';
import componentStyle from './checkbox.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum CheckboxStatus {
  unchecked = 'unchecked',
  checked = 'checked',
  mixed = 'mixed',
}

export type ObcCheckboxChangeEvent = CustomEvent<{
  status: CheckboxStatus;
  disabled: boolean;
}>;

/**
 * @fires change {ObcCheckboxChangeEvent} - Emitted when the status changes.
 * @fires disabled {ObcCheckboxChangeEvent} - Emitted when the disabled state changes.
 */
@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  @property({type: String}) status: CheckboxStatus = CheckboxStatus.checked;
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: String}) label: string = 'Checkbox item';
  @property({type: String}) ariaDescribedby: string = '';

  protected override updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('disabled')) {
      this.dispatchEvent(
        new CustomEvent('disabled', {
          detail: {value: this.disabled, status: this.status},
        })
      );
    }
  }

  private toggleStatus() {
    if (this.disabled) return;

    if (this.status === CheckboxStatus.checked) {
      this.status = CheckboxStatus.unchecked;
    } else {
      this.status = CheckboxStatus.checked;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: this.status,
          disabled: this.disabled,
        },
      })
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      this.toggleStatus();
    }
  }

  override get ariaChecked() {
    switch (this.status) {
      case 'checked':
        return 'true';
      case 'mixed':
        return 'mixed';
      case 'unchecked':
      default:
        return 'false';
    }
  }

  override render() {
    return html`
      <div class="visually-hidden">
        <div
          class=${classMap({
            'checkbox-container': true,
            [`status-${this.status}`]: true,
            disabled: this.disabled,
          })}
          role="checkbox"
          aria-checked=${this.ariaChecked}
          aria-labelledby="checkbox-label"
          aria-describedby=${this.ariaDescribedby}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.toggleStatus}
          @keydown=${this.handleKeydown}
        >
          <div class="checkbox-box">
            ${this.status === 'checked'
              ? html`<obi-check-google
                  class="checkbox-icon"
                ></obi-check-google>`
              : this.status === 'mixed'
                ? html`<obi-check-mixed
                    class="checkbox-icon"
                  ></obi-check-mixed>`
                : html`<span class="checkbox-icon"></span>`}
          </div>
          <div class="checkbox-label-container">
            <span id="checkbox-label" class="checkbox-label">
              ${this.label}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [unsafeCSS(componentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox': ObcCheckbox;
  }
}
