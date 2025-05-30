import {LitElement, html, unsafeCSS, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import compentStyle from './select.css?inline';
import '../../icons/icon-drop-down-google.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Select component
 *
 * @fires change - Fires when the value of the select changes
 */
@customElement('obc-select')
export class ObcSelect extends LitElement {
  @property({type: Array}) options: {
    value: string;
    label: string;
    level?: number;
  }[] = [];
  @property({type: String}) value: string | undefined;
  @property({type: Boolean}) fullWidth = false;
  @state() selectedValue = '';
  @state() selectedLabel = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateSelectedValues();
  }

  override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('value') || changedProperties.has('options')) {
      this.updateSelectedValues();
    }
  }

  private updateSelectedValues(): void {
    if (this.options.length === 0) {
      this.selectedValue = '';
      this.selectedLabel = '';
      return;
    }
    this.selectedValue = this.value || this.options[0].value;
    this.selectedLabel = this.value
      ? this.options.find((item) => item.value === this.value)?.label || ''
      : this.options[0].label;
  }

  override render() {
    return html`
      <div class=${classMap({wrapper: true, 'full-width': this.fullWidth})}>
        <div class="visible-wrapper">
          <div class="label">${this.selectedLabel}</div>
          <div class="icon">
            <obi-drop-down-google></obi-drop-down-google>
          </div>
        </div>
        <select @change=${this.changeHandler} .value=${this.selectedValue}>
          ${this.options.map((item) => {
            const indent = item.level ? (item.level - 1) * 2 : 0;
            const indentText = [];
            for (let i = 0; i < indent; i++) {
              indentText.push(html`&nbsp;`);
            }

            return html`<option value=${item.value}>
              ${indentText}${item.label}
            </option>`;
          })}
        </select>
      </div>
    `;
  }

  private changeHandler(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.selectedLabel = this.options
      .find((item) => item.value === this.selectedValue)!
      .label.trim();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.selectedValue, label: this.selectedLabel},
      })
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-select': ObcSelect;
  }
}
