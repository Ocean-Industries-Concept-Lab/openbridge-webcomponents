import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import compentStyle from './start-stop-switch.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-arrow-right-google.js';

export type ObcStartStopSwitchChangeEvent = CustomEvent<{checked: boolean}>;

/**
 * @summary A switch component that can be used to toggle between two states.
 *
 * @fires change {ObcStartStopSwitchChangeEvent} - Emitted when the switch is toggled.
 *
 * @slot checked-state-icon - The icon to display when the switch is checked.
 * @slot unchecked-state-icon - The icon to display when the switch is unchecked.
 * @slot checked-state-label - The label to display when the switch is checked.
 * @slot unchecked-state-label - The label to display when the switch is unchecked.
 * @slot checked-label - The label to display when the switch is checked.
 * @slot unchecked-label - The label to display when the switch is unchecked.
 */
@customElement('obc-start-stop-switch')
export class ObcStartStopSwitch extends LitElement {
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) hasUncheckedStateIcon = true;
  @property({type: Boolean}) hasCheckedStateIcon = true;

  @state() private dragging = false;
  @state() private tmpChecked = false;

  private dragStartX = 0;
  private dragCurrentX = 0;
  private dragOffset = 0;
  private trackWidth = 0;
  private buttonWidth = 0;

  @query('.button')
  private buttonRef?: HTMLElement;

  @query('.button-track')
  private trackRef?: HTMLElement;

  private onDragStart = (e: MouseEvent | TouchEvent) => {
    this.dragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX;
    } else {
      this.dragStartX = e.touches[0].clientX;
    }
    this.dragCurrentX = this.dragStartX;
    this.trackWidth = this.trackRef?.offsetWidth || 0;
    this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('touchmove', this.onDragMove, {passive: false});
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.dragging) return;
    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
      e.preventDefault();
    }
    this.dragCurrentX = clientX;
    this.dragOffset = this.dragCurrentX - this.dragStartX;
    const percent = Math.abs(
      this.dragOffset / (this.trackWidth - this.buttonWidth)
    );
    this.tmpChecked = this.checked ? percent < 0.5 : percent > 0.5;
    this.requestUpdate();
  };

  private onDragEnd = () => {
    if (!this.dragging) return;
    this.dragging = false;
    // Calculate drag percentage
    const maxOffset = this.trackWidth - this.buttonWidth;
    const startPosition = this.checked ? maxOffset : 0;
    const newPosition = startPosition + this.dragOffset;
    const percent = newPosition / maxOffset;
    if (!this.checked && percent > 0.9) {
      this.checked = true;
      this.dispatchEvent(
        new CustomEvent('change', {detail: {checked: this.checked}})
      );
    } else if (this.checked && percent < 0.1) {
      this.checked = false;
      this.dispatchEvent(
        new CustomEvent('change', {detail: {checked: this.checked}})
      );
    }
    this.tmpChecked = this.checked;
    this.dragOffset = 0;
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
    this.requestUpdate();
  };

  private getButtonStyle() {
    if (!this.dragging) return '';

    // Calculate the button's left position
    const maxOffset = this.trackWidth - this.buttonWidth;
    let left = this.checked ? maxOffset : 0;
    left += this.dragOffset;
    left = Math.max(0, Math.min(left, maxOffset));

    return `left: ${left}px; right: auto;`;
  }

  override firstUpdated() {
    // Update track and button width on resize
    const resizeObserver = new ResizeObserver(() => {
      this.trackWidth = this.trackRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    });
    if (this.trackRef) resizeObserver.observe(this.trackRef);
    if (this.buttonRef) resizeObserver.observe(this.buttonRef);
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          checked: this.checked,
          unchecked: !this.checked,
          dragging: this.dragging,
          'tmp-checked': this.tmpChecked && this.dragging,
          'tmp-unchecked': !this.tmpChecked && this.dragging,
        })}
        aria-checked=${this.checked}
        role="switch"
      >
        <div class="button-track">
          <button
            class="button"
            style=${this.getButtonStyle()}
            @mousedown=${this.onDragStart}
            @touchstart=${this.onDragStart}
          >
            <obi-arrow-right-google
              class="button-icon"
            ></obi-arrow-right-google>
            <div class="button-label">
              <slot
                name=${this.checked ? 'checked-label' : 'unchecked-label'}
              ></slot>
            </div>
          </button>
          <div class="button-track-checked"></div>
          <div class="checked state">
            ${this.hasCheckedStateIcon
              ? html`<slot name="checked-state-icon"></slot>`
              : ''}
            <div class="state-label">
              <slot name="checked-state-label"></slot>
            </div>
          </div>
          <div class="unchecked state">
            ${this.hasUncheckedStateIcon
              ? html`<slot name="unchecked-state-icon"></slot>`
              : ''}
            <div class="state-label">
              <slot name="unchecked-state-label"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-start-stop-switch': ObcStartStopSwitch;
  }
}
