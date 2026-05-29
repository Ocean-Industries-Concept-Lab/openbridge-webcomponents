/**
 * Internal constants and pure helpers for `<obc-two-step-switch>`.
 * Motion timing, drag thresholds, and CSS-token names read at runtime. Not part of the public API.
 */

/** CSS custom property name: --switch-dur-slide on :host (two-step-switch.css) */
export const SWITCH_DUR_SLIDE_CSS_VAR = '--switch-dur-slide';
/** CSS custom property name: --switch-dur-bounce on :host */
export const SWITCH_DUR_BOUNCE_CSS_VAR = '--switch-dur-bounce';
/** CSS custom property name: --switch-dur-nudge on :host */
export const SWITCH_DUR_NUDGE_CSS_VAR = '--switch-dur-nudge';

/** Fallback (ms) if --switch-dur-slide cannot be parsed at first paint. */
export const SWITCH_DUR_SLIDE_MS_DEFAULT = 880;
/** Fallback (ms) if --switch-dur-bounce cannot be parsed at first paint. */
export const SWITCH_DUR_BOUNCE_MS_DEFAULT = 1760;
/** Fallback (ms) if --switch-dur-nudge cannot be parsed at first paint. */
export const SWITCH_DUR_NUDGE_MS_DEFAULT = 220;

/** How long the Confirm step stays armed before it auto-cancels. */
export const CONFIRM_TIMEOUT_MS = 7000;
/** How long the confirm hint stays on the primary button. */
export const CONFIRM_HINT_MS = 900;
/** Fallback aria-label for the cancel button when the consumer omits one. */
export const DEFAULT_CANCEL_ARIA_LABEL = 'Cancel';

/** Pointer must move at least this many px before a drag is recognized. */
export const DRAG_START_THRESHOLD_PX = 3;
/** Duration of the spring-back animation when a drag is released short of the edge. */
export const DRAG_SPRING_BACK_MS = 520;
/** Fraction of dragMaxX at which a drag is considered "at edge" and may commit. */
export const EDGE_COMMIT_RATIO = 0.98;

/**
 * Read a CSS custom property as milliseconds. Accepts `Xms` or `Xs`; falls back to
 * `fallbackMs` when the property is missing or unparseable. Used at component init
 * so the JS phase machine stays in sync with the actual CSS timings.
 */
export function parseSwitchDurationMs(
  style: CSSStyleDeclaration,
  cssVar: string,
  fallbackMs: number
): number {
  const raw = style.getPropertyValue(cssVar).trim();
  if (!raw) return fallbackMs;
  const parsed = parseFloat(raw);
  if (Number.isNaN(parsed)) return fallbackMs;
  if (raw.endsWith('s') && !raw.endsWith('ms')) return parsed * 1000;
  return parsed;
}
