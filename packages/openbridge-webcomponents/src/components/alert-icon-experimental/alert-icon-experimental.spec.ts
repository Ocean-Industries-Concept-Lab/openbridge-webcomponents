import {afterEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-icon-experimental.js';
import type {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {setDefaultAlertStandard} from '../../alert-system/alert-standard.js';
import {AlertSetAside} from '../../alert-system/alert-system.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
} from '../../alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
} from '../../alert-system/automation-alert-system.js';

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

async function setup(
  props: Partial<
    Pick<
      ObcAlertIconExperimental,
      'standard' | 'criticality' | 'state' | 'setAside' | 'flashingSpeed'
    >
  >
) {
  const screen = render(
    html`<obc-alert-icon-experimental
      .standard=${props.standard}
      .criticality=${props.criticality ?? ''}
      .state=${props.state ?? ''}
      .setAside=${props.setAside}
      .flashingSpeed=${props.flashingSpeed ?? FlashingSpeed.Default}
    ></obc-alert-icon-experimental>`
  );
  const el = screen.container.querySelector(
    'obc-alert-icon-experimental'
  ) as ObcAlertIconExperimental;
  await el.updateComplete;
  return el;
}

/** The tags the two frames draw, the flash frame empty when steady. */
const frames = (el: ObcAlertIconExperimental) => [
  el.shadowRoot!.querySelector('.frame > *')?.localName,
  el.shadowRoot!.querySelector('.flash-frame > *')?.localName,
];

afterEach(() => setDefaultAlertStandard('iec-62923'));

describe('obc-alert-icon-experimental', () => {
  it('cross-fades the frames its standard supplies, at its tempo', async () => {
    const el = await setup({
      criticality: Maritime.Alarm,
      state: MaritimeState.ActiveUnacknowledged,
    });
    expect([durations(el), frames(el)]).toEqual([
      [800],
      ['obi-alarm-unacknowledged-iec', 'obi-alarm-acknowledged-outlined'],
    ]);
  });

  it('draws one steady frame when the standard does not flash', async () => {
    const el = await setup({
      criticality: Maritime.Alarm,
      state: MaritimeState.ActiveAcknowledged,
    });
    expect([durations(el), frames(el)]).toEqual([
      [],
      ['obi-alarm-acknowledged-iec', undefined],
    ]);
  });

  it('forces a tempo only while the icon flashes', async () => {
    const forced = await setup({
      criticality: Maritime.Alarm,
      state: MaritimeState.ActiveUnacknowledged,
      flashingSpeed: FlashingSpeed.Slow,
    });
    const steady = await setup({
      criticality: Maritime.Caution,
      state: MaritimeState.Active,
      flashingSpeed: FlashingSpeed.Fast,
    });
    expect([durations(forced), durations(steady)]).toEqual([[1600], []]);
  });

  it('lets the standard stop the flash of an alert set aside', async () => {
    const el = await setup({
      standard: 'isa-18.2',
      criticality: Automation.High,
      state: AutomationState.Unacknowledged,
      setAside: AlertSetAside.Suppressed,
    });
    expect([durations(el), frames(el)]).toEqual([
      [],
      ['obi-alarm-unacknowledged-iec', undefined],
    ]);
  });

  it('fills the box it sits in', async () => {
    const screen = render(
      html`<div style="width: 24px; height: 24px">
        <obc-alert-icon-experimental
          .criticality=${Maritime.Alarm}
          .state=${MaritimeState.ActiveAcknowledged}
        ></obc-alert-icon-experimental>
      </div>`
    );
    const el = screen.container.querySelector('obc-alert-icon-experimental')!;
    await el.updateComplete;
    const {width, height} = el
      .shadowRoot!.querySelector('.frame > *')!
      .getBoundingClientRect();
    expect([width, height]).toEqual([24, 24]);
  });

  it('follows the default standard unless it names its own', async () => {
    const own = await setup({
      standard: 'isa-18.2',
      criticality: Automation.Critical,
      state: AutomationState.Unacknowledged,
    });
    const following = await setup({
      criticality: Automation.Critical,
      state: AutomationState.Unacknowledged,
    });
    expect(following.shadowRoot!.querySelector('.wrapper')).toBeNull();

    setDefaultAlertStandard('isa-18.2');
    await following.updateComplete;
    expect([durations(following), durations(own)]).toEqual([[800], [800]]);
  });
});
