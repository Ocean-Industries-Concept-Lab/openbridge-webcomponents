/**
 * `alert-standard` – What an alert standard tells the experimental alert
 * components.
 *
 * A standard is a tree: each criticality lists the states it can be in, and
 * each state says how it is drawn, where it sorts, which filters list it and
 * which actions it offers. The components know nothing else about an alert,
 * so a standard without acknowledgement, shelving or categories is as valid
 * as one with them.
 *
 * Usage:
 * ```ts
 * const myStandard = defineAlertStandard({
 *   id: 'my-standard',
 *   filters: {},
 *   actions: {},
 *   criticalities: {
 *     fault: {
 *       states: {
 *         present: {glyph: {frame: html`<my-fault-icon></my-fault-icon>`}, sortingRank: 10},
 *       },
 *     },
 *   },
 * });
 * registerAlertStandard(myStandard);
 * ```
 */
import type {HTMLTemplateResult, SVGTemplateResult, TemplateResult} from 'lit';
import type {ResolvedFlashingSpeed} from '../types.js';

/** `frame` draws the alert; `flashFrame` cross-fades with it while the alert flashes. */
export interface AlertGlyph {
  frame: TemplateResult | SVGTemplateResult;
  flashFrame?: TemplateResult | SVGTemplateResult;
}

export interface AlertStateDefinition<
  FilterId extends string = string,
  ActionId extends string = string,
> {
  glyph: AlertGlyph;
  /** Lower sorts first. Ranks of different standards are compared as they are. */
  sortingRank: number;
  /** Steady when left out, and when the glyph has no `flashFrame`. */
  flashingSpeed?: ResolvedFlashingSpeed;
  includedInFilters?: readonly FilterId[];
  offeredActions?: readonly ActionId[];
  glyphShownInsteadOfActions?: HTMLTemplateResult;
}

export interface AlertCriticalityDefinition<
  FilterId extends string = string,
  ActionId extends string = string,
> {
  states: Record<string, AlertStateDefinition<FilterId, ActionId>>;
}

export interface AlertFilterDefinition {
  label: () => string;
  titleWhenNoAlertIsIncluded: () => string;
  iconWhenNoAlertIsIncluded: HTMLTemplateResult;
}

export interface AlertActionDefinition {
  label: () => string;
  canBeAppliedToSeveralAlertsAtOnce?: boolean;
}

export interface AlertStandard {
  id: string;
  criticalities: Record<string, AlertCriticalityDefinition>;
  /** In the order the tabs and the dropdown show them. */
  filters: Record<string, AlertFilterDefinition>;
  actions: Record<string, AlertActionDefinition>;
}

/** `undefined` for a key the record does not hold itself, such as `toString`. */
export function ownEntryOf<Entry>(
  record: Record<string, Entry> | undefined,
  key: string | undefined
): Entry | undefined {
  return record !== undefined &&
    key !== undefined &&
    Object.prototype.hasOwnProperty.call(record, key)
    ? record[key]
    : undefined;
}

/** The one action id the components know: a standard names its action this to get "ACK visible". */
export const ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON = 'acknowledge';

/**
 * Returns the definition unchanged. It keeps the criticality and state names
 * as types, so `StandardAlert` rejects a pair the standard does not define,
 * and it rejects a state that names a filter or an action the standard lacks.
 */
export function defineAlertStandard<
  const StandardId extends string,
  FilterId extends string,
  ActionId extends string,
  Criticalities extends Record<
    string,
    AlertCriticalityDefinition<NoInfer<FilterId>, NoInfer<ActionId>>
  >,
>(definition: {
  id: StandardId;
  filters: Record<FilterId, AlertFilterDefinition>;
  actions: Record<ActionId, AlertActionDefinition>;
  criticalities: Criticalities;
}) {
  return definition;
}
