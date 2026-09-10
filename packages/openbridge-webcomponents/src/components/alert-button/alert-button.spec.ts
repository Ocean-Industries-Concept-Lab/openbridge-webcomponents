import {describe, expect, it} from 'vitest';
import './alert-button.js';
import {ObcAlertButton} from './alert-button.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import {AlertType, FlashingSpeed} from '../../types.js';

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

describe('obc-alert-button flashing lifecycle', () => {
  async function setup(
    props: Partial<
      Pick<
        ObcAlertButton,
        'nAlerts' | 'alertType' | 'blinking' | 'flashingSpeed'
      >
    > = {}
  ) {
    const screen = render(
      html`<obc-alert-button
        .nAlerts=${props.nAlerts ?? 1}
        .alertType=${props.alertType ?? AlertType.Alarm}
        .blinking=${props.blinking ?? true}
        .flashingSpeed=${props.flashingSpeed ?? FlashingSpeed.Default}
      ></obc-alert-button>`
    );
    const el = screen.container.querySelector(
      'obc-alert-button'
    ) as ObcAlertButton;
    await el.updateComplete;
    return el;
  }

  it('flashes fast for a blinking alarm button with alerts', async () => {
    const el = await setup();

    expect(durations(el)).toEqual([800]);
    expect(el.shadowRoot!.querySelector('.wrapper.flash-fast')).not.toBeNull();
  });

  it('flashes slow for a warning and never for caution', async () => {
    expect(durations(await setup({alertType: AlertType.Warning}))).toEqual([
      1600,
    ]);
    expect(durations(await setup({alertType: AlertType.Caution}))).toEqual([]);
  });

  it('keeps blinking as the gate', async () => {
    expect(durations(await setup({blinking: false}))).toEqual([]);
    expect(durations(await setup({nAlerts: 0}))).toEqual([]);
  });

  it('honours an explicit flashingSpeed', async () => {
    expect(
      durations(await setup({flashingSpeed: FlashingSpeed.VerySlow}))
    ).toEqual([3200]);
    expect(
      durations(await setup({flashingSpeed: FlashingSpeed.Fixed}))
    ).toEqual([]);
  });

  it('cancels the animation on disconnect', async () => {
    const el = await setup();

    el.parentElement!.removeChild(el);

    expect(el.getAnimations()).toHaveLength(0);
  });

  it('resumes flashing after disconnect and reconnect', async () => {
    const el = await setup();
    const parent = el.parentElement!;

    parent.removeChild(el);
    expect(el.getAnimations()).toHaveLength(0);

    // Reconnect without touching any property. firstUpdated() will not run
    // again, so this only passes if the controller re-syncs on connect.
    parent.appendChild(el);
    await el.updateComplete;

    expect(durations(el)).toEqual([800]);
  });

  it('does not accumulate animations across repeated updates', async () => {
    const el = await setup();

    el.large = true;
    await el.updateComplete;
    el.counter = true;
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(1);
  });
});
