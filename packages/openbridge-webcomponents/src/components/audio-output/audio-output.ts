import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './audio-output.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-audio-output>` – A visual indicator component for representing audio volume levels.
 *
 * Displays a horizontal row of bars to visually communicate the current audio volume, similar to classic audio level meters or equalizer displays. The number of highlighted bars corresponds to the set volume level, providing immediate feedback about audio intensity or mute state.
 *
 * ### Features
 * - **Volume display:** Shows up to 8 discrete volume levels using a series of bars (0–8).
 * - **Active/inactive states:** Bars are visually highlighted up to the current volume; inactive bars remain dim.
 * - **Disabled mode:** When `disabled` is true, the entire component appears muted/greyed out to indicate non-interactive or muted status.
 * - **Responsive layout:** The bar arrangement adapts to the container's width.
 *
 * ### Usage Guidelines
 * Use `obc-audio-output` to provide users with a quick, at-a-glance indication of current audio output or input levels. This is ideal for settings panels, audio controls, or anywhere a visual representation of volume is needed.
 * **TODO(designer):** Confirm if this component is intended for both input (microphone) and output (speaker) volume, or only for output.
 * Avoid using this component for continuous/analog audio metering (such as real-time waveform or dB meters); it is designed for discrete, stepped volume feedback.
 *
 * ### Properties and Configuration
 * - `volume` (number, 0–8): Sets the number of active bars. Defaults to 0 (all bars inactive).
 * - `disabled` (boolean): When true, the component is visually muted and should not respond to user interaction.
 *
 * ### Best Practices and Constraints
 * - The component is purely visual and does not provide interactive controls; pair it with buttons or sliders for volume adjustment if needed.
 * - For accessibility, ensure that volume state is also conveyed via ARIA attributes or alternative text if used in interactive contexts.
 * **TODO(designer):** Should the component include ARIA labeling or support for screen readers?
 *
 * ### Example:
 * ```html
 * <obc-audio-output volume="4"></obc-audio-output>
 * ```
 * In this example, four bars are highlighted to indicate a medium volume level.
 *
 * /**
 * @slot - (none) – This component does not use slots; all content is rendered internally.
 */
@customElement('obc-audio-output')
export class ObcAudioOutput extends LitElement {
  /**
   * The volume level to display, represented as the number of highlighted bars (0–8).
   * Set to 0 for muted/no volume, up to 8 for maximum volume.
   *
   * @default 0
   */
  @property({type: Number}) volume: number = 0;

  /**
   * If true, the component is visually muted and indicates a disabled or non-interactive state.
   * Use to represent muted audio or when volume control is unavailable.
   *
   * @default false
   */
  @property({type: Boolean}) disabled: boolean = false;

  override render() {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(
        html`<div class="item ${i < this.volume ? 'active' : ''}"></div>`
      );
    }
    return html`
      <div
        class=${classMap({
          wrapper: true,
          disabled: this.disabled,
        })}
      >
        ${items}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-audio-output': ObcAudioOutput;
  }
}
