import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './number-input-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcNumberInputFieldTextAlign {
  Center = 'center',
  Right = 'right',
  RightUnitOutside = 'right-unit-outside',
}

let obcNumberInputFieldId = 0;

@customElement('obc-number-input-field')
export class ObcNumberInputField extends LitElement {
  @property({type: String}) value = '';

  @property({type: String}) unit = '';
  @property({type: Boolean}) hasUnit = false;

  @property({type: String}) textAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;

  @property({type: Boolean}) isDisabled = false;
  @property({type: Boolean}) hasError = false;

  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasHelperText = false;
  @property({type: String}) helperText = '';

  @property({type: Boolean}) hasTitle = false;
  @property({type: String}) override title = '';
  @property({type: Boolean}) isRequired = false;

  @property({type: String, attribute: 'aria-label'}) override ariaLabel:
    | string
    | null = null;
  @property({type: String}) labelledby: string | null = null;
  @property({type: String}) describedby: string | null = null;

  @property({type: String}) allowedChars = '';
  @property({type: String}) validationPattern = '';
  @property({type: Object}) inputFilter?: (value: string, oldValue: string) => string;

  private _uid = ++obcNumberInputFieldId;
  private get _unitId() {
    return `obc-nif-unit-${this._uid}`;
  }
  private get _helperId() {
    return `obc-nif-helper-${this._uid}`;
  }

  private _focusWasProxied = false;
  private _measureSpan: HTMLSpanElement | null = null;

  private get _input(): HTMLInputElement | null {
    return this.renderRoot?.querySelector(
      'input.value-input'
    ) as HTMLInputElement | null;
  }

  private _placeCaretEnd(inp: HTMLInputElement | null) {
    if (!inp) return;
    const len = inp.value.length;
    requestAnimationFrame(() => {
      try {
        inp.setSelectionRange(len, len);
      } catch {
          // Silently ignore if setSelectionRange fails (e.g., on non-text inputs) 
        }
    });
  }

  private _computeDescribedBy(): string | null {
    const ids: string[] = [];
    if (this.describedby) ids.push(...this.describedby.trim().split(/\s+/));
    if (this.hasUnit) ids.push(this._unitId);
    if (this.hasHelperText) ids.push(this._helperId);
    return ids.length ? ids.join(' ') : null;
  }

  private _onInputFocus = () => {
    if (this._focusWasProxied) {
      this._placeCaretEnd(this._input);
      this._focusWasProxied = false;
    }
  };

  private _onInputBlur = () => {
  };

  private filterInput(newValue: string, oldValue: string): string {
    if (this.inputFilter) {
      return this.inputFilter(newValue, oldValue);
    }
    
    if (this.allowedChars) {
      let filtered = '';
      for (const char of newValue) {
        if (this.allowedChars.includes(char)) {
          const testValue = filtered + char;
          if (this.validationPattern) {
            const regex = new RegExp(this.validationPattern);
            if (regex.test(testValue)) {
              filtered = testValue;
            }
          } else {
            filtered = testValue;
          }
        }
      }
      return filtered;
    }
    
    if (this.validationPattern) {
      const regex = new RegExp(this.validationPattern);
      return regex.test(newValue) ? newValue : oldValue;
    }
    
    return newValue;
  }

