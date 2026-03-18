import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './readout-advice.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification-advice.js';
import {
  ReadoutInputSize as ReadoutAdviceSize,
  ReadoutInputState,
  ReadoutInputVariant,
  ReadoutInputWeight as ReadoutAdviceWeight,
} from '../readout-input/readout-input.js';
import '../readout-input/readout-input.js';

export {ReadoutAdviceSize, ReadoutAdviceWeight};

export enum ReadoutAdviceState {
  enabled = 'enabled',
  enhanced = 'enhanced',
  active = 'active',
  amplified = 'amplified',
}

const adviceStateMap: Record<ReadoutAdviceState, ReadoutInputState> = {
  [ReadoutAdviceState.enabled]: ReadoutInputState.enabled,
  [ReadoutAdviceState.enhanced]: ReadoutInputState.enhanced,
  [ReadoutAdviceState.active]: ReadoutInputState.active,
  [ReadoutAdviceState.amplified]: ReadoutInputState.amplified,
};

/**
 * `<obc-readout-advice>` - A readout advice segment for displaying advisory values with an advice marker icon.
 *
 * Reuses `<obc-readout-input>` and keeps the same value rendering behavior, including fixed-width rendering, hinted zero padding, and the optional degree suffix. Use it when an advisory or guidance value should be displayed as a separate segment inside a larger readout.
 *
 * ## Features
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Visual states: Supports `enabled`, `enhanced`, `active`, and `amplified`.
 * - Value rendering: Inherits `stringWidth`, `valueLength`, `hasHintedZeros`, `weight`, and `hasDegree` behavior from `<obc-readout-input>`. When `weight` is not set, the `active` state uses `active` weight; other states use `regular`.
 * - Advice icon: Uses `notification-advice` by default and allows overriding the icon through a slot.
 *
 * ## Usage Guidelines
 * Use this component when the value should be presented as advice rather than as an input or commanded value. Prefer `<obc-readout-input>` for input-like segments, and use a larger readout container when the advice must be composed with label, unit, or source content.
 *
 * ## Slots
 *
 * - `icon`: Replaces the default advice marker icon.
 *
 * @slot icon - Replaces the default advice marker icon.
 */
@customElement('obc-readout-advice')
export class ObcReadoutAdvice extends LitElement {
  @property({type: String}) size: ReadoutAdviceSize = ReadoutAdviceSize.small;

  @property({type: String}) state: ReadoutAdviceState =
    ReadoutAdviceState.enabled;

  @property({type: Boolean}) hugContent = false;

  @property({type: String}) weight?: ReadoutAdviceWeight;

  @property({type: Boolean}) stringWidth = false;

  @property({type: String}) value = '';

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  private get resolvedWeight(): ReadoutAdviceWeight {
    if (this.weight) {
      return this.weight;
    }

    if (this.state === ReadoutAdviceState.active) {
      return ReadoutAdviceWeight.active;
    }

    return ReadoutAdviceWeight.regular;
  }

  override render() {
    return html`
      <obc-readout-input
        .variant=${ReadoutInputVariant.advice}
        .size=${this.size}
        .state=${adviceStateMap[this.state]}
        .hugContent=${this.hugContent}
        .weight=${this.resolvedWeight}
        .stringWidth=${this.stringWidth}
        .value=${this.value}
        .valueLength=${this.valueLength}
        .hasHintedZeros=${this.hasHintedZeros}
        .hasDegree=${this.hasDegree}
      >
        <slot name="icon" slot="icon">
          <obi-notification-advice class="icon"></obi-notification-advice>
        </slot>
      </obc-readout-input>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-advice': ObcReadoutAdvice;
  }
}
