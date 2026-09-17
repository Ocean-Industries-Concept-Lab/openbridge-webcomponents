import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {localized} from '@lit/localize';
import componentStyle from './alert-counter-item.css?inline';
import {customElement} from '../../decorator.js';
import '../badge/badge.js';
import {BadgeSize, BadgeType, BadgeVariant} from '../badge/badge.js';
import '../../icons/icon-alerts-shelf.js';
import type {AlertCounts} from '../../types.js';
import {alertCountsLabel, rankAlertCounts} from '../../alert-severity.js';

/**
 * `ObcAlertCounterItemType` – How each count is drawn (Figma `Type`).
 *
 * - `badges`: filled badges in the severity colour (Figma Badges counter).
 * - `alert-level`: flat badges with the severity glyph (Figma Alert level counter).
 */
export enum ObcAlertCounterItemType {
  Badges = 'badges',
  AlertLevel = 'alert-level',
}

/**
 * `<obc-alert-counter-item>` – A row of alert counts, one badge per severity.
 *
 * Renders a large `obc-badge` for every severity with a count above zero, most
 * severe first, followed by an optional shelved count. Nothing renders when
 * nothing is counted.
 *
 * ---
 *
 * ### Features
 * - **Two types:** `badges` draws filled badges in the severity colour;
 *   `alert-level` draws flat badges with the severity glyph.
 * - **Every severity:** `counts` takes the whole `AlertType` vocabulary,
 *   including the `level-*` family, ordered by `ALERT_SEVERITY_PRIORITY`.
 * - **Shelved count:** `shelvedCount` adds a neutral badge at the end, with
 *   the shelf icon in `alert-level`.
 * - **Accessible summary:** the row is announced as one image labelled with
 *   the counts, e.g. "2 Alarm, 4 Warning, 6 Caution".
 *
 * ---
 *
 * ### Usage Guidelines
 * - Show how many alerts are outstanding per severity in a compact space;
 *   `obc-alert-button-item` nests the counter for its global counter.
 * - Pass the counts as one object: `.counts=${{countAlarm: 2, countWarning: 4}}`.
 * - The counter is display-only: it renders no button and fires no events.
 * - For a framed per-subsystem summary with a label, see
 *   `obc-alert-subsystem-counter`.
 * - **TODO(designer):** the Figma component also has an Unacked counter type;
 *   how its icons map to counts is not defined yet.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-alert-counter-item
 *   .counts=${{countAlarm: 2, countWarning: 4, countCaution: 6}}
 *   shelvedCount="9"
 * ></obc-alert-counter-item>
 * ```
 *
 * @property type - How each count is drawn: `badges` (filled severity badges, default) or `alert-level` (flat badges with the severity glyph).
 * @property counts - Alert count per severity (`countAlarm`, `countWarning`, `countCaution` and the `level-*` counts); counts of zero or less are not shown.
 * @property shelvedCount - Number of shelved alerts, shown as a neutral badge after the severities; hidden at zero.
 * @experimental
 */
@customElement('obc-alert-counter-item')
@localized()
export class ObcAlertCounterItem extends LitElement {
  @property({type: String}) type: ObcAlertCounterItemType =
    ObcAlertCounterItemType.Badges;
  @property({type: Object, attribute: false}) counts: AlertCounts = {};
  @property({type: Number}) shelvedCount = 0;

  override render() {
    const ranked = rankAlertCounts(this.counts);
    if (ranked.length === 0 && this.shelvedCount <= 0) {
      return nothing;
    }
    const alertLevel = this.type === ObcAlertCounterItemType.AlertLevel;
    const variant = alertLevel ? BadgeVariant.flat : BadgeVariant.default;
    return html`
      <div
        class="row"
        role="img"
        aria-label=${alertCountsLabel(this.counts, this.shelvedCount)}
      >
        ${repeat(
          ranked,
          (entry) => entry.type,
          (entry) =>
            html`<obc-badge
              size=${BadgeSize.large}
              type=${entry.type}
              .variant=${variant}
              .showIcon=${alertLevel}
              .number=${entry.count}
            ></obc-badge>`
        )}
        ${this.shelvedCount > 0
          ? html`<obc-badge
              size=${BadgeSize.large}
              type=${BadgeType.regular}
              .variant=${variant}
              .showIcon=${alertLevel}
              .number=${this.shelvedCount}
            >
              ${alertLevel
                ? html`<obi-alerts-shelf slot="badge-icon"></obi-alerts-shelf>`
                : nothing}
            </obc-badge>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-counter-item': ObcAlertCounterItem;
  }
}
