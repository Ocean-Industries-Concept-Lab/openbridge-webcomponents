/**
 * `alert-system` – The contract every alert standard implements, and the
 * neutral state the experimental alert components draw from.
 *
 * The components never read a standard's own vocabulary. A standard turns a
 * criticality and one of its states into an `AlertPresentation`: whether the
 * situation is still present, whether an ACK is owed, how it flashes, and
 * the glyph that draws it. A new standard is one `AlertSystem`, registered
 * with `registerAlertSystem()` (`alert-systems.ts`); no component changes.
 *
 * Features:
 * - `AlertSystem`: the id, the criticalities most severe first, the states
 *   and those each criticality takes, `label()`, `present()`, `noAckGlyph()`,
 *   `displayRank()`, and whether several alerts may be acknowledged at once.
 * - `AlertPresentation`, with `AlertCondition`, `AlertAcknowledgement`,
 *   `AlertSetAside` and `AlertGlyph`.
 * - `makePresentation()` and `rankByUrgency()` for writing a system.
 * - Experimental, and may still change (#1330).
 */
import type {SVGTemplateResult, TemplateResult} from 'lit';
import {FlashingSpeed, type ResolvedFlashingSpeed} from '../types.js';

/** Whether the situation that raised an alert is still present. */
export enum AlertCondition {
  /** The situation is present. */
  Active = 'active',
  /**
   * The situation has cleared, but the alert stays because an action is
   * still owed: an acknowledgement, or a reset of a latched alarm.
   */
  Cleared = 'cleared',
  /** Nothing is pending. */
  Normal = 'normal',
}

/** Whether an alert waits for acknowledgement. */
export enum AlertAcknowledgement {
  /** The criticality takes no acknowledgement, as a caution does not. */
  None = 'none',
  Unacked = 'unacked',
  Acked = 'acked',
}

/** Why an alert is set aside, so that the lists of active and unacked alerts leave it out. */
export enum AlertSetAside {
  /** An operator shelved it for a time. */
  Shelved = 'shelved',
  /** An operator paused the alarm for a time. */
  Paused = 'paused',
  /** An operator switched the alarm off. */
  Off = 'off',
  /** System logic suppresses it while it does not apply. */
  Suppressed = 'suppressed',
  /** It is taken out of service, for maintenance for example. */
  OutOfService = 'out-of-service',
  /** Another system decided it is not relevant here. */
  Blocked = 'blocked',
}

/**
 * The library's two glyphs for an alert that waits for an ACK it cannot get
 * here. `obc-alert-menu-item` draws only these, so a standard picks the
 * closer one rather than bringing its own.
 */
export enum NoAckGlyph {
  Alarm = 'alarm',
  Warning = 'warning',
}

/**
 * What draws an alert: `frame`, and `flashFrame` to cross-fade with it while
 * the alert flashes. A glyph without `flashFrame` stays steady.
 */
export interface AlertGlyph {
  frame: TemplateResult | SVGTemplateResult;
  flashFrame?: TemplateResult | SVGTemplateResult;
}

/** What a component needs to draw and filter an alert, whatever its standard. */
export interface AlertPresentation {
  condition: AlertCondition;
  acknowledgement: AlertAcknowledgement;
  /** The sound is silenced while the alert is still shown. */
  silenced: boolean;
  /** Another station or person has taken the alert over. */
  transferred: boolean;
  /** A latched alarm waits for an operator reset. */
  resetOwed: boolean;
  setAside?: AlertSetAside;
  flash: ResolvedFlashingSpeed;
  glyph: AlertGlyph;
}

/** Facts beside the state that change how an alert is presented. */
export interface AlertPresentOptions {
  setAside?: AlertSetAside;
}

/** One alert standard: its criticalities and states, and how they are presented. */
export interface AlertSystem<
  Criticality extends string = string,
  State extends string = string,
> {
  /** The standard's id, such as `iec-62923`; alerts name it as their `standard`. */
  readonly id: string;
  /** Most severe first. */
  readonly criticalities: readonly Criticality[];
  readonly states: readonly State[];
  /**
   * The states an alert of `criticality` can be in. `present()` answers for
   * any state all the same, taking one the criticality does not have as the
   * nearest it does.
   */
  statesOf(criticality: Criticality): readonly State[];
  /** Whether "ACK visible" may acknowledge several alerts at once. */
  readonly allowsBulkAcknowledge: boolean;
  label(criticality: Criticality): string;
  present(
    criticality: Criticality,
    state: State,
    options?: AlertPresentOptions
  ): AlertPresentation;
  noAckGlyph(criticality: Criticality): NoAckGlyph;
  /**
   * Where an alert stands in a list, lowest first. A list of several
   * standards compares the ranks each gives.
   */
  displayRank(criticality: Criticality, state: State): number;
}

/**
 * Builds a presentation with the flags left at their usual values: not
 * silenced, transferred or owing a reset.
 */
export function makePresentation(
  glyph: AlertGlyph,
  fields: Pick<AlertPresentation, 'condition' | 'acknowledgement' | 'flash'> &
    Partial<Pick<AlertPresentation, 'silenced' | 'transferred' | 'resetOwed'>>,
  options: AlertPresentOptions = {}
): AlertPresentation {
  return {
    condition: fields.condition,
    acknowledgement: fields.acknowledgement,
    silenced: fields.silenced ?? false,
    transferred: fields.transferred ?? false,
    resetOwed: fields.resetOwed ?? false,
    setAside: options.setAside,
    flash: fields.flash,
    glyph,
  };
}

/**
 * Ranks by urgency, then by criticality: an active alert still owed an ACK,
 * or flashing without one, comes first; then a cleared one owed an ACK; then
 * an active one acknowledged, handed over or steady; then one owing only a
 * reset; then a normal one. That is the order of IEC 62923-1 6.4.2.1.
 */
export function rankByUrgency(
  {condition, acknowledgement, transferred, flash}: AlertPresentation,
  criticalityIndex: number
): number {
  const unacked = acknowledgement === AlertAcknowledgement.Unacked;
  let tier: number;
  if (condition === AlertCondition.Normal) {
    tier = 4;
  } else if (condition === AlertCondition.Cleared) {
    tier = unacked ? 1 : 3;
  } else if (
    !transferred &&
    (unacked ||
      (acknowledgement === AlertAcknowledgement.None &&
        flash !== FlashingSpeed.Fixed))
  ) {
    tier = 0;
  } else {
    tier = 2;
  }
  return tier * 100 + criticalityIndex;
}
