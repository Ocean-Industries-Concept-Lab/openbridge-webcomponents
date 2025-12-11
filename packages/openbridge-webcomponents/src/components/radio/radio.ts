import {LitElement, html} from 'lit';
import {live} from 'lit/directives/live.js';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import radioStyles from './radio.css?inline';

/**
 * `<obc-radio>` – A single radio button component for selecting one option from a set.
 *
 * Provides a standard radio input with optional label, supporting grouping via the native `name` attribute. Designed for use in forms or option groups where only one selection is allowed at a time. Renders in the light DOM to ensure correct browser-managed group behavior.
 *
 * ---
 *
 * ### Features
 * - **Native grouping:** Multiple `<obc-radio>` elements with the same `name` behave as a group, allowing only one to be selected at a time (leverages browser's native radio input mechanics).
 * - **Optional label:** Supports an inline label via the `label` property, or can be rendered without a label for custom layouts.
 * - **State options:** Supports `checked`, `disabled`, and `required` states for form integration.
 * - **Customizable value:** The `value` property sets the value submitted with the form when selected.
 * - **Accessible:** Associates the label with the input via `inputId` for improved accessibility.
 * - **No Shadow DOM:** Renders in the light DOM to ensure radios with the same `name` are grouped correctly by the browser.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Use `<obc-radio>` when you need users to select one option from a list. For multiple independent selections, use a checkbox component instead.
 * - To create a group, render multiple `<obc-radio>` elements with the same `name` property. Only one can be checked at a time within the group.
 * - Always provide a unique `inputId` if you use the `label` property, to ensure the label is correctly associated with the input for accessibility.
 * - If a label is not needed, omit the `label` property to render a standalone radio input.
 * - For form submission, set the `value` property to the value you want submitted when this radio is selected.
 * - The `checked` property can be controlled for programmatic selection.
 *
 * ---
 *
 * ### Best Practices and Constraints
 * - Ensure all radios in a group share the same `name` attribute for correct group behavior.
 * - Only one radio in a group should have `checked` set to true.
 * - Use the `disabled` property to prevent user interaction when needed.
 * - Use the `required` property on at least one radio in a group if the selection is mandatory.
 * - For accessibility, always associate the label with the input using `inputId`.
 * - This component does not emit custom events; use standard form events or listen to the native input's change event if needed.
 *
 * ---
 *
 * **Example:**
 * ```html
 * <obc-radio label="Option A" name="group1" value="A" inputId="radioA"></obc-radio>
 * <obc-radio label="Option B" name="group1" value="B" inputId="radioB"></obc-radio>
 * ```
 * In this example, only one radio can be selected at a time within the "group1" group.
 * @fires change - Fired when the radio is changed.
 * @slot - No named slots; content is provided via properties.
 */
@customElement('obc-radio')
export class ObcRadio extends LitElement {
  /**
   * The label text displayed next to the radio button.
   * If omitted, the radio renders without a label.
   */
  @property({type: String}) label: string | undefined;

  /**
   * The name attribute for grouping radios.
   * Radios with the same name are grouped, allowing only one to be selected at a time.
   */
  @property({type: String}) name: string | undefined;

  /**
   * The value submitted with the form when this radio is selected.
   */
  @property({type: String}) value: string | undefined;

  /**
   * Whether the radio is currently selected.
   * Only one radio in a group should be checked at a time.
   */
  @property({type: Boolean}) checked: boolean = false;

  /**
   * Disables the radio button, preventing user interaction.
   */
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * Marks the radio as required for form validation.
   * At least one radio in a group should be required if selection is mandatory.
   */
  @property({type: Boolean}) required: boolean = false;

  /**
   * The id attribute for the underlying input element.
   * Should be unique within the document and used to associate the label for accessibility.
   */
  @property({type: String}) inputId: string = '';

  private static stylesInjected = false;
  private static adoptedRoots = new Set<ShadowRoot>();

  override disconnectedCallback() {
    super.disconnectedCallback();
    const root = this.getRootNode();
    // Only remove if the root is a ShadowRoot and was adopted
    if (root instanceof ShadowRoot) {
      ObcRadio.adoptedRoots.delete(root);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.injectStyles();
  }

  private injectStyles() {
    // Always inject globally first
    this.injectGlobalStyles();

    // Then check if we're inside a shadow DOM and inject there too
    this.injectIntoShadowDOM();
  }

  private injectGlobalStyles() {
    if (ObcRadio.stylesInjected) return;

    const styleId = 'obc-radio-global-styles';
    if (document.head.querySelector(`#${styleId}`)) {
      ObcRadio.stylesInjected = true;
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = this.getCSSText();
    document.head.appendChild(style);

    ObcRadio.stylesInjected = true;
  }

  private injectIntoShadowDOM() {
    // Get the root node (which could be a shadow root or document)
    const root = this.getRootNode();

    // If we're in a shadow root, inject styles there
    if (root instanceof ShadowRoot) {
      this.adoptStylesIntoShadowRoot(root);
    } else if (root === document) {
      // We're in the main document, check if our parent is a shadow host
      let element = this.parentElement;
      while (element) {
        if (element.shadowRoot) {
          this.adoptStylesIntoShadowRoot(element.shadowRoot);
          break;
        }
        element = element.parentElement;
      }
    }
  }

  private adoptStylesIntoShadowRoot(shadowRoot: ShadowRoot) {
    if (ObcRadio.adoptedRoots.has(shadowRoot)) return;

    const style = document.createElement('style');
    style.textContent = this.getCSSText();
    shadowRoot.appendChild(style);

    ObcRadio.adoptedRoots.add(shadowRoot);
  }

  private getCSSText(): string {
    if (typeof radioStyles === 'string') {
      return radioStyles;
    } else if (
      radioStyles &&
      typeof radioStyles === 'object' &&
      'cssText' in radioStyles
    ) {
      return (radioStyles as {cssText: string}).cssText;
    }
    return String(radioStyles);
  }

  override createRenderRoot() {
    return this; // Renders into light DOM
  }

  onClick() {
    this.renderRoot.querySelector('input')?.click();
  }

  onChange(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('change'));
  }

  override render() {
    if (this.label !== undefined) {
      return html`
        <label
          for=${this.inputId}
          class="has-label obc-radio-button"
          @click=${this.onClick}
        >
          <input
            type="radio"
            .name=${this.name || ''}
            .value=${this.value || ''}
            .id=${this.inputId}
            ?checked=${live(this.checked)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            @change=${this.onChange}
          />
          <span class="label">${this.label}</span>
        </label>
      `;
    } else {
      return html`
        <input
          class="obc-radio-button"
          type="radio"
          .name=${this.name || ''}
          .value=${this.value || ''}
          .id=${this.inputId}
          ?checked=${live(this.checked)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.onChange}
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
