import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './transmitter.js';
import type {ObcTransmitter} from './transmitter.js';
import type {ObcTransmitterButton} from '../transmitter-button/transmitter-button.js';

describe('obc-transmitter', () => {
  it('keeps a line-less chip at the host edge in a wider container', async () => {
    const screen = render(
      html`<div style="width: 600px">
        <obc-transmitter .showLine=${false} .value=${12.3} unit="m">
        </obc-transmitter>
      </div>`
    );
    const el = screen.container.querySelector(
      'obc-transmitter'
    ) as ObcTransmitter;
    await el.updateComplete;
    const chip = el.shadowRoot!.querySelector('.chip') as ObcTransmitterButton;
    await chip.updateComplete;

    const host = el.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    const box = el
      .shadowRoot!.querySelector('.transmitter')!
      .getBoundingClientRect();

    expect(chipBox.width).toBeGreaterThan(0);
    expect(chipBox.left).toBeCloseTo(host.left, 0);
    expect(box.width).toBeCloseTo(chipBox.width, 0);
  });
});
