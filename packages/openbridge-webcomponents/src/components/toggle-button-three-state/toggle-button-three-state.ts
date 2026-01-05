import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../../icons/icon-check-google.js';
import '../../icons/icon-close-google.js';
import '../toggle-button-group/toggle-button-group.js';
import {ObcToggleButtonOptionType} from '../toggle-button-option/toggle-button-option.js';
import componentStyle from './toggle-button-three-state.css?inline';
import {customElement} from '../../decorator.js';

export enum ObcToggleButtonThreeStateValue {
  noInput = 'no-input',
  success = 'success',
  error = 'error',
}

export type ObcToggleButtonThreeStateChangeEvent = CustomEvent<{
  state: ObcToggleButtonThreeStateValue;
}>;

/**
 * `<obc-toggle-button-three-state>` – A three-state segmented control for no input, success, and error.
 *
 * Provides a fixed three-option toggle with icon-only segments:
 * - Error (X)
 * - No input (dot)
 * - Success (check)
 *
 * The component manages its own `state` and emits a `change` event when the
 * selection changes. Use `disabled` to make it non-interactive.
 *
 * @fires change {ObcToggleButtonThreeStateChangeEvent} Fired when the state changes.
 */
@customElement('obc-toggle-button-three-state')
export class ObcToggleButtonThreeState extends LitElement {
  /**
   * Current state of the toggle.
   */
  @property({type: String}) state: ObcToggleButtonThreeStateValue =
    ObcToggleButtonThreeStateValue.noInput;

  /**
   * Disables interaction when true.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  private updateState(next: ObcToggleButtonThreeStateValue) {
    if (this.disabled || this.state === next) {
      return;
    }

    this.state = next;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {state: this.state},
      })
    );
  }

  private isValidState(value: string): value is ObcToggleButtonThreeStateValue {
    return Object.values(ObcToggleButtonThreeStateValue).includes(
      value as ObcToggleButtonThreeStateValue
    );
  }

  private handleValueChange(event: CustomEvent<{value: string}>) {
    if (this.disabled) {
      return;
    }

    const next = event.detail.value;
    if (this.isValidState(next)) {
      this.updateState(next);
    }
  }

  override render() {
    return html`
      <obc-toggle-button-group
        .value=${this.state}
        .type=${ObcToggleButtonOptionType.icon}
        ?disabled=${this.disabled}
        hugText
        aria-label="Three state toggle"
        @value=${this.handleValueChange}
      >
        <obc-toggle-button-option
          class="segment error"
          value=${ObcToggleButtonThreeStateValue.error}
          aria-label="Error"
        >
          <obi-close-google slot="icon"></obi-close-google>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          class="segment neutral"
          value=${ObcToggleButtonThreeStateValue.noInput}
          aria-label="No input"
        >
          <span class="dot" slot="icon" aria-hidden="true"></span>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          class="segment success"
          value=${ObcToggleButtonThreeStateValue.success}
          aria-label="Success"
        >
          <obi-check-google slot="icon"></obi-check-google>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-three-state': ObcToggleButtonThreeState;
  }
}
