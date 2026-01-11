import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state, query} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './keyboard-full.css?inline';

import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-backspace-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-arrow-left-google.js';
import '../../icons/icon-shift-lock.js';
import '../text-input-field/text-input-field.js';
import {
  ObcTextInputField,
  ObcTextInputFieldSize,
} from '../text-input-field/text-input-field.js';
import '../button/button.js';
import '../check-button/check-button.js';

export enum ObcKeyboardFullType {
  Floating = 'floating',
  Flat = 'flat',
}

export enum ObcKeyboardFullMode {
  ABC = 'abc',
  Numbers = '123',
  Symbols = 'symbols',
  SymbolsWithNumberRow = 'symbols-with-number-row',
}

/**
 * `<obc-keyboard-full>` – A comprehensive virtual keyboard component for alphanumeric text input.
 *
 * A full-featured on-screen keyboard that provides QWERTY layout with numeric and symbol modes,
 * designed for touch-screen interfaces where physical keyboards are unavailable or impractical.
 * Includes an integrated text input field with cursor positioning, action buttons for mode switching,
 * and customizable visual presentation.
 *
 * ## Features
 *
 * ### Keyboard Modes
 * The component supports multiple input modes that users can toggle between:
 *
 * - **ABC Mode (QWERTY)**: Standard alphabetic layout with CAPS lock functionality for uppercase/lowercase toggling.
 *   When CAPS is enabled, letters appear in uppercase; when disabled, lowercase.
 * - **123 Mode (Numbers)**: Numeric layout (0-9) combined with commonly-used symbols like parentheses,
 *   forward/backslash, quotation marks, and mathematical operators.
 * - **Symbols Mode**: Extended symbol set including currency symbols (§, €, £), brackets, mathematical
 *   operators, and punctuation marks for specialized input.
 *
 * ### Visual Variants
 *
 * - **Floating (`type="floating"`)**: Default presentation with shadow elevation and rounded corners,
 *   appearing to float above the UI. Suitable for modal or overlay contexts.
 * - **Flat (`type="flat"`)**: Minimalist presentation without shadows, designed to integrate seamlessly
 *   at the bottom of the screen or within embedded layouts. Uses a top border for subtle separation.
 *
 * ### Layout Configurations
 *
 * - **Standard Layout** (`showNumberRow={false}`): Three-row QWERTY layout with mode toggle buttons
 *   (ABC → 123 → Symbols → ABC) and cursor navigation arrows positioned beside the input field.
 * - **Compact Layout with Number Row** (`showNumberRow={true}`): Four-row layout featuring a dedicated
 *   number row (1-0) above the QWERTY keys. In this mode, only ABC and Symbols modes are available
 *   (no dedicated 123 mode), and cursor navigation arrows relocate to the action button panel on the right.
 *
 * ### Interactive Elements
 *
 * - **Integrated Input Field**: Displays current text value with placeholder support and direct editing capability.
 * - **Cursor Navigation**: Left/right arrow buttons for precise cursor positioning within the text.
 * - **SPACE Bar**: Full-width button for space character insertion at cursor position.
 * - **DEL (Backspace)**: Removes character before cursor position, with visual icon indicator.
 * - **CAPS Button**: Toggles uppercase/lowercase for alphabetic characters (ABC mode only).
 * - **Mode Toggle Button**: Cycles between keyboard modes, showing appropriate label (123, #+=, or ABC).
 * - **DONE Button**: Confirms input completion and dispatches the `done-click` event with final value.
 * - **Close Button** (optional): Appears in top bar when `showTopBar={true}`, dispatches `close-click` event.
 *
 * ### Optional Top Bar
 *
 * When `showTopBar` is enabled, displays a header containing:
 * - Parameter name label (customizable via `parameterName` property) in overline typography style
 * - Close button (icon-button with close icon) aligned to the right
 *
 * ## Usage Guidelines
 *
 * Use `<obc-keyboard-full>` when:
 * - Implementing touch-screen applications where users cannot access physical keyboards
 * - Building kiosk interfaces, embedded systems, or specialized control panels
 * - Creating password entry or secure input fields requiring custom keyboard layouts
 * - Designing applications for environments where on-screen keyboards improve workflow
 *   (e.g., gloves-required environments, or where switching between physical keyboard and touchscreen is inefficient)
 *
 * **Layout Decision Guide:**
 * - Use **floating type** for modal dialogs, overlays, or temporary input contexts where the keyboard
 *   should appear distinct from underlying content.
 * - Use **flat type** for persistent keyboards anchored to the bottom of the screen or embedded
 *   within a fixed layout section.
 * - Enable **showNumberRow** when frequent numeric input is required (passwords, codes, mixed alphanumeric),
 *   reducing mode switches. This is ideal for fields like serial numbers, product codes, or passwords
 *   containing both letters and numbers.
 * - Disable **showNumberRow** for primarily alphabetic input or when screen space is limited,
 *   as standard layout provides more compact dimensions.
 *
 * **Best Practices:**
 * - Always provide meaningful `parameterName` text when `showTopBar` is enabled to give users context
 *   about what they're entering (e.g., "Enter Password", "Station Name", "Notes").
 * - Listen for `value-change` events to reactively update your application state as the user types.
 * - Handle `done-click` to process completed input (e.g., submit form, close keyboard, validate entry).
 * - Handle `close-click` to allow users to dismiss the keyboard without completing input
 *   (equivalent to "cancel" action).
 * - For input fields requiring specific formats (URLs, emails), consider pre-populating `value`
 *   with protocol prefixes or domain suffixes, or add validation after `done-click`.
 *
 * **TODO(designer)**: Confirm whether there are recommended timeout behaviors if the keyboard remains
 * idle, or if keyboard should always require explicit close/done action.
 *
 * **TODO(designer)**: Clarify whether `type="flat"` has specific use cases tied to certain application
 * contexts, or if it's purely a visual preference decision.
 *
 * ## Keyboard Interaction Details
 *
 * The component maintains proper cursor position during editing:
 * - Clicking within the input field positions the cursor at that location
 * - Key presses insert characters at the current cursor position (not just at the end)
 * - Backspace removes the character immediately before the cursor
 * - Space bar inserts a space at the cursor position
 * - Arrow buttons move the cursor left/right one character at a time
 *
 * Focus is automatically maintained on the input field during keyboard interactions to prevent
 * focus loss when clicking keyboard buttons (via `@mousedown` prevention).
 *
 * ## Example Usage
 *
 * **Basic floating keyboard:**
 * ```html
 * <obc-keyboard-full
 *   parameterName="Enter Station Name"
 *   placeholder="Type here..."
 *   @value-change=${(e) => console.log('Value:', e.detail.value)}
 *   @done-click=${(e) => this.handleSubmit(e.detail.value)}
 *   @close-click=${() => this.dismissKeyboard()}
 * >
 * </obc-keyboard-full>
 * ```
 *
 * **Flat keyboard with number row for password input:**
 * ```html
 * <obc-keyboard-full
 *   type="flat"
 *   parameterName="Password"
 *   placeholder="Enter password"
 *   showNumberRow
 *   showTopBar={false}
 *   @done-click=${(e) => this.validatePassword(e.detail.value)}
 * >
 * </obc-keyboard-full>
 * ```
 *
 * **Pre-filled value for editing:**
 * ```html
 * <obc-keyboard-full
 *   value="Initial text"
 *   parameterName="Edit Description"
 *   @value-change=${(e) => this.updateDraft(e.detail.value)}
 * >
 * </obc-keyboard-full>
 * ```
 *
 * @fires value-change {CustomEvent<{value: string}>} Dispatched whenever the text value changes
 *   (on key press, backspace, space, or direct input field editing). The `detail.value` contains
 *   the complete current text string.
 * @fires done-click {CustomEvent<{value: string}>} Dispatched when the DONE button is clicked,
 *   indicating the user has completed text entry. The `detail.value` contains the final text string.
 * @fires close-click {CustomEvent<void>} Dispatched when the close button (in top bar) is clicked,
 *   allowing the application to dismiss the keyboard without submitting the value.
 */
