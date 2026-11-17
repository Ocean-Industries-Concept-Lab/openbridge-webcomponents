import {describe, it, expect} from 'vitest';
import {render, svg, type SVGTemplateResult, nothing} from 'lit';
import {
  renderAdvice,
  renderAdviceArea,
  AdviceType,
  AdviceState,
} from './advice.js';
import {resolveAdvices} from '../../svghelpers/advice.js';

function toSvg(template: SVGTemplateResult | typeof nothing): string {
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  render(svg`${template}`, host);
  return host.innerHTML;
}

describe('renderAdvice (radial)', () => {
  it('colours a triggered caution band in the alert tokens and cuts it square', () => {
    const out = toSvg(
      renderAdvice(
        {
          minAngle: 20,
          maxAngle: 60,
          type: AdviceType.caution,
          state: AdviceState.triggered,
        },
        0,
        'm1'
      )
    );
    expect(out).toContain('var(--alert-caution-color)');
    expect(out).toContain('var(--on-caution-color)');
    expect(out).toContain('A 2 2 0 0 0');
    expect(out).not.toContain('A 4 4 0 0 0');
    expect(out).toContain('mask="url(#m1)"');
  });

  it('keeps the rounded caps on a go-to band and honours the hidden start tick', () => {
    const out = toSvg(
      renderAdvice(
        {min: 20, max: 60, category: 'optimal', hideMinTickmark: true},
        0,
        'm2'
      )
    );
    expect(out).toContain('A 4 4 0 0 0');
    expect(out).not.toContain('mask=');
    expect((out.match(/<line /g) ?? []).length).toBe(1);
  });

  it('reads a legacy entry with the regular state', () => {
    const out = toSvg(
      renderAdvice(
        {
          minAngle: 0,
          maxAngle: 40,
          type: AdviceType.advice,
          state: AdviceState.regular,
        },
        0,
        'm3'
      )
    );
    expect(out).toContain('var(--instrument-tick-mark-secondary-color)');
  });

  it('cuts both bands flat where they chain', () => {
    const [a, b] = resolveAdvices(
      [
        {min: 60, max: 80, category: 'warning'},
        {min: 80, max: 100, category: 'alarm'},
      ],
      []
    );
    const outA = toSvg(renderAdvice(a, 0, 'm4'));
    const outB = toSvg(renderAdvice(b, 0, 'm5'));
    expect((outA.match(/A 2 2 0 0 0/g) ?? []).length).toBe(2);
    expect((outB.match(/A 2 2 0 0 0/g) ?? []).length).toBe(2);
  });

  it('draws a point as a dot or a thick tick', () => {
    expect(
      toSvg(renderAdvice({value: 45, category: 'optimal'}, 0, 'm6'))
    ).toContain('<circle');
    const tick = toSvg(
      renderAdvice(
        {value: 45, category: 'caution', state: 'triggered'},
        0,
        'm7'
      )
    );
    expect(tick).toContain('<rect');
    expect(tick).toContain('var(--instrument-tick-mark-primary-color)');
    expect(tick).not.toContain('var(--alert-caution-color)');
  });
});

describe('renderAdviceArea (radial)', () => {
  it('fills a triggered caution wedge with the tint and dashes its outline', () => {
    const out = toSvg(
      renderAdviceArea(
        {min: 20, max: 60, category: 'caution', state: 'triggered'},
        0,
        'p1'
      )
    );
    expect(out).toContain('var(--alert-caution-tint-color)');
    expect(out).toContain('stroke-dasharray="4 4"');
    expect(out).toContain('M 0 0 L');
  });

  it('hatches an exclusion wedge with the hairline', () => {
    const out = toSvg(
      renderAdviceArea({min: 320, max: 350, category: 'exclusion'}, 0, 'p3')
    );
    expect(out).toContain('id="p3"');
    expect(out).toContain('stroke-width="0.5"');
    expect(out).toContain('fill="url(#p3)"');
  });

  it('lays the alarm dot lattice over the wedge', () => {
    const out = toSvg(
      renderAdviceArea({min: 20, max: 60, category: 'alarm'}, 0, 'p2')
    );
    expect(out).toContain('<pattern');
    expect(out).toContain('id="p2"');
    expect(out).toContain('fill="url(#p2)"');
  });
});
