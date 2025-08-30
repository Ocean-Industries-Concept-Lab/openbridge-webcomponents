import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './keyboard-numeric.css?inline';

import '../icon-button/icon-button.js';
import '../../icons/icon-close-google.js';
import '../../icons/icon-backward.js';

@customElement('obc-keyboard-numeric')
export class ObcKeyboardNumeric extends LitElement {
  @property({type: String}) parameterName = 'Parameter name';
  @property({type: Boolean}) showTopBar = true;
  @property({type: String}) value = '';
  @property({type: String}) placeholder = '';

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
    }
  };

  private onClear = () => {
    this.value = '';
    this.dispatchValueChange();
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

  protected override render() {
    const displayValue = this.value || this.placeholder;

    return html`
      <div class="wrapper">
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
          <div class="input-field">
            <div class="input-field-container">
              <div class="value-display ${classMap({empty: !this.value})}">
                ${displayValue}
              </div>
            </div>
          </div>

          <div class="container-keyboard">
            <div class="keys-container">
              <div class="row">
                <button class="key-button" @click=${() => this.onKeyPress('1')}>
                  1
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('2')}>
                  2
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('3')}>
                  3
                </button>
              </div>
              <div class="row">
                <button class="key-button" @click=${() => this.onKeyPress('4')}>
                  4
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('5')}>
                  5
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('6')}>
                  6
                </button>
              </div>
              <div class="row">
                <button class="key-button" @click=${() => this.onKeyPress('7')}>
                  7
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('8')}>
                  8
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('9')}>
                  9
                </button>
              </div>
              <div class="row">
                <button class="key-button" @click=${() => this.onKeyPress('-')}>
                  -
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('0')}>
                  0
                </button>
                <button class="key-button" @click=${() => this.onKeyPress('.')}>
                  .
                </button>
              </div>
            </div>

            <div class="action-container">
              <button
                class="action-button backspace"
                @click=${this.onBackspace}
              >
                <obi-backward></obi-backward>
              </button>
              <button class="action-button clear" @click=${this.onClear}>
                CLEAR
              </button>
              <button class="action-button symbols" @click=${this.onSymbols}>
                #+=
              </button>
              <button class="action-button done" @click=${this.onDone}>
                DONE
              </button>
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
