import {describe, it, expect, afterEach} from 'vitest';
import {render, svg} from 'lit';
import {
  ADVICE_GLYPHS,
  adviceGlyph,
  glyphMarkup,
  renderAdviceIcon,
  type AdviceGlyph,
} from './advice-icons.js';
import {AdviceCategory, AdviceState, adviceStyle} from './advice.js';
import '../icons/icon-notification-advice.js';
import '../icons/icon-running.js';
import '../icons/icon-running-color-iec.js';
import '../icons/icon-leaf.js';
import '../icons/icon-ai-simulation.js';
import '../icons/icon-caution-google.js';
import '../icons/icon-caution-color-iec.js';
import '../icons/icon-warning-google.js';
import '../icons/icon-warning-unacknowledged-iec.js';
import '../icons/icon-alarm.js';
import '../icons/icon-alarm-unacknowledged-iec.js';
import '../icons/icon-info.js';

const mounted: HTMLElement[] = [];
afterEach(() => mounted.splice(0).forEach((el) => el.remove()));

/** Both sides through the same serializer: the DOM expands `<path/>` to `<path></path>`. */
const normalize = (markup: string) => {
  const host = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  host.innerHTML = markup;
  return host.innerHTML.replace(/\s+/g, ' ').replace(/> </g, '><').trim();
};

/** The inside of the icon element's own `<svg>`, as the glyph copies it. */
async function iconMarkup(glyph: AdviceGlyph) {
  const el = document.createElement(glyph.source) as HTMLElement & {
    useCssColor: boolean;
    updateComplete: Promise<unknown>;
  };
  el.useCssColor = !!glyph.useCssColor;
  document.body.appendChild(el);
  mounted.push(el);
  await el.updateComplete;
  const root = el.shadowRoot!.querySelector('svg')!;
  return {
    rootFill: root.getAttribute('fill'),
    markup: normalize(root.innerHTML),
  };
}

const glyphs = Object.values(AdviceCategory).flatMap((category) => [
  [`${category} at rest`, ADVICE_GLYPHS[category].rest] as const,
  [`${category} triggered`, ADVICE_GLYPHS[category].triggered] as const,
]);

describe('advice glyphs copy the icon set', () => {
  it.each(glyphs)('%s', async (_name, glyph) => {
    const icon = await iconMarkup(glyph);
    expect(glyph.rootFill).toBe(icon.rootFill);
    expect(normalize(glyph.markup)).toBe(icon.markup);
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

describe('glyphMarkup', () => {
  it('prefixes every id and every reference to one with the instance id', () => {
    const out = glyphMarkup(ADVICE_GLYPHS.alarm.triggered, 'a1');
    expect(out).toContain('id="a1-stroke0_2002_1093"');
    expect(out).toContain('href="#a1-stroke0_2002_1093"');
    expect(out).toContain('mask="url(#a1-stroke1_2002_1093)"');
    expect(out).not.toMatch(/id="stroke/);
  });
});

describe('renderAdviceIcon', () => {
  const mount = (template: ReturnType<typeof svg>) => {
    const host = document.createElement('div');
    host.innerHTML = '<svg viewBox="0 0 100 100"></svg>';
    document.body.appendChild(host);
    mounted.push(host);
    render(template, host.querySelector('svg')!);
    return host.querySelector('g.advice-icon') as SVGGElement;
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
    // The outline glyphs paint currentColor, which the group's colour sets.
    expect(g.style.color).toBe(
      adviceStyle(AdviceCategory.eco, AdviceState.enabled).iconColor
    );
    expect(g.querySelector('path')!.getAttribute('fill')).toBe('currentColor');
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
    expect(eco.style.color).toBe('var(--base-mint-500)');
    const alarm = mount(
      renderAdviceIcon({
        category: AdviceCategory.alarm,
        state: AdviceState.triggered,
        x: 0,
        y: 0,
        id: 'alarm-a',
      })
    );
    expect((alarm.querySelector('use') as SVGUseElement).style.fill).toBe(
      'var(--alert-alarm-color)'
    );
    expect(alarm.querySelector('mask')!.id).toBe('alarm-a-stroke1_2002_1093');
    // The IEC root is fill="none": its stroke-only outline path stays unfilled.
    expect(alarm.getAttribute('fill')).toBe('none');
  });
});
