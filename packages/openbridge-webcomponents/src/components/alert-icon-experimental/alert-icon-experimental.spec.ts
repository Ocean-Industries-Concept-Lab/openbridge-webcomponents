import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-icon-experimental.js';
import type {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';

function durations(el: HTMLElement): number[] {
  return el
    .getAnimations()
    .map((a) => (a.effect as KeyframeEffect).getTiming().duration as number);
}

async function setup(
  props: Partial<
    Pick<ObcAlertIconExperimental, 'criticality' | 'state' | 'flashingSpeed'>
  >
) {
  const screen = render(
    html`<obc-alert-icon-experimental
      .criticality=${props.criticality ?? ''}
      .state=${props.state ?? ''}
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

beforeEach(() => setAlertStandard(iec62923AlertStandard));
afterEach(() => setAlertStandard(undefined));

describe('obc-alert-icon-experimental', () => {
  it('cross-fades the frames its standard supplies, at its tempo', async () => {
    const el = await setup({
      criticality: 'alarm',
      state: 'active-unacknowledged',
    });
    expect([durations(el), frames(el)]).toEqual([
      [800],
      ['obi-alarm-unacknowledged-iec', 'obi-alarm-acknowledged-outlined'],
    ]);
  });

  it('draws one steady frame for a state that does not flash', async () => {
    const el = await setup({
      criticality: 'alarm',
      state: 'active-acknowledged',
    });
    expect([durations(el), frames(el)]).toEqual([
      [],
      ['obi-alarm-acknowledged-iec', undefined],
    ]);
  });

  it('forces a tempo only while the icon flashes', async () => {
    const forced = await setup({
      criticality: 'alarm',
      state: 'active-unacknowledged',
      flashingSpeed: FlashingSpeed.Slow,
    });
    const steady = await setup({
      criticality: 'caution',
      state: 'active',
      flashingSpeed: FlashingSpeed.Fast,
    });
    expect([durations(forced), durations(steady)]).toEqual([[1600], []]);
  });

  it('draws nothing for a pair its standard does not define', async () => {
    const el = await setup({criticality: 'caution', state: 'active-silenced'});
    expect(el.shadowRoot!.querySelector('.wrapper')).toBeNull();
  });

  it('fills the box it sits in', async () => {
    const screen = render(
      html`<div style="width: 24px; height: 24px">
        <obc-alert-icon-experimental
          criticality="alarm"
          state="active-acknowledged"
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

  it('redraws on reconnect when the standard changed while it was detached', async () => {
    const el = await setup({
      criticality: 'alarm',
      state: 'active-unacknowledged',
    });
    const parent = el.parentElement!;
    el.remove();
    setAlertStandard(isa182AlertStandard);
    parent.append(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.wrapper')).toBeNull();
  });

  it('draws nothing while no standard is set, and redraws once one is', async () => {
    setAlertStandard(undefined);
    const el = await setup({criticality: 'critical', state: 'unacknowledged'});
    expect(el.shadowRoot!.querySelector('.wrapper')).toBeNull();

    setAlertStandard(isa182AlertStandard);
    await el.updateComplete;
    expect(durations(el)).toEqual([800]);
  });
});