  onInput(e: Event) {
    if (this.isDisabled) return;
    
    const input = e.target as HTMLInputElement;
    const oldValue = this.value;
    const rawValue = input.value;
    
    const filteredValue = this.filterInput(rawValue, oldValue);
    
    if (filteredValue !== rawValue) {
      input.value = filteredValue;
    }
    
    this.value = filteredValue;
    
    if (this.textAlign === ObcNumberInputFieldTextAlign.Center) {
      this._adjustInputWidth();
    }
    
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: {
        value: this.value,
        oldValue: oldValue
      },
      bubbles: true,
      composed: true
    }));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._measureSpan) {
      this._measureSpan.remove();
      this._measureSpan = null;
    }
  }

  private _createMeasureSpan() {
    if (!this._measureSpan) {
      this._measureSpan = document.createElement('span');
      this._measureSpan.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: pre;
        pointer-events: none;
        top: -9999px;
        left: -9999px;
      `;
      this.renderRoot.appendChild(this._measureSpan);
    }
  }

  private _adjustInputWidth() {
    const input = this._input;
    if (!input) return;

    this._createMeasureSpan();
    if (!this._measureSpan) return;

    const styles = window.getComputedStyle(input);
    this._measureSpan.style.font = styles.font;
    this._measureSpan.style.fontSize = styles.fontSize;
    this._measureSpan.style.fontFamily = styles.fontFamily;
    this._measureSpan.style.fontWeight = styles.fontWeight;
    this._measureSpan.style.letterSpacing = styles.letterSpacing;
    this._measureSpan.style.textTransform = styles.textTransform;

    const textToMeasure = input.value || input.placeholder || '0';
    this._measureSpan.textContent = textToMeasure;

    const measuredWidth = this._measureSpan.offsetWidth;
    const extraSpace = 20;
    const minWidth = 40;
    
    const finalWidth = Math.max(measuredWidth + extraSpace, minWidth);
    input.style.width = `${finalWidth}px`;
  }

  private onWrapperPointerDown = (e: PointerEvent) => {
    if (this.isDisabled) {
      e.preventDefault();
      return;
    }

    const path = e.composedPath();

    const clickedInput = path.some((el) => el instanceof HTMLInputElement);

    const clickedInteractive = path.some(
      (el) =>
        el instanceof Element &&
        el.closest?.(
          'button,a,[role="button"],input,select,textarea,[contenteditable="true"]'
        )
    );

    if (clickedInput || clickedInteractive) {
      return;
    }

    e.preventDefault();
    const inp = this._input;
    if (!inp) return;
    this._focusWasProxied = true;
    inp.focus({preventScroll: true});
  };

  private onUnitPointerDown = (e: PointerEvent) => {
    if (this.isDisabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const inp = this._input;
    if (!inp) return;
    this._focusWasProxied = true;
    inp.focus({preventScroll: true});
  };

  override firstUpdated() {
    if (this.textAlign === ObcNumberInputFieldTextAlign.Center) {
      this._adjustInputWidth();
    }
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('value') || changedProperties.has('textAlign')) {
      if (this.textAlign === ObcNumberInputFieldTextAlign.Center) {
        requestAnimationFrame(() => {
          this._adjustInputWidth();
        });
      } else if (changedProperties.has('textAlign')) {
        const input = this._input;
        if (input) {
          input.style.width = '100%';
        }
      }
    }
  }

  override render() {
    const describedBy = this._computeDescribedBy();

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`align-${this.textAlign}`]: true,
          error: this.hasError,
          disabled: this.isDisabled,
          helpertext: this.hasHelperText,
          title: this.hasTitle,
        })}
        aria-disabled=${this.isDisabled ? 'true' : 'false'}
        @pointerdown=${this.onWrapperPointerDown}
      >
        ${this.hasTitle
          ? html`<div class="title-text-container"><label class="title">
              ${this.title}
              </label>
              ${this.isRequired ? html`<div class="required-indicator"></div>` : nothing}
            </div>`
          : nothing}
        <div class="horizontal-container">
          <div class="content-container" part="content-container">
            <div class="input-field-container">
              ${this.hasLeadingIcon
                ? html`<div class="leading-icon">
                    <slot name="leading-icon"></slot>
                  </div>`
                : nothing}
              <div class="label-container">
                <div class="value-container">
                  <input
                    type="text"
                    inputmode="decimal"
                    class="value-input"
                    .value=${this.value}
                    ?disabled=${this.isDisabled}
                    aria-invalid=${this.hasError ? 'true' : 'false'}
                    aria-label=${this.ariaLabel ?? nothing}
                    aria-labelledby=${this.labelledby ?? nothing}
                    aria-describedby=${describedBy ?? nothing}
                    autocomplete="off"
                    .enterKeyHint=${'done'}
                    @input=${this.onInput}
                    @focusin=${this._onInputFocus}
                    @blur=${this._onInputBlur}
                  />
                </div>

                ${this.hasUnit &&
                this.textAlign !== ObcNumberInputFieldTextAlign.RightUnitOutside
                  ? html`<div
                      class="unit-container"
                      @pointerdown=${this.onUnitPointerDown}
                    >
                      <div id=${this._unitId} class="unit-text">${this.unit}</div>
                    </div>`
                  : nothing}
              </div>
            </div>
          </div>

          ${this.hasUnit &&
          this.textAlign === ObcNumberInputFieldTextAlign.RightUnitOutside
            ? html`<div
                class="unit-container external"
                @pointerdown=${this.onUnitPointerDown}
              >
                <div id=${this._unitId} class="unit-text">${this.unit}</div>
              </div>`
            : nothing}
        </div>
        ${this.hasHelperText
          ? html`<div id=${this._helperId} class="helper-text">
              ${this.helperText}
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-number-input-field': ObcNumberInputField;
  }
}