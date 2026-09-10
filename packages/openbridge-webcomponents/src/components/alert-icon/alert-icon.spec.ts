import {describe, expect, it} from 'vitest';
import './alert-icon.js';
import {ObcAlertIcon} from './alert-icon.js';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import {AlertType, FlashingSpeed} from '../../types.js';

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

describe('obc-alert-icon flashing lifecycle', () => {
  async function setup(
    props: Partial<
      Pick<
        ObcAlertIcon,
        'alertType' | 'acknowledged' | 'active' | 'flashingSpeed'
      >
    > = {}
  ) {
    const screen = render(
      html`<obc-alert-icon
        .alertType=${props.alertType ?? AlertType.Alarm}
        .acknowledged=${props.acknowledged ?? false}
        .active=${props.active}
        .flashingSpeed=${props.flashingSpeed ?? FlashingSpeed.Default}
      ></obc-alert-icon>`
    );
    const el = screen.container.querySelector('obc-alert-icon') as ObcAlertIcon;
    await el.updateComplete;
    return el;
  }

  it('flashes fast for an unacknowledged alarm', async () => {
    const el = await setup();

    expect(durations(el)).toEqual([800]);
    expect(el.shadowRoot!.querySelector('.wrapper.flash-fast')).not.toBeNull();
  });

  it('flashes slow for a warning and very slow for level-low', async () => {
    expect(durations(await setup({alertType: AlertType.Warning}))).toEqual([
      1600,
    ]);
    expect(durations(await setup({alertType: AlertType.LevelLow}))).toEqual([
      3200,
    ]);
  });

  it('flashes very slow while rectified and unacknowledged', async () => {
    expect(durations(await setup({active: false}))).toEqual([3200]);
  });

  it('never flashes caution or diagnostic', async () => {
    expect(durations(await setup({alertType: AlertType.Caution}))).toEqual([]);
    expect(
      durations(await setup({alertType: AlertType.LevelDiagnostic}))
    ).toEqual([]);
  });

  it('stays static for caution and diagnostic even with an explicit speed', async () => {
    for (const alertType of [AlertType.Caution, AlertType.LevelDiagnostic]) {
      const el = await setup({alertType, flashingSpeed: FlashingSpeed.Fast});
      expect(el.getAnimations()).toHaveLength(0);
      expect(el.shadowRoot!.querySelector('.wrapper .a')).toBeNull();
      expect(el.shadowRoot!.querySelector('.wrapper')!.children).toHaveLength(
        1
      );
    }
  });

  it('honours an explicit flashingSpeed unless acknowledged', async () => {
    expect(durations(await setup({flashingSpeed: FlashingSpeed.Slow}))).toEqual(
      [1600]
    );
    expect(
      durations(await setup({flashingSpeed: FlashingSpeed.Fixed}))
    ).toEqual([]);
    expect(
      durations(
        await setup({flashingSpeed: FlashingSpeed.Fast, acknowledged: true})
      )
    ).toEqual([]);
  });

  it('does not flash once acknowledged', async () => {
    const el = await setup({acknowledged: true});

    expect(el.getAnimations()).toHaveLength(0);
  });

  it('stops flashing when the alert is acknowledged', async () => {
    const el = await setup();
    expect(el.getAnimations().length).toBeGreaterThan(0);

    el.acknowledged = true;
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(0);
  });

  it('resumes flashing after disconnect and reconnect', async () => {
    const el = await setup();
    const parent = el.parentElement!;
    const initial = el.getAnimations().length;
    expect(initial).toBeGreaterThan(0);

    parent.removeChild(el);
    expect(el.getAnimations()).toHaveLength(0);

    // Reconnect without touching any property, so no Lit update is scheduled.
    parent.appendChild(el);
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(initial);
  });

  it('does not accumulate animations across repeated updates', async () => {
    const el = await setup();
    const initial = el.getAnimations().length;

    el.active = true;
    await el.updateComplete;
    el.silenced = true;
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(initial);
  });
});
