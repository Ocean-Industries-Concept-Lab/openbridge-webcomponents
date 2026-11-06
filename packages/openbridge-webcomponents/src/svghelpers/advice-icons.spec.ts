import {describe, it, expect, afterEach} from 'vitest';
import {render, svg} from 'lit';
import {
  ADVICE_GLYPHS,
  adviceGlyph,
  renderAdviceIcon,
  type AdviceGlyph,
} from './advice-icons.js';
import {AdviceCategory, AdviceState, adviceStyle} from './advice.js';
import '../icons/icon-notification-advice.js';
import '../icons/icon-running.js';
import '../icons/icon-running-color-iec.js';
import '../icons/icon-leaf.js';
import '../icons/icon-caution-google.js';
import '../icons/icon-caution-color-iec.js';
import '../icons/icon-warning-google.js';
import '../icons/icon-warning-unacknowledged-iec.js';
import '../icons/icon-alarm.js';
import '../icons/icon-alarm-unacknowledged-iec.js';
import '../icons/icon-info.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

/** The `<path>`s of the icon element's own SVG, as the glyph copies them. */
async function iconPaths(glyph: AdviceGlyph) {
  const el = document.createElement(glyph.source) as HTMLElement & {
    useCssColor: boolean;
    updateComplete: Promise<unknown>;
  };
  el.useCssColor = !!glyph.useCssColor;
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  return [...el.shadowRoot!.querySelectorAll('path')].map((p) => ({
    d: p.getAttribute('d'),
    evenOdd: p.getAttribute('fill-rule') === 'evenodd',
    fill: p.style.fill || p.getAttribute('fill') || undefined,
    stroke: p.style.stroke || p.getAttribute('stroke') || undefined,
  }));
}

const glyphs = Object.values(AdviceCategory).flatMap((category) => [
  [`${category} at rest`, ADVICE_GLYPHS[category].rest] as const,
  [`${category} triggered`, ADVICE_GLYPHS[category].triggered] as const,
]);

describe('advice glyphs copy the icon set', () => {
  it.each(glyphs)('%s', async (_name, glyph) => {
    const paths = await iconPaths(glyph);
    expect(paths.length).toBe(glyph.paths.length);
    paths.forEach((p, i) => {
      const g = glyph.paths[i];
      expect(p.d).toBe(g.d);
      expect(p.evenOdd).toBe(!!g.evenOdd);
      // The outline icons paint `currentColor`; the glyph takes the icon colour there.
      expect(p.fill ?? 'none').toBe(
        g.fill === 'color' ? 'currentColor' : g.fill
      );
      expect(p.stroke).toBe(g.stroke);
    });
  });
});

describe('adviceGlyph', () => {
  it('switches an alert category to its IEC icon while triggered, and nothing else', () => {
    expect(
      adviceGlyph(AdviceCategory.caution, AdviceState.enabled).source
    ).toBe('obi-caution-google');
    expect(
      adviceGlyph(AdviceCategory.caution, AdviceState.triggered).source
    ).toBe('obi-caution-color-iec');
    expect(
      adviceGlyph(AdviceCategory.optimal, AdviceState.triggered).source
    ).toBe('obi-notification-advice');
    expect(
      adviceGlyph(AdviceCategory.exclusion, AdviceState.triggered).source
    ).toBe('obi-info');
  });
});

describe('renderAdviceIcon', () => {
  const mount = (template: ReturnType<typeof svg>) => {
    const host = document.createElement('div');
    host.innerHTML = '<svg viewBox="0 0 100 100"></svg>';
    document.body.appendChild(host);
    mounted.push(host);
    render(template, host.querySelector('svg')!);
    return host.querySelector('g.advice-icon')!;
  };

  it('centres the 24-unit glyph on the point and scales it to the size', () => {
    const g = mount(
      renderAdviceIcon({
        category: AdviceCategory.eco,
        state: AdviceState.enabled,
        x: 50,
        y: 30,
        size: 16,
      })
    );
    expect(g.getAttribute('transform')).toBe(
      'translate(42 22) scale(0.6666666666666666)'
    );
    expect(g.querySelector('path')!.getAttribute('fill')).toBe(
      adviceStyle(AdviceCategory.eco, AdviceState.enabled).iconColor
    );
  });

  it('paints a triggered go-to glyph in the band colour and an IEC glyph in its own tokens', () => {
    const eco = mount(
      renderAdviceIcon({
        category: AdviceCategory.eco,
        state: AdviceState.triggered,
        x: 0,
        y: 0,
      })
    );
    expect(eco.querySelector('path')!.getAttribute('fill')).toBe(
      'var(--base-mint-500)'
    );
    const alarm = mount(
      renderAdviceIcon({
        category: AdviceCategory.alarm,
        state: AdviceState.triggered,
        x: 0,
        y: 0,
      })
    );
    const [triangle] = alarm.querySelectorAll('path');
    expect(triangle.getAttribute('fill')).toBe('var(--alert-alarm-color)');
    expect(triangle.getAttribute('stroke')).toBe(
      'var(--alert-alarm-outline-color)'
    );
  });
});
