import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './readout-list-item.js';
import {
  ReadoutListItemSize,
  type ObcReadoutListItem,
} from './readout-list-item.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameType,
  type AlertFrameConfig,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

const ALARM: AlertFrameConfig = {
  status: AlertType.Alarm,
  mode: ObcAlertFrameMode.ackedActive,
  type: ObcAlertFrameType.Regular,
};

/**
 * The value alert frame sits on the value reading's own box, as the design
 * file pins its frame to the readout block (Figma 46282:102156): the stroke
 * straddles the row edge, so two touching rows share one stroke instead of
 * drawing two that cross. Only the inline padding keeps the stroke off the
 * digits.
 */
describe('obc-readout-list-item value alert frame', () => {
  const row = () => html`
    <obc-readout-list-item
      .size=${ReadoutListItemSize.small}
      .value=${230}
      unit="V"
      .valueOptions=${{alert: ALARM}}
    ></obc-readout-list-item>
  `;

  async function mount(count: number): Promise<ObcReadoutListItem[]> {
    const screen = render(
      html`<div style="display: inline-flex; flex-direction: column">
        ${Array.from({length: count}, row)}
      </div>`
    );
    const items = Array.from(
      screen.container.querySelectorAll<ObcReadoutListItem>(
        'obc-readout-list-item'
      )
    );
    await Promise.all(items.map((item) => item.updateComplete));
    return items;
  }

  /** The alert frame's box: where `obc-alert-frame` centres its stroke. */
  function frameBox(item: ObcReadoutListItem): DOMRect {
    const frame = item.shadowRoot!.querySelector('obc-alert-frame')!;
    return frame.shadowRoot!.querySelector('.wrapper')!.getBoundingClientRect();
  }

  it('shares the reading box edges vertically and pads 4px inline', async () => {
    const [item] = await mount(1);
    const reading = item
      .shadowRoot!.querySelector('.value-reading')!
      .getBoundingClientRect();
    const frame = frameBox(item);

    expect(frame.top).toBeCloseTo(reading.top, 2);
    expect(frame.bottom).toBeCloseTo(reading.bottom, 2);
    expect(frame.left).toBeCloseTo(reading.left - 4, 2);
    expect(frame.right).toBeCloseTo(reading.right + 4, 2);
  });

  it('is as tall as the small row, so stacked rows share one stroke', async () => {
    const items = await mount(3);
    for (let i = 0; i < items.length; i++) {
      const host = items[i].getBoundingClientRect();
      const frame = frameBox(items[i]);
      expect(frame.top).toBeCloseTo(host.top, 2);
      expect(frame.bottom).toBeCloseTo(host.bottom, 2);
      if (i > 0) {
        expect(frame.top).toBeCloseTo(frameBox(items[i - 1]).bottom, 2);
      }
    }
  });
});
