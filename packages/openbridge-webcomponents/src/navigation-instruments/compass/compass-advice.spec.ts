import {describe, it, expect} from 'vitest';
import {html} from 'lit';
import {render} from 'vitest-browser-lit';
import './compass.js';
import type {ObcCompass} from './compass.js';
import {AdviceType} from '../watch/advice.js';

describe('obc-compass advices', () => {
  async function mount(heading: number, advices: ObcCompass['headingAdvices']) {
    const screen = render(
      html`<obc-compass
        .heading=${heading}
        .headingAdvices=${advices}
      ></obc-compass>`
    );
    const el = screen.container.querySelector('obc-compass') as ObcCompass;
    await el.updateComplete;
    const watch = el.shadowRoot!.querySelector('obc-watch')!;
    await (watch as unknown as {updateComplete: Promise<boolean>})
      .updateComplete;
    return watch.shadowRoot!.innerHTML;
  }

  it('triggers a legacy band across north when the heading is inside it', async () => {
    const out = await mount(0, [
      {minAngle: 350, maxAngle: 10, type: AdviceType.caution, hinted: true},
    ]);
    expect(out).toContain('var(--alert-caution-color)');
  });

  it('leaves the band hinted when the heading is outside it', async () => {
    const out = await mount(90, [
      {minAngle: 350, maxAngle: 10, type: AdviceType.caution, hinted: true},
    ]);
    expect(out).not.toContain('var(--alert-caution-color)');
    expect(out).toContain('var(--instrument-tick-mark-tertiary-color)');
  });

  it('accepts the shared shape on advices', async () => {
    const screen = render(
      html`<obc-compass
        .heading=${45}
        .advices=${[{min: 40, max: 50, category: 'optimal'}]}
      ></obc-compass>`
    );
    const el = screen.container.querySelector('obc-compass') as ObcCompass;
    await el.updateComplete;
    const watch = el.shadowRoot!.querySelector('obc-watch')!;
    await (watch as unknown as {updateComplete: Promise<boolean>})
      .updateComplete;
    expect(watch.shadowRoot!.innerHTML).toContain(
      'var(--instrument-enhanced-secondary-color)'
    );
  });
});
