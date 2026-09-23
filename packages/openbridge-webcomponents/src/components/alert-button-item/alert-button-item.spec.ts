import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import './alert-button-item.js';
import {ObcAlertButtonItem, ObcAlertButtonType} from './alert-button-item.js';
import type {ObcAlertCounterItem} from '../alert-counter-item/alert-counter-item.js';
import {AlertType, FlashingSpeed, type AlertCounts} from '../../types.js';

type ItemProps = Partial<
  Pick<
    ObcAlertButtonItem,
    | 'type'
    | 'alertType'
    | 'nAlerts'
    | 'counter'
    | 'globalCounter'
    | 'counts'
    | 'shelvedCount'
    | 'blinking'
    | 'flashingSpeed'
  >
>;

const SEVERITY_COUNTS: AlertCounts = {
  countAlarm: 2,
  countWarning: 4,
  countCaution: 6,
};

async function setup(props: ItemProps = {}) {
  const screen = render(
    html`<obc-alert-button-item
      .type=${props.type ?? ObcAlertButtonType.Normal}
      .alertType=${'alertType' in props ? props.alertType : AlertType.Alarm}
      .nAlerts=${props.nAlerts ?? 3}
      .counter=${props.counter ?? true}
      .globalCounter=${props.globalCounter ?? false}
      .counts=${props.counts ?? {}}
      .shelvedCount=${props.shelvedCount ?? 0}
      .blinking=${props.blinking ?? false}
      .flashingSpeed=${props.flashingSpeed ?? FlashingSpeed.Default}
    ></obc-alert-button-item>`
  );
  const el = screen.container.querySelector(
    'obc-alert-button-item'
  ) as ObcAlertButtonItem;
  await el.updateComplete;
  return el;
}

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

function button(el: ObcAlertButtonItem): HTMLButtonElement {
  return el.shadowRoot!.querySelector('button')!;
}

describe('obc-alert-button-item flashing lifecycle', () => {
  it('flashes fast for a blinking alarm with alerts', async () => {
    const el = await setup({blinking: true});

    expect(durations(el)).toEqual([800]);
    expect(button(el).classList.contains('flash-fast')).toBe(true);
  });

  it('flashes slow for a warning and never for caution', async () => {
    expect(
      durations(await setup({blinking: true, alertType: AlertType.Warning}))
    ).toEqual([1600]);
    expect(
      durations(await setup({blinking: true, alertType: AlertType.Caution}))
    ).toEqual([]);
  });

  it('keeps blinking as the gate', async () => {
    expect(durations(await setup({blinking: false}))).toEqual([]);
    expect(durations(await setup({blinking: true, nAlerts: 0}))).toEqual([]);
  });

  it('honours an explicit flashingSpeed', async () => {
    expect(
      durations(
        await setup({blinking: true, flashingSpeed: FlashingSpeed.VerySlow})
      )
    ).toEqual([3200]);
    expect(
      durations(
        await setup({blinking: true, flashingSpeed: FlashingSpeed.Fixed})
      )
    ).toEqual([]);
  });

  it('cancels the animation on disconnect', async () => {
    const el = await setup({blinking: true});

    el.parentElement!.removeChild(el);

    expect(el.getAnimations()).toHaveLength(0);
  });

  it('resumes flashing after disconnect and reconnect', async () => {
    const el = await setup({blinking: true});
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
    const el = await setup({blinking: true});

    el.fillHeight = true;
    await el.updateComplete;
    el.counter = false;
    await el.updateComplete;

    expect(el.getAnimations()).toHaveLength(1);
  });
});

describe('obc-alert-button-item counter', () => {
  it('shows the count next to the bell', async () => {
    const el = await setup();

    expect(
      el.shadowRoot!.querySelector('.visible-wrapper .count')!.textContent
    ).toBe('3');
  });

  it('hides the count when flat, without alerts or with counter off', async () => {
    for (const props of [
      {type: ObcAlertButtonType.Flat},
      {nAlerts: 0},
      {counter: false},
    ]) {
      expect(
        (await setup(props)).shadowRoot!.querySelector('.count')
      ).toBeNull();
    }
  });
});

