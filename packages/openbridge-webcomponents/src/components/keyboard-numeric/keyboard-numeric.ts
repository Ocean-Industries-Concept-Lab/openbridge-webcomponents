import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './keyboard-numeric.css?inline';

import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-backward.js';
import '../number-input-field/number-input-field.js';
import {ObcNumberInputFieldTextAlign} from '../number-input-field/number-input-field.js';
import '../button/button.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-arrow-left-google.js';

export enum ObcKeyboardNumericType {
  floating = 'floating',
  flat = 'flat',
}

@customElement('obc-keyboard-numeric')
export class ObcKeyboardNumeric extends LitElement {
  @property({type: String}) type: ObcKeyboardNumericType =
    ObcKeyboardNumericType.floating;

  @property({type: Boolean}) showTopBar = true;
  @property({type: String}) parameterName = 'Parameter name';

  @property({type: String}) value = '';
  @property({type: Boolean}) hasHelperText = false;
  @property({type: String}) helperText = '';
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasUnit = false;
  @property({type: String}) unit = '';
  @property({type: String}) inputFieldTextAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;
    
  @property({type: String}) allowedSymbols = '';

  /**
   * Optional regex pattern for validation. If not provided,
   * validation is based on allowedSymbols only.
   */
  @property({type: String}) validationPattern = '';

  @state() private showSymbolKeyboard = false;

  // Always include 0-9
  private readonly baseNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Get array of allowed symbol characters
  private get symbolsArray(): string[] {
    return this.allowedSymbols ? this.allowedSymbols.split('') : [];
  }

  // Get symbols to show in the main keyboard (max 2)
  private get mainKeyboardSymbols(): string[] {
    return this.symbolsArray.slice(0, 2);
  }

  // Get remaining symbols for the symbol keyboard
  private get additionalSymbols(): string[] {
    return this.symbolsArray.slice(2);
  }

  // Check if we need the symbols toggle button
  private get needsSymbolToggle(): boolean {
    return this.symbolsArray.length > 2;
  }

  // Validate if a character can be added to the current value
  private canAddCharacter(char: string): boolean {
    const potentialValue = this.value + char;
    
    // If we have a validation pattern, use it
    if (this.validationPattern) {
      const regex = new RegExp(this.validationPattern);
      return regex.test(potentialValue);
    }
    
    // Otherwise, use basic validation rules
    // Check if character is allowed
    if (!this.baseNumbers.includes(char) && !this.symbolsArray.includes(char)) {
      return false;
    }
    
    // Special validation for common symbols
    if (char === '.') {
      // Only one decimal point allowed
      return !this.value.includes('.');
    }
    
    if (char === '-') {
      // Minus only at beginning
      return this.value === '' || this.value === '0';
    }
    
    if (char === '+') {
      // Plus only at beginning
      return this.value === '' || this.value === '0';
    }
    
    return true;
  }

  private onCloseClick = () => {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  };

  private onKeyPress = (key: string) => {
    if (this.canAddCharacter(key)) {
      // Special handling for +/- at the beginning
      if ((key === '-' || key === '+') && (this.value === '' || this.value === '0')) {
        this.value = key;
      } else {
        this.value += key;
      }
      this.dispatchValueChange();
    }
  };

  private onBackspace = () => {
    if (this.value.length > 0) {
      this.value = this.value.slice(0, -1);
      this.dispatchValueChange();
    }
  };

  private onClear = () => {
    this.value = '';
    this.dispatchValueChange();
  };

