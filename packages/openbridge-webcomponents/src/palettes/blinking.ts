const CRITICAL_PERIOD = 1000; // ms
const ALARM_PERIOD = 2000; // ms
const WARNING_PERIOD = 4000; // ms
const LOW_PERIOD = 8000; // ms

function blinkingInstall(
  el: HTMLElement,
  period: number,
  label: string
): () => void {
  const anim = el.animate(
    [
      {[label + '-on']: 1, [label + '-off']: 0},
      {[label + '-on']: 0, [label + '-off']: 1},
    ],
    {duration: period, iterations: Infinity, easing: 'steps(2, jump-none)'}
  );
  anim.startTime = 0; // Common time origin for all animations, so they blink in sync.
  return () => anim.cancel();
}

export function blinkingCritical(el: HTMLElement): () => void {
  return blinkingInstall(el, CRITICAL_PERIOD, '--critical-blink');
}

export function blinkingAlarm(el: HTMLElement): () => void {
  return blinkingInstall(el, ALARM_PERIOD, '--alarm-blink');
}

export function blinkingWarning(el: HTMLElement): () => void {
  return blinkingInstall(el, WARNING_PERIOD, '--warning-blink');
}

export function blinkingLow(el: HTMLElement): () => void {
  return blinkingInstall(el, LOW_PERIOD, '--low-blink');
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