describe('obc-alert-button-item global counter', () => {
  it('renders the severity badges, then the bell and the total', async () => {
    const el = await setup({
      globalCounter: true,
      nAlerts: 12,
      counts: SEVERITY_COUNTS,
      shelvedCount: 9,
    });
    const counter = el.shadowRoot!.querySelector(
      'obc-alert-counter-item'
    ) as ObcAlertCounterItem;

    expect(counter.counts).toEqual(SEVERITY_COUNTS);
    expect(counter.shelvedCount).toBe(9);
    expect(
      el.shadowRoot!.querySelector('.visible-wrapper obi-alerts-active')
    ).not.toBeNull();
    expect(
      el.shadowRoot!.querySelector('.visible-wrapper .count')!.textContent
    ).toBe('12');
  });

  it('uses the normal style whatever the type', async () => {
    const el = await setup({
      globalCounter: true,
      type: ObcAlertButtonType.Enhanced,
      nAlerts: 12,
      counts: SEVERITY_COUNTS,
    });

    expect(button(el).classList.contains('type-normal')).toBe(true);
  });

  it('never flashes', async () => {
    const el = await setup({
      globalCounter: true,
      blinking: true,
      nAlerts: 12,
      counts: SEVERITY_COUNTS,
    });

    expect(durations(el)).toEqual([]);
  });

  it('leaves the counter item and the total out when nothing is counted', async () => {
    const el = await setup({globalCounter: true, nAlerts: 0, counts: {}});

    expect(el.shadowRoot!.querySelector('obc-alert-counter-item')).toBeNull();
    expect(el.shadowRoot!.querySelector('.count')).toBeNull();
  });
});

describe('obc-alert-button-item accessibility', () => {
  it('names the alerts, the count and the severity', async () => {
    expect(button(await setup()).getAttribute('aria-label')).toBe(
      'Alerts, 3, Alarm'
    );
    expect(
      button(await setup({nAlerts: 0, alertType: undefined})).getAttribute(
        'aria-label'
      )
    ).toBe('Alerts');
  });

  it('adds the global counter breakdown', async () => {
    const el = await setup({
      globalCounter: true,
      nAlerts: 12,
      counts: SEVERITY_COUNTS,
    });

    expect(button(el).getAttribute('aria-label')).toBe(
      'Alerts, 12, 2 Alarm, 4 Warning, 6 Caution'
    );
  });

  it('names the badges the global counter shows without a total', async () => {
    const el = await setup({
      globalCounter: true,
      nAlerts: 0,
      counts: SEVERITY_COUNTS,
    });

    expect(button(el).getAttribute('aria-label')).toBe(
      'Alerts, 2 Alarm, 4 Warning, 6 Caution'
    );
  });

  it('follows a host aria-label set after the first render', async () => {
    const el = await setup();

    el.setAttribute('aria-label', 'Engine alerts');
    await el.updateComplete;

    expect(button(el).getAttribute('aria-label')).toBe('Engine alerts');
  });

  it('does not submit an enclosing form', async () => {
    let submitted = 0;
    const screen = render(
      html`<form
        @submit=${(event: Event) => {
          event.preventDefault();
          submitted++;
        }}
      >
        <obc-alert-button-item .nAlerts=${3}></obc-alert-button-item>
      </form>`
    );
    const el = screen.container.querySelector(
      'obc-alert-button-item'
    ) as ObcAlertButtonItem;
    await el.updateComplete;

    button(el).click();

    expect(submitted).toBe(0);
  });

  it('forwards an aria-label set on the host', async () => {
    const screen = render(
      html`<obc-alert-button-item
        aria-label="Engine alerts"
        .nAlerts=${3}
      ></obc-alert-button-item>`
    );
    const el = screen.container.querySelector(
      'obc-alert-button-item'
    ) as ObcAlertButtonItem;
    await el.updateComplete;

    expect(button(el).getAttribute('aria-label')).toBe('Engine alerts');
  });

  it('activates with Enter and Space', async () => {
    const el = await setup();
    let clicks = 0;
    el.addEventListener('click', () => clicks++);

    button(el).focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');

    expect(clicks).toBe(2);
  });
});

describe('obc-alert-button-item announcement', () => {
  it('carries its name in a polite live region that follows the counts', async () => {
    const el = await setup({nAlerts: 3, alertType: AlertType.Alarm});

    const region = el.shadowRoot!.querySelector('[aria-live="polite"]');
    expect(region?.textContent?.trim()).toBe(
      button(el).getAttribute('aria-label')
    );

    el.nAlerts = 4;
    await el.updateComplete;

    expect(region?.textContent?.trim()).toBe('Alerts, 4, Alarm');
  });
});
