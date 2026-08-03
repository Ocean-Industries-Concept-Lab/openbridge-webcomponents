import {html, type TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import './readout.js';
import {
  ReadoutAlignment,
  ReadoutDirection,
  ReadoutPriority,
  ReadoutSize,
  ReadoutStacking,
} from './readout.js';

/**
 * Options for {@link renderInstrumentReadout}.
 *
 * Defaults mirror the `<obc-readout>` property defaults so omitted options never
 * override them with `undefined` (except `size`, which defaults to `large` —
 * the instrument-embedded readout is the primary reading of its instrument).
 * `centerValue`/`centerMeta` opt in to the shared part-centering classes
 * defined in `instrument-readout.css`.
 */
export interface InstrumentReadoutOptions {
  value?: number;
  label?: string;
  unit?: string;
  fractionDigits?: number;
  priority?: ReadoutPriority;
  size?: ReadoutSize;
  direction?: ReadoutDirection;
  stacking?: ReadoutStacking;
  alignment?: ReadoutAlignment;
  /** Render only the label/unit meta zone when false (no value). */
  hasValue?: boolean;
  centerValue?: boolean;
  centerMeta?: boolean;
  className?: string;
  hintedZeros?: boolean;
  maxDigits?: number;
}

/**
 * Renders the `<obc-readout>` embedded at the centre of a radial navigation
 * instrument (rate-of-turn, pitch, roll, compass sector, gauge, speed, …).
 *
 * Centralises the otherwise-duplicated readout markup (`hasSetpoint=false`,
 * `hasAdvice=false`, vertical/large defaults). Positioning is left to the
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
    priority,
    size = ReadoutSize.large,
    direction = ReadoutDirection.vertical,
    stacking = ReadoutStacking.inline,
    alignment = ReadoutAlignment.vertical,
    hasValue = true,
    centerValue = false,
    centerMeta = false,
    className,
    hintedZeros = false,
    maxDigits = 0,
  } = options;

  const classes = classMap({
    [className ?? '']: Boolean(className),
    'instrument-readout-center-value': centerValue,
    'instrument-readout-center-meta': centerMeta,
  });

  return html`
    <obc-readout
      class=${classes}
      .size=${size}
      .priority=${priority}
      .direction=${direction}
      .stacking=${stacking}
      .alignment=${alignment}
      .hasValue=${hasValue}
      .hasSetpoint=${false}
      .hasAdvice=${false}
      .value=${value ?? null}
      .fractionDigits=${fractionDigits}
      .label=${label}
      .unit=${unit}
      .valueOptions=${hintedZeros ? {hintedZeros} : undefined}
      .maxDigits=${maxDigits}
    ></obc-readout>
  `;
}
