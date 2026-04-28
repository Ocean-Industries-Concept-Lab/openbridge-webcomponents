import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-advice.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification-advice.js';
import type {
  ReadoutDirection as ReadoutAdviceDirection,
  ReadoutVariant as ReadoutAdviceReadoutStyle,
} from '../readout/readout.js';
import {Priority} from '../types.js';
import {
  ReadoutInputSize as ReadoutAdviceSize,
  ReadoutInputVariant,
  ReadoutInputFormat,
  ReadoutInputMode,
} from '../readout-input/readout-input.js';
import '../readout-input/readout-input.js';

export {ReadoutAdviceSize};

export enum ReadoutAdviceFormat {
  regular = 'regular',
  description = 'description',
  range = 'range',
  verticalStack = 'vertical-stack',
  baseline = 'baseline',
  button = 'button',
}

export enum ReadoutAdviceState {
  enabled = 'enabled',
  active = 'active',
  amplified = 'amplified',
}

/**
 * `<obc-readout-advice>` - A readout advice segment for displaying advisory values with an advice marker icon.
 *
 * Reuses `<obc-readout-input>` and keeps the same value rendering behavior, including fixed-width rendering, hinted zero padding, and the optional degree suffix. Use it when an advice value should be displayed as a separate segment inside a larger readout.
 *
 * ## Features
 * - Sizes: Supports `small`, `regular`, `medium`, and `large`.
 * - Formats: Supports `regular`, `description`, `range`, `vertical-stack`, `baseline`, and `button`. Format selects the structural subtype; size is controlled independently via the `size` property.
 * - State axis: Supports `enabled`, `active`, and `amplified`. State controls behavior/typography (e.g. `active` uses active value typography).
 * - Priority axis: Uses `priority` (`regular`/`enhanced`) for color emphasis. `active`/`amplified` default to `Priority.enhanced` when `priority` is not provided.
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

  @property({type: String}) format?: ReadoutAdviceFormat;

  @property({type: String}) priority?: Priority;

  @property({type: String}) state: ReadoutAdviceState =
    ReadoutAdviceState.enabled;

  @property({type: Boolean, reflect: true}) hugContent = false;

  @property({type: Boolean}) hasFixedLength = false;

  @property() value: number | string | undefined = '';

  @property({type: String}) secondaryValue = '';

  @property({type: String}) description = '';

  @property({type: String}) valueLength = '';

  @property({type: Boolean}) hasHintedZeros = false;

  @property({type: Boolean}) hasDegree = false;

  private get resolvedFormat(): ReadoutAdviceFormat {
    return this.format ?? ReadoutAdviceFormat.regular;
  }

  private get resolvedPriority(): Priority | undefined {
    if (this.state === ReadoutAdviceState.amplified) {
      return this.priority ?? Priority.enhanced;
    }
    return this.priority;
  }

  private get resolvedMode(): ReadoutInputMode {
    if (this.state === ReadoutAdviceState.active) {
      return ReadoutInputMode.input;
    }
    return ReadoutInputMode.display;
  }

  override render() {
    const valueTypographyOverride = this.getAttribute(
      'data-obc-value-typography'
    );

    return html`
      <div
        class=${classMap({
          'readout-advice-root': true,
          [`state-${this.state}`]: true,
        })}
      >
        <div class="readout-advice-wrapper">
          <obc-readout-input
            data-obc-value-typography=${valueTypographyOverride ?? nothing}
            .readoutStyle=${this.readoutStyle}
            .direction=${this.direction}
            .variant=${ReadoutInputVariant.advice}
            .format=${this.resolvedFormat as unknown as ReadoutInputFormat}
            .size=${this.size}
            .mode=${this.resolvedMode}
            .priority=${this.resolvedPriority}
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
