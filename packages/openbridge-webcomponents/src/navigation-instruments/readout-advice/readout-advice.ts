import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-advice.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification-advice.js';
import type {
  ReadoutDirection as ReadoutAdviceDirection,
  ReadoutType as ReadoutAdviceReadoutStyle,
} from '../readout/readout.js';
import {
  ReadoutInputSize as ReadoutAdviceSize,
  ReadoutInputState,
  ReadoutInputType,
  ReadoutInputVariant,
} from '../readout-input/readout-input.js';
import '../readout-input/readout-input.js';

export {ReadoutAdviceSize};

export enum ReadoutAdviceType {
  regular = 'regular',
  enhanced = 'enhanced',
  description = 'description',
  range = 'range',
  verticalStack = 'vertical-stack',
  baseline = 'baseline',
  button = 'button',
}

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
  [ReadoutAdviceState.amplified]: ReadoutInputState.enhanced,
};

const adviceTypeMap: Record<ReadoutAdviceType, ReadoutInputType> = {
  [ReadoutAdviceType.regular]: ReadoutInputType.regular,
  [ReadoutAdviceType.enhanced]: ReadoutInputType.enhanced,
  [ReadoutAdviceType.description]: ReadoutInputType.description,
  [ReadoutAdviceType.range]: ReadoutInputType.range,
  [ReadoutAdviceType.verticalStack]: ReadoutInputType.verticalStack,
  [ReadoutAdviceType.baseline]: ReadoutInputType.baseline,
  [ReadoutAdviceType.button]: ReadoutInputType.button,
};

/**
 * `<obc-readout-advice>` - A readout advice segment for displaying advisory values with an advice marker icon.
 *
 * Reuses `<obc-readout-input>` and keeps the same value rendering behavior, including fixed-width rendering, hinted zero padding, and the optional degree suffix. Use it when an advice value should be displayed as a separate segment inside a larger readout.
 *
 * ## Features
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Types: Supports `regular`, `enhanced`, `description`, `range`, `vertical-stack`, `baseline`, and `button`. The selected type defines the internal size and layout preset.
 * - Visual states: Supports `enabled`, `enhanced`, and `active`.
 * - Value rendering: Inherits `hasFixedLength`, `valueLength`, `hasHintedZeros`, and `hasDegree` behavior from `<obc-readout-input>`.
 * - Additional lines: `type="description"` can render a secondary label by using `description`, and `type="range"` can render a second numeric line by using `secondaryValue`.
 * - Advice icon: Uses `notification-advice` by default and allows overriding the icon through a slot.
 *
 * ## Usage Guidelines
 * Use this component when the value should be presented as advice rather than as an input segment. Prefer `<obc-readout-input>` for input-like segments, and use a larger readout container when the advice must be composed with label, unit, or source content.
 *
 * ## Slots
 *
 * - `icon`: Replaces the default advice marker icon.
 *
 * @slot icon - Replaces the default advice marker icon.
 */
@customElement('obc-readout-advice')
export class ObcReadoutAdvice extends LitElement {
  @property({
    type: String,
    attribute: 'readout-style',
    reflect: true,
  })
  readoutStyle?: ReadoutAdviceReadoutStyle;

  @property({
    type: String,
    attribute: 'direction',
    reflect: true,
  })
  direction?: ReadoutAdviceDirection;

  @property({type: String}) size: ReadoutAdviceSize = ReadoutAdviceSize.small;

  @property({type: String}) type?: ReadoutAdviceType;

  @property({type: String}) state: ReadoutAdviceState =
    ReadoutAdviceState.enabled;

  @property({type: Boolean}) hugContent = false;

  @property({type: Boolean}) hasFixedLength = false;

  @property({type: String}) value = '';

  @property({type: String}) secondaryValue = '';

  @property({type: String}) description = '';

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  override updated() {
    this.style.width = this.hugContent ? 'fit-content' : '100%';
  }

  override render() {
    return html`
      <div
        class=${classMap({
          'readout-advice-root': true,
          [`state-${this.state}`]: true,
        })}
      >
        <div class="readout-advice-wrapper">
          <obc-readout-input
            .readoutStyle=${this.readoutStyle}
            .direction=${this.direction}
            .variant=${ReadoutInputVariant.advice}
            .type=${this.type ? adviceTypeMap[this.type] : undefined}
            .size=${this.size}
            .state=${adviceStateMap[this.state]}
            .hugContent=${this.hugContent}
            .hasFixedLength=${this.hasFixedLength}
            .value=${this.value}
            .secondaryValue=${this.secondaryValue}
            .description=${this.description}
            .valueLength=${this.valueLength}
            .hasHintedZeros=${this.hasHintedZeros}
            .hasDegree=${this.hasDegree}
          >
            <slot name="icon" slot="icon">
              <obi-notification-advice class="icon"></obi-notification-advice>
            </slot>
          </obc-readout-input>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-advice': ObcReadoutAdvice;
  }
}
