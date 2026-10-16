import {afterEach, describe, expect, it, vi} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html, type TemplateResult} from 'lit';
import '../../main.css';
import './readout.js';
import {
  ReadoutDirection,
  ReadoutSize,
  ReadoutStacking,
  type ObcReadout,
} from './readout.js';
import {
  ObcAlertFrameMode,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

/**
 * A horizontal readout given a `size` other than `large` warns once per
 * element: the arrangement exists in the large tier only, so the tier is
 * discarded, and a silent discard is indistinguishable from a bug to a
 * consumer (#1182). A removed `size` attribute arrives as `null` through Lit's
 * String converter and counts as unset. Driven through `willUpdate` on
 * detached elements so no update cycle runs.
 */
describe('obc-readout horizontal size warning', () => {
  type Probe = ObcReadout & {
    willUpdate: (changed: Map<string, unknown>) => void;
  };

  const probe = (
    size: ReadoutSize | undefined,
    direction: ReadoutDirection
  ) => {
    const el = document.createElement('obc-readout') as Probe;
    el.size = size;
    el.direction = direction;
    return el;
  };
  const update = (el: Probe) => el.willUpdate(new Map());

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('stays silent for large, vertical and unset sizes', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    update(probe(ReadoutSize.large, ReadoutDirection.horizontal));
    update(probe(ReadoutSize.small, ReadoutDirection.vertical));
    update(probe(undefined, ReadoutDirection.horizontal));
    const removed = probe(ReadoutSize.small, ReadoutDirection.horizontal);
    removed.setAttribute('size', ReadoutSize.small);
    removed.removeAttribute('size');
    update(removed);

    expect(warn).not.toHaveBeenCalled();
  });

  it('warns once per element for a discarded size', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const small = probe(ReadoutSize.small, ReadoutDirection.horizontal);
    update(small);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toMatch(/\[obc-readout\].*size.*horizontal/);
    expect(warn.mock.calls[0][1]).toBe(small);

    update(small);
    expect(warn).toHaveBeenCalledTimes(1);

    update(probe(ReadoutSize.medium, ReadoutDirection.horizontal));
    expect(warn).toHaveBeenCalledTimes(2);
  });
});

/**
 * A readout is exactly as tall as its rows — the padding plus the value
 * cluster and the meta zone. No tier applies the design file's
 * container-min-height token (#1252). Measured over every vertical tier and
 * both stackings: in the large tiers the content already exceeds the token,
 * so a reintroduced minimum would stay invisible there.
 */
describe('obc-readout height', () => {
  const SIZES = [ReadoutSize.small, ReadoutSize.medium, ReadoutSize.large];
  const STACKINGS = [ReadoutStacking.inline, ReadoutStacking.stacked];

  async function mount(template: TemplateResult) {
    const screen = render(template);
    const el = screen.container.querySelector('obc-readout') as ObcReadout;
    await el.updateComplete;
    return el.shadowRoot!.querySelector('.readout') as HTMLElement;
  }

  /** The height a column flex root has when nothing but its rows sizes it. */
  function contentHeight(root: HTMLElement): number {
    const {paddingTop, paddingBottom} = getComputedStyle(root);
    const rows = Array.from(root.children).reduce(
      (sum, row) => sum + row.getBoundingClientRect().height,
      0
    );
    return rows + parseFloat(paddingTop) + parseFloat(paddingBottom);
  }

  for (const size of SIZES) {
    for (const stacking of STACKINGS) {
      it(`hugs its rows: ${size} / ${stacking}`, async () => {
        const root = await mount(
          html`<obc-readout
            .size=${size}
            .stacking=${stacking}
            .value=${123}
            label="SOG"
            unit="kn"
          ></obc-readout>`
        );
        expect(root.getBoundingClientRect().height).toBeCloseTo(
          contentHeight(root),
          0
        );
      });
    }
  }

  it('hugs its rows: small / stacked, meta zone only', async () => {
    const root = await mount(
      html`<obc-readout
        .size=${ReadoutSize.small}
        .stacking=${ReadoutStacking.stacked}
        .hasValue=${false}
        label="Angle"
        unit="DEG"
      ></obc-readout>`
    );
    expect(root.getBoundingClientRect().height).toBeCloseTo(
      contentHeight(root),
      0
    );
  });
});

/**
 * The value alert frame sits on the value reading's own box, as the design
 * file pins its frame to the readout block (Figma 46282:102156): the stroke
 * straddles the reading's edge and only the inline padding keeps it off the
 * digits. Same rule as `obc-readout-list-item`.
 */
describe('obc-readout value alert frame', () => {
  it('shares the reading box edges vertically and pads 4px inline', async () => {
    const screen = render(
      html`<obc-readout
        .size=${ReadoutSize.small}
        .value=${230}
        label="Voltage"
        unit="V"
        .valueOptions=${{
          alert: {
            status: AlertType.Alarm,
            mode: ObcAlertFrameMode.ackedActive,
            type: ObcAlertFrameType.Regular,
          },
        }}
      ></obc-readout>`
    );
    const el = screen.container.querySelector('obc-readout') as ObcReadout;
    await el.updateComplete;
    const reading = el
      .shadowRoot!.querySelector('.value-reading')!
      .getBoundingClientRect();
    const frame = el
      .shadowRoot!.querySelector('obc-alert-frame')!
      .shadowRoot!.querySelector('.wrapper')!
      .getBoundingClientRect();

    expect(frame.top).toBeCloseTo(reading.top, 2);
    expect(frame.bottom).toBeCloseTo(reading.bottom, 2);
    expect(frame.left).toBeCloseTo(reading.left - 4, 2);
    expect(frame.right).toBeCloseTo(reading.right + 4, 2);
  });
});
