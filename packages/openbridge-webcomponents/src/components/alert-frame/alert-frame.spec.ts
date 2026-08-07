import {describe, expect, it} from 'vitest';
import './alert-frame.js';
import {ObcAlertFrame, ObcAlertFrameMode} from './alert-frame.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';

describe('obc-alert-frame blinking lifecycle', () => {
  async function setup(mode: ObcAlertFrameMode) {
    const screen = render(
      html`<obc-alert-frame .mode=${mode}></obc-alert-frame>`
    );
    const el = screen.baseElement.querySelector(
      'obc-alert-frame'
    ) as ObcAlertFrame;
    await el.updateComplete;
    return el;
  }

  it('blinks while mode is unacked-active', async () => {
    const el = await setup(ObcAlertFrameMode.unackedActive);

    expect(el.getAnimations().length).toBeGreaterThan(0);
  });

  it('does not blink in other modes', async () => {
    const el = await setup(ObcAlertFrameMode.ackedActive);

    expect(el.getAnimations()).toHaveLength(0);
  });

  describe('mode transitions', () => {
    it('starts blinking when mode becomes unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.ackedActive);
      expect(el.getAnimations()).toHaveLength(0);

      el.mode = ObcAlertFrameMode.unackedActive;
      await el.updateComplete;

      expect(el.getAnimations().length).toBeGreaterThan(0);
    });

    it('stops blinking when mode leaves unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);
      expect(el.getAnimations().length).toBeGreaterThan(0);

      el.mode = ObcAlertFrameMode.ackedActive;
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(0);
    });

    it('stops blinking when mode becomes unacked-rectified', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);

      el.mode = ObcAlertFrameMode.unackedRectified;
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(0);
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
    it('resumes blinking after disconnect and reconnect', async () => {
      const el = await setup(ObcAlertFrameMode.unackedActive);
      const parent = el.parentElement!;
      expect(el.getAnimations().length).toBeGreaterThan(0);

      parent.removeChild(el);
      expect(el.getAnimations()).toHaveLength(0);

      // Reconnect without touching any property. firstUpdated() will not run
      // again, so this only passes if blinking is reinstalled on update.
      parent.appendChild(el);
      await el.updateComplete;

      expect(el.getAnimations().length).toBeGreaterThan(0);
    });

    it('does not resume blinking on reconnect when mode is not unacked-active', async () => {
      const el = await setup(ObcAlertFrameMode.ackedActive);
      const parent = el.parentElement!;

      parent.removeChild(el);
      parent.appendChild(el);
      await el.updateComplete;

      expect(el.getAnimations()).toHaveLength(0);
    });

    it('does not blink after disconnection when mode became unacked-active while detached', async () => {
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
});
