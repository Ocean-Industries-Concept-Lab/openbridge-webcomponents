import {CSSResult, TemplateResult, css, html, nothing} from 'lit';
import {ReadoutPriority, ReadoutSize, ReadoutStacking} from './readout.js';
import {renderInstrumentReadout} from './instrument-readout.js';

/**
 * Shared center-readout cluster for radial instruments: one primary readout,
 * optionally followed by a horizontal divider and a row of further readouts
 * (the Figma "Center label" arrangements). The cluster is layout-only —
 * positioning is left to the caller, matching {@link renderInstrumentReadout}.
 *
 * Consumers: `obc-compass` / `obc-heading` (source-bound entries via
 * {@link resolveCompassCenterReadouts}), `obc-pitch-roll` and
 * `obc-compass-sector` (pre-resolved entries).
 */

/** Instrument datum a compass/heading center readout binds to. */
export enum CompassReadoutSource {
  hdg = 'hdg',
  cog = 'cog',
  rot = 'rot',
}

/**
 * One compass/heading center-readout configuration entry. The bound value,
 * label/unit defaults (HDG/DEG, COG/DEG, ROT/°/min) and priority color are
 * derived from `source`; `size` defaults to `large` for the first entry and
 * `medium` for the rest.
 */
export interface CompassCenterReadout {
  source: CompassReadoutSource;
  label?: string;
  unit?: string;
  fractionDigits?: number;
  size?: ReadoutSize;
}

/**
 * How the cluster arranges its entries.
 */
export enum CenterReadoutArrangement {
  /** First entry on top, one divider, then the remaining entries side by side. */
  primarySecondary = 'primary-secondary',
  /** Every entry stacked vertically, with a divider between each pair. */
  stacked = 'stacked',
}

/** A resolved cluster entry, ready to render (source-agnostic). */
export interface CenterReadoutEntry {
  value: number | null;
  label: string;
  unit: string;
  fractionDigits?: number;
  size?: ReadoutSize;
  priority?: ReadoutPriority;
  centerValue?: boolean;
  centerMeta?: boolean;
}

const SOURCE_DEFAULTS: Record<
  CompassReadoutSource,
  {label: string; unit: string}
> = {
  [CompassReadoutSource.hdg]: {label: 'HDG', unit: 'DEG'},
  [CompassReadoutSource.cog]: {label: 'COG', unit: 'DEG'},
  [CompassReadoutSource.rot]: {label: 'ROT', unit: '°/min'},
};

/**
 * Resolves compass/heading `centerReadouts` entries to renderable cluster
 * entries: binds values (`hdg` → heading, `cog` → course over ground,
 * `rot` → rate of turn, dash when unavailable), fills label/unit defaults and
 * derives the per-entry priority color via the instrument's per-element
 * priority model.
 */
export function resolveCompassCenterReadouts(
  readouts: CompassCenterReadout[],
  ctx: {
    heading: number;
    courseOverGround: number;
    rateOfTurnDegreesPerMinute?: number;
    priorityFor: (source: CompassReadoutSource) => ReadoutPriority;
  }
): CenterReadoutEntry[] {
  return readouts.map((readout, index) => {
    const defaults = SOURCE_DEFAULTS[readout.source];
    let value: number | null;
    switch (readout.source) {
      case CompassReadoutSource.hdg:
        value = ctx.heading;
        break;
      case CompassReadoutSource.cog:
        value = ctx.courseOverGround;
        break;
      case CompassReadoutSource.rot:
        value = ctx.rateOfTurnDegreesPerMinute ?? null;
        break;
    }
    return {
      value,
      label: readout.label ?? defaults.label,
      unit: readout.unit ?? defaults.unit,
      fractionDigits: readout.fractionDigits ?? 0,
      size:
        readout.size ?? (index === 0 ? ReadoutSize.large : ReadoutSize.medium),
      priority: ctx.priorityFor(readout.source),
    };
  });
}

function renderEntry(entry: CenterReadoutEntry): TemplateResult {
  const size = entry.size ?? ReadoutSize.large;
  return renderInstrumentReadout({
    value: entry.value ?? undefined,
    label: entry.label,
    unit: entry.unit,
    fractionDigits: entry.fractionDigits,
    priority: entry.priority,
    size,
    stacking:
      size === ReadoutSize.large
        ? ReadoutStacking.inline
        : ReadoutStacking.stacked,
    centerValue: entry.centerValue ?? false,
    centerMeta: entry.centerMeta ?? false,
  });
}

/**
 * Renders the cluster.
 *
 * `primarySecondary` (default): first entry on top; when more entries exist, a
 * stretched 1px divider followed by the remaining entries side by side.
 *
 * `stacked`: every entry on its own row, separated by a stretched 1px divider —
 * the arrangement `obc-pitch-roll-heave` uses for its Pitch / Roll / Heave
 * column.
 */
export function renderCenterReadouts(
  entries: CenterReadoutEntry[],
  arrangement: CenterReadoutArrangement = CenterReadoutArrangement.primarySecondary
): TemplateResult {
  const [first, ...rest] = entries;
  if (!first) {
    return html`${nothing}`;
  }
  if (arrangement === CenterReadoutArrangement.stacked) {
    return html`
      <div class="center-readout-group">
        ${renderEntry(first)}
        ${rest.map(
          (entry) => html`
            <div class="center-readout-divider"></div>
            ${renderEntry(entry)}
          `
        )}
      </div>
    `;
  }
  return html`
    <div class="center-readout-group">
      ${renderEntry(first)}
      ${rest.length > 0
        ? html`
            <div class="center-readout-divider"></div>
            <div class="center-readout-secondary-row">
              ${rest.map((entry) => renderEntry(entry))}
            </div>
          `
        : nothing}
    </div>
  `;
}

/** Style fragment for the cluster; append to the consumer's static styles. */
export const centerReadoutStyles: CSSResult = css`
  .center-readout-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    gap: 8px;
  }

  .center-readout-divider {
    align-self: stretch;
    height: 1px;
    background: var(--border-divider-color);
  }

  .center-readout-secondary-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
  }
`;