@customElement('obc-keyboard-full')
export class ObcKeyboardFull extends LitElement {
  @property({type: String}) type: ObcKeyboardFullType =
    ObcKeyboardFullType.Floating;

  @property({type: Boolean}) showTopBar = true;
  @property({type: String}) parameterName = 'Parameter name';

  @property({type: String}) value = '';
  @property({type: String}) placeholder = 'Placeholder';
  @property({type: Boolean}) showNumberRow = false;
  @property({type: String}) inputSize: ObcTextInputFieldSize =
    ObcTextInputFieldSize.Large;

  @state() private mode: ObcKeyboardFullMode = ObcKeyboardFullMode.ABC;
  @state() private capsLock = false;

  @query('obc-text-input-field')
  private inputField!: ObcTextInputField;

  // Keyboard layouts
  private readonly numberRow = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];

  private readonly qwertyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', '-'],
  ];

  private readonly symbolsWithNumberRowLayout = [
    ['$', '[', ']', '{', '}', '#', '^', '*', '='],
    ['"', '+', '(', ')', '/', '\\', '&', '%', '@'],
    ["'", '?', '!', ';', ':', '"', ',', '.', '-'],
  ];

  private readonly numbersLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['"', '+', '(', ')', '/', '\\', '&', '%', '@'],
    ["'", '?', '!', ';', ':', '"', ',', '.', '-'],
  ];

  private readonly symbolsLayout = [
    ['§', '[', ']', '{', '}', '#', '^', '*', '='],
    ['~', '_', '|', '<', '>', '$', '€', '£'],
    ['"', "'", '?', '!', ';', ':', ',', '.', '-'],
  ];

  private onCloseClick = () => {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  };

  private preventFocusLoss = (e: MouseEvent) => {
    e.preventDefault();
  };

  private onKeyPress = async (key: string) => {
    const char =
      this.capsLock &&
      this.mode === ObcKeyboardFullMode.ABC &&
      !this.showNumberRow
        ? key.toUpperCase()
        : key.toLowerCase();

    const inputElement = this.inputField?.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (inputElement && inputElement.selectionStart !== null) {
      const cursorPos = inputElement.selectionStart;
      this.value =
        this.value.slice(0, cursorPos) + char + this.value.slice(cursorPos);
      this.dispatchValueChange();

      // Move cursor forward after insertion
      await this.updateComplete;
      inputElement.focus();
      inputElement.setSelectionRange(cursorPos + 1, cursorPos + 1);
    } else {
      this.value += char;
      this.dispatchValueChange();
    }
  };

  private onBackspace = async () => {
    const inputElement = this.inputField?.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (
      inputElement &&
      inputElement.selectionStart !== null &&
      inputElement.selectionStart > 0
    ) {
      const cursorPos = inputElement.selectionStart;
      this.value =
        this.value.slice(0, cursorPos - 1) + this.value.slice(cursorPos);
      this.dispatchValueChange();

      // Move cursor back after deletion
      await this.updateComplete;
      inputElement.focus();
      inputElement.setSelectionRange(cursorPos - 1, cursorPos - 1);
    } else if (this.value.length > 0 && !inputElement) {
      // Fallback: remove from end
      this.value = this.value.slice(0, -1);
      this.dispatchValueChange();
    }
  };

  private onSpace = async () => {
    const inputElement = this.inputField?.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (inputElement && inputElement.selectionStart !== null) {
      const cursorPos = inputElement.selectionStart;
      this.value =
        this.value.slice(0, cursorPos) + ' ' + this.value.slice(cursorPos);
      this.dispatchValueChange();

      // Move cursor forward after insertion
      await this.updateComplete;
      inputElement.focus();
      inputElement.setSelectionRange(cursorPos + 1, cursorPos + 1);
    } else {
      // Fallback: append to end
      this.value += ' ';
      this.dispatchValueChange();
    }
  };

  private onToggleCaps = () => {
    this.capsLock = !this.capsLock;
  };

  private onToggleMode = (mode: ObcKeyboardFullMode) => {
    this.mode = mode;
  };

  private onCursorLeft = () => {
    const inputElement = this.inputField?.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.focus();
      if (inputElement.selectionStart !== null) {
        const newPosition = Math.max(0, inputElement.selectionStart - 1);
        inputElement.setSelectionRange(newPosition, newPosition);
      }
    }
  };

  private onCursorRight = () => {
    const inputElement = this.inputField?.shadowRoot?.querySelector(
      'input'
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.focus();
      if (inputElement.selectionStart !== null) {
        const newPosition = Math.min(
          this.value.length,
          inputElement.selectionStart + 1
        );
        inputElement.setSelectionRange(newPosition, newPosition);
      }
    }
  };

  private onDone = () => {
    this.dispatchEvent(
      new CustomEvent('done-click', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  };

  private dispatchValueChange = () => {
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  };

  private onInputFieldValueChanged = (e: Event) => {
    this.value = (e.target as ObcTextInputField).value;
    this.dispatchValueChange();
  };

  private renderCursorNavigation() {
    return html`
      <div class="navigation-buttons-container">
        <obc-icon-button
          variant="normal"
          cornerLeft
          @mousedown=${this.preventFocusLoss}
          @click=${this.onCursorLeft}
        >
          <obi-arrow-left-google></obi-arrow-left-google>
        </obc-icon-button>
        <obc-icon-button
          variant="normal"
          cornerRight
          @mousedown=${this.preventFocusLoss}
          @click=${this.onCursorRight}
        >
          <obi-arrow-right-google></obi-arrow-right-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderModeButton() {
    if (this.showNumberRow) {
      // Toggle between QWERTY and Symbols when number row is visible
      return this.mode === ObcKeyboardFullMode.ABC
        ? html`
            <obc-button
              class="action-button mode-button"
              variant="normal"
              @mousedown=${this.preventFocusLoss}
              @click=${() =>
                this.onToggleMode(ObcKeyboardFullMode.SymbolsWithNumberRow)}
            >
              #+=
            </obc-button>
          `
        : html`
            <obc-button
              class="action-button mode-button"
              variant="normal"
              @mousedown=${this.preventFocusLoss}
              @click=${() => this.onToggleMode(ObcKeyboardFullMode.ABC)}
            >
              ABC
            </obc-button>
          `;
    }

    // Standard mode: cycle through ABC → Numbers → Symbols → ABC
    if (this.mode === ObcKeyboardFullMode.ABC) {
      return html`
        <obc-button
          class="action-button mode-button"
          variant="normal"
          @mousedown=${this.preventFocusLoss}
          @click=${() => this.onToggleMode(ObcKeyboardFullMode.Numbers)}
        >
          123
        </obc-button>
      `;
    }

    if (this.mode === ObcKeyboardFullMode.Numbers) {
      return html`
        <obc-button
          class="action-button mode-button"
          variant="normal"
          @mousedown=${this.preventFocusLoss}
          @click=${() => this.onToggleMode(ObcKeyboardFullMode.Symbols)}
        >
          #+=
        </obc-button>
      `;
    }

    // Symbols mode
    return html`
      <obc-button
        class="action-button mode-button"
        variant="normal"
        @mousedown=${this.preventFocusLoss}
        @click=${() => this.onToggleMode(ObcKeyboardFullMode.ABC)}
      >
        ABC
      </obc-button>
    `;
  }

  private renderKeyboard() {
    if (this.showNumberRow) {
      return this.mode === ObcKeyboardFullMode.SymbolsWithNumberRow
        ? this.renderSymbolsWithNumberRowKeyboard()
        : this.renderABCKeyboard();
    }

    switch (this.mode) {
      case ObcKeyboardFullMode.ABC:
        return this.renderABCKeyboard();
      case ObcKeyboardFullMode.Numbers:
        return this.renderNumbersKeyboard();
      case ObcKeyboardFullMode.Symbols:
        return this.renderSymbolsKeyboard();
      default:
        return this.renderABCKeyboard();
    }
  }

  private renderABCKeyboard() {
    return html`
      <div class="container-left">
        <div class="keys-container">
          ${this.showNumberRow
            ? html`
                <div class="row row-numbers">
                  ${this.numberRow.map(
                    (key) => html`
                      <obc-button
                        class="key-button"
                        variant="raised"
                        @mousedown=${this.preventFocusLoss}
                        @click=${() => this.onKeyPress(key)}
                      >
                        ${key}
                      </obc-button>
                    `
                  )}
                </div>
              `
            : nothing}
          ${this.qwertyLayout.map(
            (row, index) => html`
              <div class="row row-${index + 1}">
                ${index === 2 && row.length < 10
                  ? Array(10 - row.length)
                      .fill(0)
                      .map(
                        () => html`<div class="key-button-placeholder"></div>`
                      )
                  : nothing}
                ${row.map(
                  (key) => html`
                    <obc-button
                      class="key-button"
                      variant="normal"
                      @mousedown=${this.preventFocusLoss}
                      @click=${() => this.onKeyPress(key)}
                    >
                      ${this.capsLock ? key.toUpperCase() : key.toLowerCase()}
                    </obc-button>
                  `
                )}
              </div>
            `
          )}
        </div>
        <obc-button
          ?fullWidth=${true}
          class="space-button"
          @mousedown=${this.preventFocusLoss}
          @click=${this.onSpace}
        >
          SPACE
        </obc-button>
      </div>
    `;
  }

  private renderSymbolsWithNumberRowKeyboard() {
    return html`
      <div class="container-left">
        <div class="keys-container">
          <div class="row row-numbers">
            ${this.numberRow.map(
              (key) => html`
                <obc-button
                  class="key-button"
                  variant="raised"
                  @mousedown=${this.preventFocusLoss}
                  @click=${() => this.onKeyPress(key)}
                >
                  ${key}
                </obc-button>
              `
            )}
          </div>
          ${this.symbolsWithNumberRowLayout.map(
            (row, index) => html`
              <div class="row row-${index + 1}">
                ${row.map(
                  (key) => html`
                    <obc-button
                      class="key-button"
                      variant="normal"
                      @mousedown=${this.preventFocusLoss}
                      @click=${() => this.onKeyPress(key)}
                    >
                      ${key}
                    </obc-button>
                  `
                )}
              </div>
            `
          )}
        </div>
        <obc-button
          ?fullWidth=${true}
          class="space-button"
          @mousedown=${this.preventFocusLoss}
          @click=${this.onSpace}
        >
          SPACE
        </obc-button>
      </div>
    `;
  }

  private renderNumbersKeyboard() {
    return html`
      <div class="container-left">
        <div class="keys-container">
          ${this.numbersLayout.map(
            (row, index) => html`
              <div class="row row-${index + 1}">
                ${row.map(
                  (key) => html`
                    <obc-button
                      class="key-button"
                      variant="normal"
                      @mousedown=${this.preventFocusLoss}
                      @click=${() => this.onKeyPress(key)}
                    >
                      ${key}
                    </obc-button>
                  `
                )}
              </div>
            `
          )}
        </div>
        <obc-button
          ?fullWidth=${true}
          class="space-button"
          @mousedown=${this.preventFocusLoss}
          @click=${this.onSpace}
        >
          SPACE
        </obc-button>
      </div>
    `;
  }

  private renderSymbolsKeyboard() {
    return html`
      <div class="container-left">
        <div class="keys-container">
          ${this.symbolsLayout.map(
            (row, index) => html`
              <div class="row row-${index + 1}">
                ${row.map(
                  (key) => html`
                    <obc-button
                      class="key-button"
                      variant="normal"
                      @mousedown=${this.preventFocusLoss}
                      @click=${() => this.onKeyPress(key)}
                    >
                      ${key}
                    </obc-button>
                  `
                )}
              </div>
            `
          )}
        </div>
        <obc-button
          ?fullWidth=${true}
          class="space-button"
          @mousedown=${this.preventFocusLoss}
          @click=${this.onSpace}
        >
          SPACE
        </obc-button>
      </div>
    `;
  }

  protected override render() {
    return html`
      <div class="wrapper type-${this.type}">
        ${this.showTopBar
          ? html`
              <div class="top-bar">
                <div class="parameter-name">${this.parameterName}</div>
                <obc-icon-button variant="flat" @click=${this.onCloseClick}>
                  <obi-close-google></obi-close-google>
                </obc-icon-button>
              </div>
            `
          : nothing}

        <div class="container-content">
          <div class="input-container">
            <obc-text-input-field
              class="input-field"
              .value=${this.value}
              .placeholder=${this.placeholder}
              .size=${this.inputSize}
              @input=${this.onInputFieldValueChanged}
            >
            </obc-text-input-field>

            ${!this.showNumberRow ? this.renderCursorNavigation() : nothing}
          </div>

          <div class="container-keyboard">
            ${this.renderKeyboard()}

            <div class="container-right">
              ${this.showNumberRow ? this.renderCursorNavigation() : nothing}

              <obc-button
                class="action-button delete-button"
                @mousedown=${this.preventFocusLoss}
                @click=${this.onBackspace}
                showLeadingIcon
              >
                <obi-backspace-google slot="leading-icon"></obi-backspace-google
                >DEL
              </obc-button>

              <obc-check-button
                class="action-button caps-button"
                type="regular"
                ?checked=${this.capsLock}
                @mousedown=${this.preventFocusLoss}
                @click=${this.onToggleCaps}
                ?showIcon=${true}
              >
                <obi-shift-lock slot="icon"></obi-shift-lock>
                CAPS
              </obc-check-button>

              ${this.renderModeButton()}

              <obc-button
                class="action-button done-button"
                variant="raised"
                @mousedown=${this.preventFocusLoss}
                @click=${this.onDone}
              >
                DONE
              </obc-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-keyboard-full': ObcKeyboardFull;
  }
}
