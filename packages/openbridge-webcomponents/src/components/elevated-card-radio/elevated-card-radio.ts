import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import '../elevated-card/elevated-card.js';
import '../radio/radio.js';
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize,
  ObcElevatedCardTag,
} from '../elevated-card/elevated-card.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-elevated-card-radio>` – A single radio button presented within an elevated card container for visually distinct selection in a group.
 *
 * This component combines a radio input with an elevated card layout, making each option in a set more prominent and easier to scan. It is ideal for scenarios where radio choices need to be visually separated or require additional emphasis compared to standard radio groups.
 *
 * ---
 *
 * ### Features
 * - **Elevated Card Presentation:** Each radio option is wrapped in an elevated card, improving clarity and touch target size.
 * - **Integrated Radio Button:** Uses an underlying `<obc-radio>` for native group behavior and accessibility.
 * - **Customizable Appearance:** Supports `position` (layout), `size`, `graphicBorder`, and `border` for visual adjustments.
 * - **Label Support:** Displays a label next to the radio for clear identification.
 * - **Disabled and Required States:** Can be disabled or marked as required for form validation.
 * - **Light DOM Rendering:** Renders in the light DOM to allow native radio grouping via the `name` property.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-elevated-card-radio` when you want to present a set of mutually exclusive options with greater visual separation than standard radio buttons. This is especially useful in forms or settings panels where choices should stand out or be easily tappable.
 *
 * - Group multiple `obc-elevated-card-radio` components with the same `name` property to create a radio group.
 * - Prefer this component over plain radios when you need a more prominent or card-like selection UI.
 * - For simple, inline choices, use a standard `<obc-radio>` instead.
 * - **TODO(designer):** Confirm if there are recommended use cases or design constraints for when to use the card radio versus other selection controls.
 *
 * ---
 *
 * ### Slots
 * | Slot Name     | Renders When... | Purpose                                 |
 * |-------------- |-----------------|-----------------------------------------|
 * | leading-icon  | Always          | Contains the radio button itself.       |
 * | label         | Always          | Displays the label text for the option. |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `position`: Controls the card's layout position (default: Regular).
 * - `size`: Sets the card size (default: SingleLine).
 * - `graphicBorder`/`border`: Toggles visual borders on the card.
 * - `name`: Groups radios for mutual exclusivity (must match across group).
 * - `value`: The value submitted when this radio is selected.
 * - `label`: Text label shown next to the radio.
 * - `checked`: Whether this radio is selected.
 * - `disabled`: Disables the radio and card interaction.
 * - `required`: Marks the radio as required for form validation.
 *
 * ---
 *
 * ### Best Practices
 * - Ensure all radios in a group share the same `name` for correct selection behavior.
 * - Only one radio in a group should be `checked` at a time.
 * - Use concise, descriptive labels for each option.
 * - For accessibility, labels are linked to their radio via the `for` and `inputId` attributes.
 *
 * ---
 *
 * ### Example:
 * ```html
 * <obc-elevated-card-radio
 *   name="choices"
 *   value="option1"
 *   label="Option 1"
 *   ?checked=${true}
 * ></obc-elevated-card-radio>
 * <obc-elevated-card-radio
 *   name="choices"
 *   value="option2"
 *   label="Option 2"
 * ></obc-elevated-card-radio>
 * ```
 * In this example, two card radios form a group; only one can be selected at a time.
 *
 * @slot leading-icon - Contains the radio button input.
 * @slot label - Displays the label text for the radio option.
 * @event change - Emitted when the radio button is changed.
 */
@customElement('obc-elevated-card-radio')
export class ObcElevatedCardRadio extends LitElement {
  private static counter = 0;

  /**
   * Controls the card's layout position. Accepts values from `ObcElevatedCardPosition` enum.
   * Default is `Regular`.
   */
  @property({type: String}) position: ObcElevatedCardPosition =
    ObcElevatedCardPosition.Regular;

  /**
   * Sets the card's size. Accepts values from `ObcElevatedCardSize` enum.
   * Default is `SingleLine`.
   */
  @property({type: String}) size: ObcElevatedCardSize =
    ObcElevatedCardSize.SingleLine;

  /**
   * If true, displays a graphic border around the card for emphasis.
   * Default is false.
   */
  @property({type: Boolean}) graphicBorder = false;

  /**
   * If true, displays a standard border around the card.
   * Default is false.
   */
  @property({type: Boolean}) border = false;

  /**
   * The radio group name. Radios with the same name are grouped and only one can be selected at a time.
   */
  @property({type: String}) name = '';

  /**
   * The value submitted with the form when this radio is selected.
   */
  @property({type: String}) value = '';

  /**
   * The label text displayed next to the radio button.
   */
  @property({type: String}) label = '';

  /**
   * Whether this radio is currently selected.
   */
  @property({type: Boolean}) checked: boolean = false;

  /**
   * Disables the radio button and prevents user interaction.
   */
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * Marks the radio as required for form validation.
   */
  @property({type: Boolean}) required: boolean = false;

  private instanceId: string;

  constructor() {
    super();
    this.instanceId = `obc-elevated-card-radio-${ObcElevatedCardRadio.counter++}`;
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this; // Renders into light DOM
  }

  override render() {
    return html`
      <obc-elevated-card
        class="obc-elevated-card-radio"
        .overrideTag=${ObcElevatedCardTag.Div}
        .position=${this.position}
        .size=${ObcElevatedCardSize.SingleLine}
        ?graphicBorder=${this.graphicBorder}
        ?border=${this.border}
        @click=${this._handleCardClick}
        hasLeadingIcon
      >
        <obc-radio
          .name=${this.name}
          inputId=${this.instanceId}
          .value=${this.value}
          @change=${this._handleRadioChange}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          slot="leading-icon"
        ></obc-radio>
        <label
          class="obc-elevated-card-radio__label"
          for=${this.instanceId}
          slot="label"
          >${this.label}</label
        >
      </obc-elevated-card>
    `;
  }

  private _handleCardClick() {
    this.renderRoot.querySelector('input')?.click();
  }

  private _handleRadioChange() {
    this.dispatchEvent(new CustomEvent('change'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-elevated-card-radio': ObcElevatedCardRadio;
  }
}
