import {describe, it, expect, afterEach} from 'vitest';
import './analog-valve.js';
import type {ObcAnalogValve} from './analog-valve.js';
import {ObcValveHandle} from '../automation-button/valve-handle.js';
import {
  AutomationButtonHandlePosition,
  AutomationButtonHandleSize,
} from '../automation-button/automation-button.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

async function mount(configure: (el: ObcAnalogValve) => void) {
  const el = document.createElement('obc-analog-valve') as ObcAnalogValve;
  configure(el);
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return el;
}

interface ButtonView {
  handlePosition: AutomationButtonHandlePosition;
  handleSize: AutomationButtonHandleSize;
  querySelector(selectors: string): Element | null;
}

const button = (el: ObcAnalogValve) =>
  el.shadowRoot!.querySelector(
    'obc-automation-button'
  ) as unknown as ButtonView;

const stemStroke = (el: ObcAnalogValve) =>
  button(el).querySelector('svg[slot="handle"] path')?.getAttribute('stroke');

describe('obc-analog-valve handle', () => {
  it('draws no handle by default', async () => {
    const el = await mount(() => {});
    expect(button(el).handlePosition).toBe(AutomationButtonHandlePosition.none);
    expect(button(el).querySelector('svg[slot="handle"]')).toBeNull();
  });

  it.each([
    [false, false, AutomationButtonHandlePosition.top],
    [false, true, AutomationButtonHandlePosition.bottom],
    [true, false, AutomationButtonHandlePosition.right],
    [true, true, AutomationButtonHandlePosition.left],
  ])(
    'vertical=%s invertHandlePosition=%s puts the handle on the %s side',
    async (vertical, invertHandlePosition, side) => {
      const el = await mount((e) => {
        e.handle = ObcValveHandle.manual;
        e.vertical = vertical;
        e.invertHandlePosition = invertHandlePosition;
      });
      expect(button(el).handlePosition).toBe(side);
      expect(button(el).querySelector('svg[slot="handle"]')).not.toBeNull();
    }
  );

  it('passes the handle size to the button', async () => {
    const el = await mount((e) => {
      e.handle = ObcValveHandle.manual;
      e.handleSize = AutomationButtonHandleSize.small;
    });
    expect(button(el).handleSize).toBe(AutomationButtonHandleSize.small);
  });

  it('paints the handle in the colours of the valve state', async () => {
    const closed = await mount((e) => {
      e.handle = ObcValveHandle.manual;
      e.open = false;
    });
    expect(stemStroke(closed)).toContain('--automation-symbol-off-line-color');

    const open = await mount((e) => {
      e.handle = ObcValveHandle.manual;
      e.open = true;
    });
    expect(stemStroke(open)).toContain('--on-line-color');

    const isStatic = await mount((e) => {
      e.handle = ObcValveHandle.manual;
      e.static = true;
    });
    expect(stemStroke(isStatic)).toContain(
      '--automation-symbol-static-line-color'
    );
  });
});
