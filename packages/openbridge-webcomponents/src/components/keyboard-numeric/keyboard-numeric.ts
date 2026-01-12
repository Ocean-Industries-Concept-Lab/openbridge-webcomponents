import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './keyboard-numeric.css?inline';

import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-backspace-google.js';
import '../button/button.js';
import '../../icons/icon-up-iec.js';
import '../../icons/icon-down-iec.js';
import '../../icons/icon-multiply.js';
import '../../icons/icon-divide.js';
import '../../icons/icon-equal.js';
import '../number-input-field/number-input-field.js';
import {
  ObcNumberInputField,
  ObcNumberInputFieldTextAlign,
  ObcNumberInputFieldSize,
} from '../number-input-field/number-input-field.js';

export enum ObcKeyboardNumericType {
  Floating = 'floating',
  Flat = 'flat',
}

export enum ObcKeyboardNumericContent {
  Numbers = 'numbers',
  Symbols = 'symbols',
}

// Key layouts
const NUMBER_KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['–', '0', ','],
];

const SYMBOL_KEYS = [
  ['!', '@', '#'],
  ['$', '%', '&'],
  ['(', ')', '/'],
  ['–', '0', ','],
];

// All allowed characters for validation
const ALLOWED_CHARS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '–',
  '-',
  ',',
  '.',
  '+',
  '×',
  '÷',
  '=',
  '!',
  '@',
  '#',
  '$',
  '%',
  '&',
  '(',
  ')',
  '/',
];

const OPERATORS = ['+', '-', '–', '×', '÷', '*', '/'];

@customElement('obc-keyboard-numeric')
export class ObcKeyboardNumeric extends LitElement {
  @property({type: String}) type: ObcKeyboardNumericType =
    ObcKeyboardNumericType.Floating;

  /** Shows the top bar with label and close button (only applicable for floating type) */
  @property({type: Boolean}) hasTitleBar = false;

  /** Label displayed in the top bar */
  @property({type: String}) label = 'Parameter name';

  /** Current input value */
  @property({type: String}) value = '';

  /** Shows the calculation row with +, -, ×, ÷, = buttons */
  @property({type: Boolean}) hasCalculation = false;

  /** Shows the #+= / 123 toggle button to switch between numbers and symbols */
  @property({type: Boolean}) has2Symbols = false;

  /** Helper text content displayed below the input field */
  @property({type: String}) helperText = '';

  /** Shows a leading icon slot in the input field */
  @property({type: Boolean}) hasLeadingIcon = false;

  /** Unit text (%, kg, °C, etc.) */
  @property({type: String}) unit = '';

  /** Text alignment in input field */
  @property({type: String}) inputFieldTextAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;

  /** Optional regex pattern for validation (applies to both keyboard and direct input) */
  @property({type: String}) validationPattern = '';

  @state() private content: ObcKeyboardNumericContent =
    ObcKeyboardNumericContent.Numbers;

  /** Validates if a character can be added to the current value */
  private canAddCharacter(char: string): boolean {
    const potentialValue = this.value + char;

    if (this.validationPattern) {
      const regex = new RegExp(this.validationPattern);
      return regex.test(potentialValue);
    }

    if (!ALLOWED_CHARS.includes(char)) {
      return false;
    }

    const lastChar = this.value.slice(-1);

    // Only one decimal separator per number segment
    if (char === ',' || char === '.') {
      const segments = this.value.split(/[+\-–×÷*/]/);
      const currentSegment = segments[segments.length - 1] || '';
      return !currentSegment.includes(',') && !currentSegment.includes('.');
    }

    // Minus/plus allowed at beginning or after an operator
    if (char === '–' || char === '-' || char === '+') {
      return (
        this.value === '' || this.value === '0' || OPERATORS.includes(lastChar)
      );
    }

    return true;
  }

  /** Validates that all characters in a value are allowed */
  private isValidValue(value: string): boolean {
    return [...value].every((char) => ALLOWED_CHARS.includes(char));
  }

  private handleCloseClick() {
    this.dispatchEvent(
      new CustomEvent('close-click', {bubbles: true, composed: true})
    );
  }

  private handleKeyPress(key: string) {
    if (this.canAddCharacter(key)) {
      if (
        (key === '–' || key === '-' || key === '+') &&
        (this.value === '' || this.value === '0')
      ) {
        this.value = key;
      } else {
        this.value += key;
      }
      this.dispatchValueChange();
    }
  }

  private handleCalculationKey(key: string) {
    if (key === '=') {
      this.evaluateExpression();
    } else {
      this.value += key;
      this.dispatchValueChange();
    }
  }

