import {LitElement, html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement, property} from 'lit/decorators.js';

/**
 * Radio button component
 *
 * NOTE: This component does not use shadow DOM.
 * This is because shadow DOM isolates the input from other radio buttons,
 * which prevents the browser from managing the radio button group.
 */
@customElement('obc-radio')
export class ObcRadio extends LitElement {
  @property({type: String}) label: string | undefined;
  @property({type: String}) name: string | undefined;
  @property({type: String}) value: string | undefined;
  @property({type: Boolean}) checked: boolean = false;
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: Boolean}) required: boolean = false;

  override createRenderRoot() {
    return this; // Renders into light DOM
  }

  onClick() {
    this.renderRoot.querySelector('input')?.click();
  }

  override render() {
    if (this.label !== undefined) {
      return html`
        <label
          for=${ifDefined(this.value)}
          class="has-label obc-radio-button"
          @click=${this.onClick}
        >
          <input
            type="radio"
            .name=${ifDefined(this.name)}
            .value=${ifDefined(this.value)}
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            ?required=${this.required}
          />
          <span class="label">${this.label}</span>
        </label>
      `;
    } else {
      return html`
        <input
          class="obc-radio-button"
          type="radio"
          .name=${ifDefined(this.name)}
          .value=${ifDefined(this.value)}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
        />
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-radio': ObcRadio;
  }
}