  private onToggleSymbols = () => {
    this.showSymbolKeyboard = !this.showSymbolKeyboard;
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

  private onInputFieldValueChanged = (e: CustomEvent) => {
    const newValue = e.detail.value;
    
    // Validate the entire new value
    if (this.validationPattern) {
      const regex = new RegExp(this.validationPattern);
      if (regex.test(newValue) || newValue === '') {
        this.value = newValue;
        this.dispatchValueChange();
      }
    } else {
      // Basic validation: check each character is allowed
      const isValid = newValue.split('').every((char: string) => 
        this.baseNumbers.includes(char) || this.symbolsArray.includes(char)
      );
      
      if (isValid || newValue === '') {
        this.value = newValue;
        this.dispatchValueChange();
      }
    }
  };

  private renderNumberKeyboard() {
    const symbols = this.mainKeyboardSymbols;
    
    const bottomRowItemCount = 1 + symbols.filter(s => s).length;
    const bottomRowClass = bottomRowItemCount === 2 ? 'row-two-items' : '';
    
    return html`
      <div class="keys-container">
        <div class="row">
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('1')}
          >
            1
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('2')}
          >
            2
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('3')}
          >
            3
          </obc-button>
        </div>
        <div class="row">
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('4')}
          >
            4
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('5')}
          >
            5
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('6')}
          >
            6
          </obc-button>
        </div>
        <div class="row">
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('7')}
          >
            7
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('8')}
          >
            8
          </obc-button>
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('9')}
          >
            9
          </obc-button>
        </div>
        <div class="row ${bottomRowClass}">
          ${symbols[0] ? html`
            <obc-button
              class="key-button"
              variant="normal"
              @click=${() => this.onKeyPress(symbols[0])}
            >
              ${symbols[0]}
            </obc-button>
          ` : html`<div class="key-button-placeholder"></div>`}
          
          <obc-button
            class="key-button"
            variant="normal"
            @click=${() => this.onKeyPress('0')}
          >
            0
          </obc-button>
          
          ${symbols[1] ? html`
            <obc-button
              class="key-button"
              variant="normal"
              @click=${() => this.onKeyPress(symbols[1])}
            >
              ${symbols[1]}
            </obc-button>
          ` : html`<div class="key-button-placeholder"></div>`}
        </div>
      </div>
    `;
  }

  private renderSymbolKeyboard() {
    const symbols = this.additionalSymbols;
    const rows: string[][] = [];
    
    for (let i = 0; i < symbols.length; i += 3) {
      rows.push(symbols.slice(i, i + 3));
    }
    
    if (rows.length > 0 && rows[rows.length - 1].length < 3) {
      while (rows[rows.length - 1].length < 3) {
        rows[rows.length - 1].push('');
      }
    }
    
    return html`
      <div class="keys-container">
        ${rows.map(row => {
          const symbolCount = row.filter(s => s !== '').length;
          const rowClass = symbolCount === 2 ? 'row-two-items' : '';
          
          return html`
            <div class="row ${rowClass}">
              ${row.map(symbol => symbol ? html`
                <obc-button
                  class="key-button"
                  variant="normal"
                  @click=${() => this.onKeyPress(symbol)}
                >
                  ${symbol}
                </obc-button>
              ` : html`<div class="key-button-placeholder"></div>`)}
            </div>
          `;
        })}
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
          <obc-number-input-field
            class="input-field"
            .value=${this.value}
            .allowedChars=${[...this.baseNumbers, ...this.symbolsArray].join('')}
            .validationPattern=${this.validationPattern}
            @value-changed=${this.onInputFieldValueChanged}
            ?hasHelperText=${this.hasHelperText}
            ?hasLeadingIcon=${this.hasLeadingIcon}
            ?hasUnit=${this.hasUnit}
            .unit=${this.unit}
            .textAlign=${this.inputFieldTextAlign}
          >
            <div slot="helper-text">${this.helperText}</div>
          </obc-number-input-field>

          <div class="container-keyboard">
            ${this.showSymbolKeyboard 
              ? this.renderSymbolKeyboard()
              : this.renderNumberKeyboard()
            }

            <div class="action-container">
              <obc-button
                class="action-button"
                @click=${this.onBackspace}
              >
                <obi-backspace-google></obi-backspace-google>DEL
              </obc-button>
              <obc-button class="action-button clear" @click=${this.onClear}>
                CLEAR
              </obc-button>
              ${this.needsSymbolToggle ? html`
                <obc-button
                  class="action-button symbols"
                  variant=${this.showSymbolKeyboard ? 'raised' : 'normal'}
                  @click=${this.onToggleSymbols}
                >
                  ${this.showSymbolKeyboard ? '123' : '#+='}
                </obc-button>
              ` : html`<div class="action-button-spacer"></div>`}
              <obc-button
                class="action-button done"
                variant="raised"
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
    'obc-keyboard-numeric': ObcKeyboardNumeric;
  }
}