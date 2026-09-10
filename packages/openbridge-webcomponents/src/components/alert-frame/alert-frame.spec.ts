import {describe, expect, it} from 'vitest';
import './alert-frame.js';
import {ObcAlertFrame, ObcAlertFrameMode} from './alert-frame.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import {AlertType, FlashingSpeed} from '../../types.js';

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

describe('obc-alert-frame flashing lifecycle', () => {
  async function setup(
    mode: ObcAlertFrameMode,
    status: AlertType = AlertType.Alarm,
    flashingSpeed: FlashingSpeed = FlashingSpeed.Default
  ) {
    const screen = render(
      html`<obc-alert-frame
        .mode=${mode}
        .status=${status}
        .flashingSpeed=${flashingSpeed}
      ></obc-alert-frame>`
    );
    const el = screen.container.querySelector(
      'obc-alert-frame'
    ) as ObcAlertFrame;
    await el.updateComplete;
    return el;
  }

  it('flashes fast while an alarm is unacked-active', async () => {
    const el = await setup(ObcAlertFrameMode.unackedActive);

    expect(durations(el)).toEqual([800]);
    expect(el.resolvedFlashingSpeed).toBe(FlashingSpeed.Fast);
  });

  it('flashes slow for a warning and very slow for level-low', async () => {
    expect(
      durations(await setup(ObcAlertFrameMode.unackedActive, AlertType.Warning))
    ).toEqual([1600]);
    expect(
      durations(
        await setup(ObcAlertFrameMode.unackedActive, AlertType.LevelLow)
      )
    ).toEqual([3200]);
  });

  it('never flashes a caution', async () => {
    expect(
      durations(await setup(ObcAlertFrameMode.unackedActive, AlertType.Caution))
    ).toEqual([]);
    expect(
      durations(
        await setup(ObcAlertFrameMode.unackedRectified, AlertType.Caution)
      )
    ).toEqual([]);
  });

  it('flashes very slow while rectified', async () => {
    const el = await setup(ObcAlertFrameMode.unackedRectified);

    expect(durations(el)).toEqual([3200]);
  });

  it('honours an explicit flashingSpeed', async () => {
    expect(
      durations(
        await setup(
          ObcAlertFrameMode.unackedActive,
          AlertType.Alarm,
          FlashingSpeed.Slow
        )
      )
    ).toEqual([1600]);
    expect(
      durations(
        await setup(
          ObcAlertFrameMode.unackedActive,
          AlertType.Alarm,
          FlashingSpeed.Fixed
        )
      )
    ).toEqual([]);
  });

  it('does not flash in acked-active', async () => {
    const el = await setup(ObcAlertFrameMode.ackedActive);

    expect(el.getAnimations()).toHaveLength(0);
  });

  describe('mode transitions', () => {
    it('starts flashing when mode becomes unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.ackedActive);
      expect(el.getAnimations()).toHaveLength(0);

      el.mode = ObcAlertFrameMode.unackedActive;
      await el.updateComplete;

      expect(durations(el)).toEqual([800]);
    });

    it('stops flashing when mode leaves unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);
      expect(el.getAnimations().length).toBeGreaterThan(0);

      el.mode = ObcAlertFrameMode.ackedActive;
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(0);
    });

    it('switches to the very-slow tempo when mode becomes unacked-rectified', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);

      el.mode = ObcAlertFrameMode.unackedRectified;
      await el.updateComplete;

      expect(durations(el)).toEqual([3200]);
    });

    it('does not accumulate animations across repeated updates', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);
      const initial = el.getAnimations().length;

      el.fullWidth = true;
      await el.updateComplete;
      el.showIcon = true;
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(initial);
    });
  });

  describe('reconnection', () => {
    it('resumes flashing after disconnect and reconnect', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);
      const parent = el.parentElement!;
      expect(el.getAnimations().length).toBeGreaterThan(0);

      parent.removeChild(el);
      expect(el.getAnimations()).toHaveLength(0);

      // Reconnect without touching any property. firstUpdated() will not run
      // again, so this only passes if the controller re-syncs on connect.
      parent.appendChild(el);
      await el.updateComplete;

      expect(el.getAnimations().length).toBeGreaterThan(0);
    });

    it('does not resume flashing on reconnect when mode is not unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.ackedActive);
      const parent = el.parentElement!;

      parent.removeChild(el);
      parent.appendChild(el);
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(0);
    });

    it('does not flash after disconnection when mode became unacked-active while detached', async () => {
      const el = await setup(ObcAlertFrameMode.ackedActive);
      const parent = el.parentElement!;

      parent.removeChild(el);
      await el.updateComplete;

      expect(el.getAnimations().length).toBe(0);

      el.mode = ObcAlertFrameMode.unackedActive;
      await el.updateComplete;

      expect(el.getAnimations().length).toBe(0);

      parent.appendChild(el);
      await el.updateComplete;

      expect(el.getAnimations().length).toBeGreaterThan(0);
    });
  });

  describe('rectified dash', () => {
    it('draws the 12/6 dash as two svg paths in place of the outline', async () => {
      const el = await setup(ObcAlertFrameMode.unackedRectified);
      await new Promise((r) => requestAnimationFrame(r));
      await el.updateComplete;

      const root = el.shadowRoot!;
      const wrapper = root.querySelector('.wrapper') as HTMLElement;
      expect(getComputedStyle(wrapper).outlineStyle).toBe('none');
      const paths = root.querySelectorAll('svg.dash path');
      expect(paths).toHaveLength(2);
      for (const path of paths) {
        expect(getComputedStyle(path).strokeDasharray).toBe('12px, 6px');
        expect(path.getAttribute('d')).toMatch(/^M[\d.-]+ [\d.-]+ H/);
      }
      expect(getComputedStyle(paths[0]).strokeWidth).toBe('2px');
      expect(getComputedStyle(paths[1]).strokeWidth).toBe('4px');
    });

    it('removes the svg when the mode leaves unacked-rectified', async () => {
      const el = await setup(ObcAlertFrameMode.unackedRectified);
      await new Promise((r) => requestAnimationFrame(r));
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('svg.dash')).not.toBeNull();

      el.mode = ObcAlertFrameMode.ackedActive;
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('svg.dash')).toBeNull();
    });
  });
});
