import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {page, userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './transmitter-stack.js';
import type {
  ObcTransmitterStack,
  TransmitterStackValue,
  TransmitterStackValueClickDetail,
} from './transmitter-stack.js';
import type {ObcTransmitterButton} from '../transmitter-button/transmitter-button.js';

async function setup(values: TransmitterStackValue[]) {
  const screen = render(
    html`<obc-transmitter-stack .values=${values}>
      <span slot="temperature" id="icon"></span>
    </obc-transmitter-stack>`
  );
  const el = screen.container.querySelector(
    'obc-transmitter-stack'
  ) as ObcTransmitterStack;
  await el.updateComplete;
  return el;
}

function segments(el: ObcTransmitterStack): ObcTransmitterButton[] {
  return Array.from(el.shadowRoot!.querySelectorAll('obc-transmitter-button'));
}

function idTags(el: ObcTransmitterStack): string[] {
  return Array.from(el.shadowRoot!.querySelectorAll('.id-tag')).map(
    (tag) => tag.textContent?.trim() ?? ''
  );
}

describe('obc-transmitter-stack', () => {
  it('renders one segment per value, in order', async () => {
    const el = await setup([
      {value: 12.3, unit: '°C'},
      {value: 1.23, unit: 'm', fractionDigits: 2},
    ]);

    expect(
      segments(el).map((s) => [s.value, s.unit, s.fractionDigits])
    ).toEqual([
      [12.3, '°C', 1],
      [1.23, 'm', 2],
    ]);
  });

  it('defaults an omitted digit key but forwards one that never arrived', async () => {
    const el = await setup([
      {value: 1},
      {value: 1, fractionDigits: undefined, maxDigits: NaN},
    ]);
    const [omitted, missing] = segments(el);

    expect([omitted.fractionDigits, omitted.maxDigits]).toEqual([1, 0]);
    expect(missing.fractionDigits).toBeNaN();
    expect(missing.maxDigits).toBeNaN();
  });

  it('forwards the named icon slot into the segment', async () => {
    const el = await setup([
      {value: 1, iconSlotName: 'temperature'},
      {value: 2},
    ]);
    const [withIcon, withoutIcon] = segments(el);
    const forwarded = withIcon.querySelector('slot') as HTMLSlotElement;

    expect(withIcon.hasIcon).toBe(true);
    expect(withoutIcon.hasIcon).toBe(false);
    expect(forwarded.name).toBe('temperature');
    expect(forwarded.getAttribute('slot')).toBe('icon');
    expect(forwarded.assignedElements()[0]?.id).toBe('icon');
  });

  it('fires value-click with the pressed segment', async () => {
    const values = [{value: 1}, {value: 2}];
    const el = await setup(values);
    const details: TransmitterStackValueClickDetail[] = [];
    el.addEventListener('value-click', (event) =>
      details.push(
        (event as CustomEvent<TransmitterStackValueClickDetail>).detail
      )
    );
    const second = segments(el)[1];
    await second.updateComplete;

    second.shadowRoot!.querySelector('button')!.click();

    expect(details).toEqual([{index: 1, value: values[1]}]);
  });

  it('reports the rendered value when values change before the next render', async () => {
    const rendered = [{value: 1}, {value: 2}];
    const el = await setup(rendered);
    const details: TransmitterStackValueClickDetail[] = [];
    el.addEventListener('value-click', (event) =>
      details.push(
        (event as CustomEvent<TransmitterStackValueClickDetail>).detail
      )
    );
    const second = segments(el)[1];
    await second.updateComplete;

    el.values = [{value: 3}, {value: 4}];
    second.shadowRoot!.querySelector('button')!.click();

    expect(details).toEqual([{index: 1, value: rendered[1]}]);
  });

  it('reaches each segment with Tab and activates it with Enter and Space', async () => {
    const el = await setup([{value: 1}, {value: 2}]);
    const indexes: number[] = [];
    el.addEventListener('value-click', (event) =>
      indexes.push(
        (event as CustomEvent<TransmitterStackValueClickDetail>).detail.index
      )
    );
    await Promise.all(segments(el).map((segment) => segment.updateComplete));

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await userEvent.tab();
    await userEvent.keyboard(' ');

    expect(indexes).toEqual([0, 1]);
  });

  it('names each segment by its reading and id tag, and hides the visible tag', async () => {
    const el = await setup([
      {value: 1, unit: 'm', idTag: '#0001'},
      {value: 1, unit: 'm', idTag: '#0002'},
    ]);
    await Promise.all(segments(el).map((segment) => segment.updateComplete));

    await expect
      .element(page.getByRole('button', {name: /#0002/}))
      .toBeInTheDocument();
    expect(
      Array.from(el.shadowRoot!.querySelectorAll('.id-tag')).map((tag) =>
        tag.getAttribute('aria-hidden')
      )
    ).toEqual(['true', 'true']);
  });

  it('renders nothing, leader line included, without values', async () => {
    const el = await setup([]);

    expect(el.shadowRoot!.querySelector('.transmitter')).toBeNull();
  });

  it('gives every segment the width of the widest reading', async () => {
    const el = await setup([
      {value: 1, unit: 'm'},
      {value: 12345.6, unit: 'mVs', maxDigits: 5},
    ]);
    await Promise.all(segments(el).map((segment) => segment.updateComplete));
    const [narrow, wide] = segments(el).map(
      (segment) => segment.getBoundingClientRect().width
    );

    expect(narrow).toBeCloseTo(wide, 0);
  });

  it('keeps each segment at or above the 24 px pointer-target floor', async () => {
    const el = await setup([{value: 1, unit: 'm'}]);
    const [segment] = segments(el);
    await segment.updateComplete;
    const target = segment
      .shadowRoot!.querySelector('button')!
      .getBoundingClientRect();

    expect(target.height).toBeGreaterThanOrEqual(24);
    expect(target.width).toBeGreaterThanOrEqual(24);
  });

  it('renders an id-tag row in every cell once any value has one', async () => {
    expect(idTags(await setup([{value: 1, idTag: '#1'}, {value: 2}]))).toEqual([
      '#1',
      '',
    ]);
    expect(idTags(await setup([{value: 1}, {value: 2}]))).toEqual([]);
  });
});
