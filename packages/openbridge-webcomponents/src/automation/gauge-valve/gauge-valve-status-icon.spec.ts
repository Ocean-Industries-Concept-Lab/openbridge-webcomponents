import {afterEach, describe, expect, it} from 'vitest';
import './gauge-valve.js';
import {GaugeValvePriority, type ObcGaugeValve} from './gauge-valve.js';
import type {AutomationButtonReadoutStack} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function offRow(showStatusIcon?: boolean) {
  const el = document.createElement('obc-gauge-valve') as ObcGaugeValve;
  el.priority = GaugeValvePriority.off;
  if (showStatusIcon !== undefined) el.showStatusIcon = showStatusIcon;
  document.body.append(el);
  mounted.push(el);
  await el.updateComplete;
  const stack = el.shadowRoot!.querySelector(
    'obc-automation-button-readout-stack'
  ) as unknown as {readouts: AutomationButtonReadoutStack[]};
  return stack.readouts[0];
}

/** The compact readout stack's `Off` row follows the automation buttons' state rows. */
describe('obc-gauge-valve Off row', () => {
  it('leaves the on/off symbol out by default', async () => {
    expect(await offRow()).toMatchObject({
      type: 'state-off',
      value: 'Off',
      hasIcon: false,
    });
  });

  it('shows it with showStatusIcon', async () => {
    expect(await offRow(true)).toMatchObject({hasIcon: true});
  });
});
