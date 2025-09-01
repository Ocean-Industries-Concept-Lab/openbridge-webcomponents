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
  /** Value shown in the text field. Digits only are expected. */
  @property({type: String}) value = '';

  /** Unit suffix (e.g., %, kg). Shown visually; announced via aria-describedby. */
  @property({type: String}) unit = '';

  /** Controls whether unit is rendered. */
  @property({type: Boolean}) hasUnit = false;

  /** Text alignment / unit placement. */
  @property({type: String}) textAlign: ObcNumberInputFieldTextAlign =
    ObcNumberInputFieldTextAlign.Right;

  /** Disabled state (maps to native disabled). */
  @property({type: Boolean}) isDisabled = false;

  /** Error state; also sets aria-invalid and should be paired with helper/error text. */
  @property({type: Boolean}) hasError = false;

  /** Whether a leading icon slot is present. */
  @property({type: Boolean}) hasLeadingIcon = false;

  /** Whether helper text slot is present (used to wire aria-describedby). */
  @property({type: Boolean}) hasHelperText = false;

  /** Optional accessible name if not using an external <label for>. */
  @property({type: String, attribute: 'aria-label'}) override ariaLabel:
    | string
    | null = null;

  /** IDs that label this control. */
  @property({type: String}) labelledby: string | null = null;

  /** Extra IDs for aria-describedby, in addition to unit/helper. */
  @property({type: String}) describedby: string | null = null;

  /** Internal: unique IDs to stitch aria-describedby for unit & helper. */
  private _uid = ++obcNumberInputFieldId;
  private get _unitId() {
    return `obc-nif-unit-${this._uid}`;
  }
  private get _helperId() {
    return `obc-nif-helper-${this._uid}`;
  }

  private _focusWasProxied = false;

  private get _input(): HTMLInputElement | null {
    return this.renderRoot?.querySelector(
      'input.value-input'
    ) as HTMLInputElement | null;
  }

  /** Keep: only used immediately after proxied focus. */
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

  /** Compute aria-describedby string from external + unit + helper. */
  private _computeDescribedBy(): string | null {
    const ids: string[] = [];
    if (this.describedby) ids.push(...this.describedby.trim().split(/\s+/));
    if (this.hasUnit) ids.push(this._unitId);
    if (this.hasHelperText) ids.push(this._helperId);
    return ids.length ? ids.join(' ') : null;
  }

  /** Input focus handler: if focus was proxied, drop caret at end once. */
  private _onInputFocus = () => {
    if (this._focusWasProxied) {
      this._placeCaretEnd(this._input);
      this._focusWasProxied = false;
    }
  };

  private _onInputBlur = () => {
    // no-op
  };

  onInput(e: Event) {
    if (this.isDisabled) return; // hard gate (belt-and-suspenders)
    this.value = (e.target as HTMLInputElement).value;
  }

  /**
   * Wrapper pointer handler:
   * - Expands the hit area by focusing the input when clicking empty wrapper space.
   * - Does NOT steal clicks from interactive elements (buttons, links, inputs, etc.).
   * - Does NOT suppress native behavior when clicking directly in the input.
   */
  private onWrapperPointerDown = (e: PointerEvent) => {
    if (this.isDisabled) {
      // Block text selection on the wrapper when disabled.
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
      return; // let native behavior occur
    }

    // Clicked only the wrapper (expanded hit area): focus the input, caret to end.
    e.preventDefault();
    const inp = this._input;
    if (!inp) return;
    this._focusWasProxied = true;
    inp.focus({preventScroll: true});
    // Caret moved in _onInputFocus
  };

  /**
   * Unit pointer handler:
   * - ALWAYS proxies focus to the input (caret at end) when unit is clicked.
   * - Still respects disabled state.
   * - Unit is non-interactive; if you ever place an interactive control inside unit,
   *   prefer putting it outside and using a separate slot.
   */
  private onUnitPointerDown = (e: PointerEvent) => {
    if (this.isDisabled) {
      e.preventDefault(); // avoid selecting unit text while disabled
      return;
    }
    // Prevent selecting unit text; proxy focus to input.
    e.preventDefault();
    const inp = this._input;
    if (!inp) return;
    this._focusWasProxied = true;
    inp.focus({preventScroll: true});
    // Caret moved in _onInputFocus
  };

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
        })}
        aria-disabled=${this.isDisabled ? 'true' : 'false'}
        @pointerdown=${this.onWrapperPointerDown}
      >
        <div class="content-container">
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
        ${this.hasHelperText
          ? html`<div id=${this._helperId} class="helper-text">
              <slot name="helper-text"></slot>
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
