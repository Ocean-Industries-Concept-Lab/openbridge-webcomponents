import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './rot-linear.js';
import type {ObcRotLinear} from './rot-linear.js';
import type {ObcWatchFlat} from '../watch-flat/watch-flat.js';
import '../../main.css';

describe('obc-rot-linear — scale labels', () => {
  it('sizes its labels once a container hidden at mount is shown', async () => {
    const screen = render(
      html`<div style="display: none; width: 512px; height: 170px">
        <obc-rot-linear .rateOfTurnDegreesPerMinute=${45}></obc-rot-linear>
      </div>`
    );
    const el = screen.container.querySelector('obc-rot-linear') as ObcRotLinear;
    await el.updateComplete;
    const strip = el.shadowRoot!.querySelector(
      'obc-watch-flat'
    ) as ObcWatchFlat;
    await strip.updateComplete;

    (el.parentElement as HTMLElement).style.display = 'block';
    for (let i = 0; i < 2; i++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    await strip.updateComplete;

    const label = strip.shadowRoot!.querySelector('text.label')!;
    expect(label.parentElement!.getAttribute('transform')).not.toContain(
      'Infinity'
    );
    // 16px on screen: the strip is 512px wide for 352 user units.
    expect(getComputedStyle(label).fontSize).toBe('11px');
  });
});
