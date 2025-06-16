import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../../icons/icon-check-mixed.js';
import '../../icons/icon-check-google.js';
import componentStyle from './checkbox.css?inline';

type CheckboxStatus = 'unchecked' | 'checked' | 'mixed';
type CheckboxState = 'active' | 'enabled' | 'disabled';

@customElement('obc-checkbox')
export class ObcCheckbox extends LitElement {
  @property({type: String}) status: CheckboxStatus = 'unchecked';
  @property({type: String}) state: CheckboxState = 'enabled';
  @property({type: String}) label: string = 'Checkbox item';
  @property({type: String}) ariaDescribedby: string = '';

  private toggleStatus() {
    if (this.state === 'disabled') return;
    
    this.status =
      this.status === 'checked'
        ? 'mixed'
        : this.status === 'mixed'
        ? 'unchecked'
        : 'checked';
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { 
        status: this.status,
        state: this.state 
      },
      bubbles: true
    }));
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggleStatus();
    }
  }

  private handleMouseDown() {
    if (this.state === 'disabled') return;
    this.state = 'active';
  }

  private handleMouseUp() {
    if (this.state === 'active') {
      this.state = 'enabled';
    }
  }

  private handleMouseLeave() {
    if (this.state === 'active') {
      this.state = 'enabled';
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

  private get isDisabled() {
    return this.state === 'disabled';
  }

  private get cssClasses() {
    return `checkbox-container status-${this.status} state-${this.state}`;
  }

  override render() {
    return html`
    <div class="visually-hidden">
      <div 
        class="${this.cssClasses}"
        role="checkbox"
        aria-checked="${this.ariaChecked}"
        aria-labelledby="checkbox-label"
        aria-describedby="${this.ariaDescribedby}"
        ?aria-disabled="${this.isDisabled}"
        tabindex="${this.isDisabled ? '-1' : '0'}"
        @click=${this.toggleStatus}
        @keydown=${this.handleKeydown}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="checkbox-box">
          ${this.status === 'checked'
            ? html`<obi-check-google class="checkbox-icon"></obi-check-google>`
            : this.status === 'mixed'
            ? html`<obi-check-mixed class="checkbox-icon"></obi-check-mixed>`
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