  private evaluateExpression() {
    if (!this.value) return;

    try {
      const expression = this.value
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/–/g, '-')
        .replace(/,/g, '.');

      if (!/^[\d+\-*/().]+$/.test(expression)) {
        return;
      }

      const result = new Function(`return (${expression})`)();

      if (typeof result === 'number' && isFinite(result)) {
        const rounded = Math.round(result * 1000000) / 1000000;
        this.value = String(rounded).replace('.', ',');
        this.dispatchValueChange();
      }
    } catch {
      // If evaluation fails, keep the current value
    }
  }

  private handleBackspace() {
    if (this.value.length > 0) {
      this.value = this.value.slice(0, -1);
      this.dispatchValueChange();
    }
  }

  private handleClear() {
    this.value = '';
    this.dispatchValueChange();
  }

  private handleToggleContent() {
    this.content =
      this.content === ObcKeyboardNumericContent.Numbers
        ? ObcKeyboardNumericContent.Symbols
        : ObcKeyboardNumericContent.Numbers;
  }

  private handleDone() {
    this.evaluateExpression();
    this.dispatchEvent(
      new CustomEvent('done-click', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchValueChange() {
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInputChange(e: Event) {
    const input = e.target as ObcNumberInputField;
    const newValue = input.value;

    if (this.validationPattern && newValue) {
      const regex = new RegExp(this.validationPattern);
      if (!regex.test(newValue)) {
        input.value = this.value;
        return;
      }
    }

    if (newValue && !this.isValidValue(newValue)) {
      input.value = this.value;
      return;
    }

    this.value = newValue;
    this.dispatchValueChange();
  }

  private handleInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleDone();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.handleCloseClick();
    }
  }

  private renderCalculationRow() {
    if (!this.hasCalculation) return nothing;

    return html`
      <div class="calculation-container">
        <obc-icon-button
          class="calculation-button"
          @click=${() => this.handleCalculationKey('+')}
        >
          <obi-up-iec></obi-up-iec>
        </obc-icon-button>
        <obc-icon-button
          class="calculation-button"
          @click=${() => this.handleCalculationKey('-')}
        >
          <obi-down-iec></obi-down-iec>
        </obc-icon-button>
        <obc-icon-button
          class="calculation-button"
          @click=${() => this.handleCalculationKey('×')}
        >
          <obi-multiply></obi-multiply>
        </obc-icon-button>
        <obc-icon-button
          class="calculation-button"
          @click=${() => this.handleCalculationKey('÷')}
        >
          <obi-divide></obi-divide>
        </obc-icon-button>
        <obc-icon-button
          class="calculation-button"
          @click=${() => this.handleCalculationKey('=')}
        >
          <obi-equal></obi-equal>
        </obc-icon-button>
      </div>
    `;
  }

  private renderKeyboard() {
    const keys =
      this.content === ObcKeyboardNumericContent.Numbers
        ? NUMBER_KEYS
        : SYMBOL_KEYS;

    return html`
      <div class="keys-container">
        ${keys.map(
          (row) => html`
            <div class="row">
              ${row.map(
                (key) => html`
                  <obc-button
                    class="key-button"
                    variant="normal"
                    @click=${() => this.handleKeyPress(key)}
                  >
                    ${key}
                  </obc-button>
                `
              )}
            </div>
          `
        )}
      </div>
    `;
  }

  private renderInputField() {
    return html`
      <obc-number-input-field
        class="input-field"
        .value=${this.value}
        .unit=${this.unit}
        .textAlign=${this.inputFieldTextAlign}
        .size=${ObcNumberInputFieldSize.Large}
        .helperText=${this.helperText}
        ?hasLeadingIcon=${this.hasLeadingIcon}
        placeholder="00.0"
        @input=${this.handleInputChange}
        @keydown=${this.handleInputKeydown}
      >
        <slot name="leading-icon" slot="leading-icon"></slot>
      </obc-number-input-field>
    `;
  }

  protected override render() {
    const showTitleBar =
      this.hasTitleBar && this.type === ObcKeyboardNumericType.Floating;

    return html`
      <div class="wrapper type-${this.type}">
        ${showTitleBar
          ? html`
              <div class="top-bar">
                <div class="parameter-name">${this.label}</div>
                <obc-icon-button variant="flat" @click=${this.handleCloseClick}>
                  <obi-close-google></obi-close-google>
                </obc-icon-button>
              </div>
            `
          : nothing}

        <div class="container-content">
          ${this.renderInputField()}

          <div class="key-container">
            ${this.renderCalculationRow()}

            <div class="input-container">
              ${this.renderKeyboard()}

              <div class="action-container">
                <div class="function-buttons-container">
                  <obc-button
                    class="action-button"
                    @click=${this.handleBackspace}
                    showLeadingIcon
                  >
                    <obi-backspace-google
                      slot="leading-icon"
                    ></obi-backspace-google
                    >DEL
                  </obc-button>
                  <obc-button
                    class="action-button clear"
                    @click=${this.handleClear}
                  >
                    CLEAR
                  </obc-button>
                  ${this.has2Symbols
                    ? html`
                        <obc-button
                          class="action-button symbols"
                          variant="normal"
                          @click=${this.handleToggleContent}
                        >
                          ${this.content === ObcKeyboardNumericContent.Numbers
                            ? '#+='
                            : '123'}
                        </obc-button>
                      `
                    : nothing}
                </div>
                <obc-button
                  class="action-button done"
                  variant="raised"
                  @click=${this.handleDone}
                >
                  DONE
                </obc-button>
              </div>
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
    'obc-keyboard-numeric': ObcKeyboardNumeric;
  }
}
