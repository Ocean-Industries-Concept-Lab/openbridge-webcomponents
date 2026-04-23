import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './cycling-dropdown-button.css?inline';
import '../../icons/icon-unfold-more-google.js';
import '../context-menu-input/context-menu-input.js';
import type {
  ContextMenuOption,
  ObcContextMenuInputChangeEvent,
} from '../context-menu-input/context-menu-input.js';
import {ContextMenuType} from '../context-menu-input/context-menu-input.js';

export type ObcCyclingDropdownButtonChangeEvent = CustomEvent<{
  value: string;
  label: string;
}>;

const AUTO_CLOSE_DELAY_MS = 2000;
const CLOSE_ANIMATION_MS = 140;

/**
 * `<obc-cycling-dropdown-button>` – A dropdown button that supports cycling through options while the menu is open.
 *
 * Presents a full-width dropdown button with an optional leading icon. Options can include icons in the menu. When the menu is open, clicking the button advances selection to the next option (wrapping around) without closing the menu.
 *
 * @slot icon - Icon displayed at the start of the button.
 * @fires change {ObcCyclingDropdownButtonChangeEvent} When the selected value changes.
 */
@customElement('obc-cycling-dropdown-button')
export class ObcCyclingDropdownButton extends LitElement {
  @property({type: Array}) options: ContextMenuOption[] = [];
  @property({type: String}) value: string | undefined;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) fullWidth = false;
  @property({type: Boolean}) openTop = false;
  @property({type: Number}) autoCloseDelayMs = AUTO_CLOSE_DELAY_MS;

  @state() private isOpen = false;
  @state() private isClosing = false;
  @state() private selectedValue = '';

  @query('.positioned-menu') private menu?: HTMLElement & {
    showPopover: () => void;
    hidePopover: () => void;
  };

  private autoCloseTimeout?: number;
  private closeAnimationTimeout?: number;
  private onDocumentPointerDown?: (e: PointerEvent) => void;

  private clearTimeoutId(id: number | undefined) {
    if (id !== undefined) {
      window.clearTimeout(id);
    }
    return undefined;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.updateSelectedValues();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.detachDocumentPointerDown();
    this.clearAutoCloseTimer();
    this.clearCloseAnimationTimer();
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (changed.has('options') || changed.has('value')) {
      this.updateSelectedValues();
    }
  }

  private updateSelectedValues() {
    if (!this.options.length) {
      this.selectedValue = '';
      return;
    }
    const nextValue = this.value ?? this.options[0].value;
    this.selectedValue = nextValue;
  }

  private get selectedLabel(): string {
    if (!this.options.length || !this.selectedValue) return '';
    return (
      this.options.find((o) => o.value === this.selectedValue)?.label ?? ''
    );
  }

  private emitChange(value: string) {
    const label = this.options.find((o) => o.value === value)?.label ?? '';
    const detail = {value, label};
    this.dispatchEvent(
      new CustomEvent('change', {detail}) as ObcCyclingDropdownButtonChangeEvent
    );
  }

  private openMenu() {
    if (this.disabled || this.menu === undefined) return;
    this.clearCloseAnimationTimer();
    this.isClosing = false;
    this.menu.showPopover();
  }

  private closeMenuImmediate() {
    if (this.menu === undefined) return;
    this.menu.hidePopover();
  }

  private clearAutoCloseTimer() {
    this.autoCloseTimeout = this.clearTimeoutId(this.autoCloseTimeout);
  }

  private clearCloseAnimationTimer() {
    this.closeAnimationTimeout = this.clearTimeoutId(
      this.closeAnimationTimeout
    );
  }

  private requestCloseMenu() {
    if (this.menu === undefined) return;
    if (!this.isOpen) return;
    if (this.isClosing) return;

    this.isClosing = true;
    this.clearAutoCloseTimer();
    this.clearCloseAnimationTimer();
    this.closeAnimationTimeout = window.setTimeout(() => {
      this.closeMenuImmediate();
    }, CLOSE_ANIMATION_MS);
  }

  private scheduleAutoClose() {
    this.clearAutoCloseTimer();
    if (!this.isOpen || this.autoCloseDelayMs <= 0) return;
    this.autoCloseTimeout = window.setTimeout(() => {
      if (!this.isOpen) return;
      this.requestCloseMenu();
    }, this.autoCloseDelayMs);
  }

  private attachDocumentPointerDown() {
    if (this.onDocumentPointerDown) return;
    this.onDocumentPointerDown = (e: PointerEvent) => {
      if (!this.isOpen) return;
      const path = e.composedPath();
      if (path.includes(this)) return;
      this.requestCloseMenu();
    };
    document.addEventListener('pointerdown', this.onDocumentPointerDown, {
      capture: true,
    });
  }

  private detachDocumentPointerDown() {
    if (!this.onDocumentPointerDown) return;
    document.removeEventListener('pointerdown', this.onDocumentPointerDown, {
      capture: true,
    });
    this.onDocumentPointerDown = undefined;
  }

  private handleToggle = (e: ToggleEvent) => {
    this.isOpen = e.newState === 'open';
    if (this.isOpen) {
      this.isClosing = false;
      this.attachDocumentPointerDown();
      this.scheduleAutoClose();
    } else {
      this.detachDocumentPointerDown();
      this.clearAutoCloseTimer();
      this.clearCloseAnimationTimer();
      this.isClosing = false;
    }
  };

  private handleUserInteraction = () => {
    if (!this.isOpen) return;
    this.scheduleAutoClose();
  };

  private advanceSelection() {
    if (!this.options.length) return;
    const currentIdx = Math.max(
      0,
      this.options.findIndex((o) => o.value === this.selectedValue)
    );
    const nextIdx = (currentIdx + 1) % this.options.length;
    const next = this.options[nextIdx];
    this.value = next.value;
    this.selectedValue = next.value;
    this.emitChange(next.value);
  }

  private handleButtonClick = (e: MouseEvent) => {
    if (this.disabled) return;
    if (!this.isOpen) {
      this.openMenu();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.advanceSelection();
  };

  private handleMenuChange = (e: ObcContextMenuInputChangeEvent) => {
    const next = e.detail.selectedValues[0];
    if (!next) return;
    this.selectedValue = next;
    this.value = next;
    this.emitChange(next);
  };

  override render() {
    const selectedValues = this.selectedValue ? [this.selectedValue] : [];
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'full-width': this.fullWidth,
          'open-top': this.openTop,
          disabled: this.disabled,
          'is-open': this.isOpen,
          'is-closing': this.isClosing,
        })}
        @pointerdown=${this.handleUserInteraction}
        @keydown=${this.handleUserInteraction}
      >
        <button
          class="cycling-dd-wrapper"
          ?disabled=${this.disabled}
          @click=${this.handleButtonClick}
          aria-expanded=${this.isOpen ? 'true' : 'false'}
          aria-haspopup="menu"
        >
          <div class="visible-wrapper">
            <div class="icon-container"><slot name="icon"></slot></div>
            <div class="label">${this.selectedLabel}</div>
            <div class="trailing-icon" aria-hidden="true">
              <slot name="trailing-icon">
                <obi-unfold-more-google></obi-unfold-more-google>
              </slot>
            </div>
          </div>
        </button>

        <obc-context-menu-input
          .popover=${'manual'}
          class="positioned-menu match-anchor-width"
          .type=${ContextMenuType.Regular}
          .options=${this.options}
          .selectedValues=${selectedValues}
          @change=${this.handleMenuChange}
          @toggle=${this.handleToggle}
        >
        </obc-context-menu-input>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-cycling-dropdown-button': ObcCyclingDropdownButton;
  }
}
