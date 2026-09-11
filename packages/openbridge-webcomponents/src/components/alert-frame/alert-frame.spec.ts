import {describe, expect, it} from 'vitest';
import './alert-frame.js';
import {
  ObcAlertFrame,
  ObcAlertFrameFlashEffect,
  ObcAlertFrameMode,
} from './alert-frame.js';
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

  it('eases the outline width between phases in the outline-eased effect', async () => {
    const el = await setup(ObcAlertFrameMode.unackedActive);
    el.flashEffect = ObcAlertFrameFlashEffect.OutlineEased;
    await el.updateComplete;
    const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;
    const [flash] = el.getAnimations();
    flash.pause();
    flash.currentTime = 100;
    await new Promise((r) => requestAnimationFrame(r));
    await Promise.all(wrapper.getAnimations().map((a) => a.finished));
    expect(getComputedStyle(wrapper).outlineWidth).toBe('4px');

    flash.currentTime = 500;
    // A style read starts the transition synchronously; waiting a frame lets
    // a slow runner finish the 50 ms and drop it from getAnimations().
    void getComputedStyle(wrapper).outlineWidth;
    const transition = wrapper
      .getAnimations()
      .find(
        (a) => (a as CSSTransition).transitionProperty === 'outline-width'
      ) as CSSTransition | undefined;
    expect(transition).toBeDefined();
    expect((transition!.effect as KeyframeEffect).getTiming().duration).toBe(
      50
    );
    transition!.pause();
    transition!.currentTime = 25;
    const midway = parseFloat(getComputedStyle(wrapper).outlineWidth);
    expect(midway).toBeGreaterThan(2);
    expect(midway).toBeLessThan(4);
  });

  describe('rectified dash', () => {
    it('draws the 12/6 dash as one svg path whose stroke width flashes', async () => {
      const el = await setup(ObcAlertFrameMode.unackedRectified);
      await new Promise((r) => requestAnimationFrame(r));
      await el.updateComplete;

      const root = el.shadowRoot!;
      const wrapper = root.querySelector('.wrapper') as HTMLElement;
      expect(getComputedStyle(wrapper).outlineStyle).toBe('none');
      const paths = root.querySelectorAll('svg.dash path');
      expect(paths).toHaveLength(1);
      const path = paths[0];
      expect(getComputedStyle(path).strokeDasharray).toBe('12px, 6px');
      const d = path.getAttribute('d');
      expect(d).toMatch(/^M[\d.-]+ [\d.-]+ H/);

      // The geometry must not change between phases, or the dashes drift.
      const [anim] = el.getAnimations();
      anim.pause();
      anim.currentTime = 100;
      expect(getComputedStyle(path).strokeWidth).toBe('4px');
      anim.currentTime = 3000;
      expect(getComputedStyle(path).strokeWidth).toBe('2px');
      expect(path.getAttribute('d')).toBe(d);
    });

    it('re-measures when a sharp edge or the thickness changes', async () => {
      const el = await setup(ObcAlertFrameMode.unackedRectified);
      // The palette is not loaded here; give the corners a radius to lose.
      el.style.setProperty('--ui-components-button-border-radius', '6px');
      await new Promise((r) => requestAnimationFrame(r));
      await el.updateComplete;
      const path = () => el.shadowRoot!.querySelector('svg.dash path')!;
      const rounded = path().getAttribute('d')!;
      expect(rounded).toContain('A');

      el.sharpEdgeTopLeft = true;
      await el.updateComplete;
      await el.updateComplete;

      const sharp = path().getAttribute('d')!;
      expect(sharp).not.toBe(rounded);
      expect(sharp.startsWith('M3 3 H')).toBe(true);
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
