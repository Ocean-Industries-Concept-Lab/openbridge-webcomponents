import {html, type TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {
  ReadoutDirection,
  ReadoutStackVerticalAlignment,
  ReadoutVariant,
} from './readout.js';
import {type Priority} from '../types.js';

/**
 * Options for {@link renderInstrumentReadout}.
 *
 * Defaults mirror the `<obc-readout>` property defaults so omitted options never
 * override them with `undefined`. `centerValue`/`centerMeta` opt in to the
 * shared part-centering classes defined in `instrument-readout.css`.
 */
export interface InstrumentReadoutOptions {
  value?: number;
  label?: string;
  unit?: string;
  fractionDigits?: number;
  valuePriority?: Priority;
  variant?: ReadoutVariant;
  direction?: ReadoutDirection;
  alignment?: ReadoutStackVerticalAlignment;
  labelOnly?: boolean;
  centerValue?: boolean;
  centerMeta?: boolean;
  className?: string;
  showZeroPadding?: boolean;
  valueHasHintedZeros?: boolean;
  minValueLength?: number;
}

/**
 * Renders the `<obc-readout>` embedded at the centre of a radial navigation
 * instrument (rate-of-turn, pitch, roll, compass sector, gauge, speed, …).
 *
 * Centralises the otherwise-duplicated readout markup (`hasSetpoint=false`,
 * `hasAdvice=false`, vertical/enhanced defaults). Positioning is left to the
 * caller: pass a `className` for the absolute-position wrapper class, and
 * `centerValue`/`centerMeta` to apply the shared part-centering overrides.
 */
export function renderInstrumentReadout(
  options: InstrumentReadoutOptions
): TemplateResult {
  const {
    value,
    label = '',
    unit = '',
    fractionDigits = 0,
    valuePriority,
    variant = ReadoutVariant.enhanced,
    direction = ReadoutDirection.vertical,
    alignment = ReadoutStackVerticalAlignment.vertical,
    labelOnly = false,
    centerValue = false,
    centerMeta = false,
    className,
    showZeroPadding = false,
    valueHasHintedZeros = false,
    minValueLength = 0,
  } = options;

  const classes = classMap({
    [className ?? '']: Boolean(className),
    'instrument-readout-center-value': centerValue,
    'instrument-readout-center-meta': centerMeta,
  });

  return html`
    <obc-readout
      class=${classes}
      .variant=${variant}
      .direction=${direction}
      .alignment=${alignment}
      ?labelOnly=${labelOnly}
      .hasSetpoint=${false}
      .hasAdvice=${false}
      .value=${value}
      .fractionDigits=${fractionDigits}
      .valuePriority=${valuePriority}
      .label=${label}
      .unit=${unit}
      .showZeroPadding=${showZeroPadding}
      .valueHasHintedZeros=${valueHasHintedZeros}
      .minValueLength=${minValueLength}
    ></obc-readout>
  `;
}
