import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
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

  private onCloseClick = () => {
    this.dispatchEvent(
      new CustomEvent('close-click', {
        bubbles: true,
        composed: true,
      })
    );
  };

  private onKeyPress = (key: string) => {
    if (key >= '0' && key <= '9') {
      this.value += key;
      this.dispatchValueChange();
    } else if (key === '.') {
      if (!this.value.includes('.')) {
        this.value += key;
        this.dispatchValueChange();
      }
    } else if (key === '-') {
      if (this.value === '' || this.value === '0') {
        this.value = '-';
        this.dispatchValueChange();
      }
    }
  };

  private onBackspace = () => {
    if (this.value.length > 0) {
      this.value = this.value.slice(0, -1);
      this.dispatchValueChange();
      this.requestUpdate();  // Force Lit to re-render
    }
  };

  private onClear = () => {
    this.value = '';
    this.dispatchValueChange();
    this.requestUpdate();  // Force Lit to re-render
  };

  private onSymbols = () => {
    // Toggle symbols - for now just add common symbols
    this.dispatchEvent(
      new CustomEvent('symbols-click', {
        bubbles: true,
        composed: true,
      })
    );
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
    this.value = e.detail.value;
    this.dispatchValueChange();
  };

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
            ?hasHelperText=${this.hasHelperText}
            @value-changed=${this.onInputFieldValueChanged}
            ?hasLeadingIcon=${this.hasLeadingIcon}
            ?hasUnit=${this.hasUnit}
            .unit=${this.unit}
            textAlign=${this.inputFieldTextAlign}
          >
            <div slot="helper-text">${this.helperText}</div>
          </obc-number-input-field>

          <div class="container-keyboard">
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
              <div class="row">
                <obc-button
                  class="key-button"
                  variant="normal"
                  @click=${() => this.onKeyPress('-')}
                >
                  -
                </obc-button>
                <obc-button
                  class="key-button"
                  variant="normal"
                  @click=${() => this.onKeyPress('0')}
                >
                  0
                </obc-button>
                <obc-button
                  class="key-button"
                  variant="normal"
                  @click=${() => this.onKeyPress('.')}
                >
                  .
                </obc-button>
              </div>
            </div>

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
              <obc-button
                class="action-button symbols"
                @click=${this.onSymbols}
              >
                #+=
              </obc-button>
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
