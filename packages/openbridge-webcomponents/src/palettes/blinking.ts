import {FlashingSpeed, type FlashTempo} from '../types.js';

/** Shared off phase: nested cycles (800/1600/3200 ms) then dip together (#1224). */
export const FLASH_OFF_MS = 400;

export const FLASH_ON_MS: Record<FlashTempo, number> = {
  [FlashingSpeed.Fast]: 400,
  [FlashingSpeed.Slow]: 1200,
  [FlashingSpeed.VerySlow]: 2800,
};

export const FLASH_TEMPOS: readonly FlashTempo[] = [
  FlashingSpeed.Fast,
  FlashingSpeed.Slow,
  FlashingSpeed.VerySlow,
];

export function flashPeriodMs(tempo: FlashTempo): number {
  return FLASH_ON_MS[tempo] + FLASH_OFF_MS;
}

/** Animated custom property name; `on` reads 1 during the on phase, `off` 1 during the off phase. */
export function flashVariable(tempo: FlashTempo, phase: 'on' | 'off'): string {
  return `--flash-${tempo}-${phase}`;
}

/**
 * Animates `--flash-<tempo>-on` / `-off` on `el` for one tempo. Returns the
 * cancel function.
 */
export function installFlashing(
  el: HTMLElement,
  tempo: FlashTempo
): () => void {
  const on = flashVariable(tempo, 'on');
  const off = flashVariable(tempo, 'off');
  const period = flashPeriodMs(tempo);
  const frames: Keyframe[] = [
    {[on]: 1, [off]: 0, easing: 'step-end'},
    {
      [on]: 0,
      [off]: 1,
      offset: FLASH_ON_MS[tempo] / period,
      easing: 'step-end',
    },
    {[on]: 0, [off]: 1},
  ];
  const anim = el.animate(frames, {duration: period, iterations: Infinity});
  // Document-timeline origin, so every flashing element is in the same phase.
  anim.startTime = 0;
  return () => anim.cancel();
}

/** Installs every tempo on `el`, for CSS that reads the variables directly. */
export function blinkingAll(el: HTMLElement): () => void {
  const cancels = FLASH_TEMPOS.map((tempo) => installFlashing(el, tempo));
  return () => cancels.forEach((cancel) => cancel());
}
