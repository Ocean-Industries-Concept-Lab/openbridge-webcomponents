import {afterEach, describe, expect, it, vi} from 'vitest';
import './readout.js';
import {ReadoutDirection, ReadoutSize, type ObcReadout} from './readout.js';

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
