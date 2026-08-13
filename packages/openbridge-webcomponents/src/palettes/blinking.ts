const CRITICAL_PERIOD = 1000; // ms
const ALARM_PERIOD = 2000; // ms
const WARNING_PERIOD = 4000; // ms
const LOW_PERIOD = 8000; // ms
const BLINK_OFF_DURATION = 250; // ms

function blinkingInstall(
  el: HTMLElement,
  period: number,
  offset: number,
  label: string
): () => void {
  const blinkOffDuration = BLINK_OFF_DURATION / period;
  const frames: Keyframe[] = [
    {[label + '-on']: 0, [label + '-off']: 1, easing: 'step-end'},
    {
      [label + '-on']: 1,
      [label + '-off']: 0,
      offset: blinkOffDuration,
      easing: 'step-end',
    },
    {[label + '-on']: 1, [label + '-off']: 0},
  ];
  const anim = el.animate(frames, {duration: period, iterations: Infinity});
  // Common time origin for all animations, so they blink in sync. The offset is
  // negative so the animation starts already that far into its period.
  anim.startTime = offset;
  return () => anim.cancel();
}

export function blinkingCritical(el: HTMLElement): () => void {
  return blinkingInstall(el, CRITICAL_PERIOD, 0, '--critical-blink');
}

export function blinkingAlarm(el: HTMLElement): () => void {
  return blinkingInstall(el, ALARM_PERIOD, 250, '--alarm-blink');
}

export function blinkingWarning(el: HTMLElement): () => void {
  return blinkingInstall(el, WARNING_PERIOD, 500, '--warning-blink');
}

export function blinkingLow(el: HTMLElement): () => void {
  return blinkingInstall(el, LOW_PERIOD, 750, '--low-blink');
}

export function blinkingAll(el: HTMLElement): () => void {
  const animes = [
    blinkingCritical(el),
    blinkingAlarm(el),
    blinkingWarning(el),
    blinkingLow(el),
  ];
  return () => animes.forEach((anim) => anim());
}
