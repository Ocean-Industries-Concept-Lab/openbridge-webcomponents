import {afterEach, describe, expect, it} from 'vitest';
import '../main.css';
import {
  FLASH_OFF_MS,
  FLASH_ON_MS,
  FLASH_TEMPOS,
  blinkingAll,
  flashPeriodMs,
  flashVariable,
  installFlashing,
} from './blinking.js';
import {FlashingSpeed} from '../types.js';

describe('installFlashing', () => {
  const hosts: HTMLElement[] = [];
  function host(): HTMLElement {
    const el = document.createElement('div');
    document.body.append(el);
    hosts.push(el);
    return el;
  }
  afterEach(() => {
    hosts.splice(0).forEach((el) => el.remove());
  });

  it.each(FLASH_TEMPOS)(
    '%s runs on for its on-time, off for 400 ms, from the document origin',
    (tempo) => {
      const el = host();
      const cancel = installFlashing(el, tempo);
      const [anim] = el.getAnimations();
      const effect = anim.effect as KeyframeEffect;
      const timing = effect.getTiming();
      expect(timing.duration).toBe(FLASH_ON_MS[tempo] + FLASH_OFF_MS);
      expect(timing.iterations).toBe(Infinity);
      const frames = effect.getKeyframes();
      expect(frames).toHaveLength(3);
      // Chromium reports the normalised form of `step-end`.
      expect(frames[0].easing).toMatch(/^(step-end|steps\(1\))$/);
      expect(frames[1].offset).toBeCloseTo(
        FLASH_ON_MS[tempo] / flashPeriodMs(tempo)
      );
      expect(anim.startTime).toBe(0);
      cancel();
      expect(el.getAnimations()).toHaveLength(0);
    }
  );

  it('nests the cycles so every tempo dips together', () => {
    expect(flashPeriodMs(FlashingSpeed.Fast)).toBe(800);
    expect(flashPeriodMs(FlashingSpeed.Slow)).toBe(1600);
    expect(flashPeriodMs(FlashingSpeed.VerySlow)).toBe(3200);
  });

  it('drives the on/off variables in step', () => {
    const el = host();
    installFlashing(el, FlashingSpeed.Fast);
    const [anim] = el.getAnimations();
    const on = () =>
      getComputedStyle(el).getPropertyValue(
        flashVariable(FlashingSpeed.Fast, 'on')
      );
    const off = () =>
      getComputedStyle(el).getPropertyValue(
        flashVariable(FlashingSpeed.Fast, 'off')
      );
    anim.pause();
    anim.currentTime = 100;
    expect(on().trim()).toBe('1');
    expect(off().trim()).toBe('0');
    anim.currentTime = 500;
    expect(on().trim()).toBe('0');
    expect(off().trim()).toBe('1');
  });

  it('blinkingAll installs one animation per tempo and cancels them together', () => {
    const el = host();
    const cancel = blinkingAll(el);
    expect(el.getAnimations()).toHaveLength(FLASH_TEMPOS.length);
    cancel();
    expect(el.getAnimations()).toHaveLength(0);
  });
});
