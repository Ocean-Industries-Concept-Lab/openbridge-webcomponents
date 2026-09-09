import {describe, expect, it} from 'vitest';
import './readout-block.js';
import type {ObcReadoutBlock} from './readout-block.js';

/**
 * Validation must run on every update, never gated on `changed`.
 *
 * When `willUpdate` throws, Lit's `performUpdate` catch calls
 * `__markUpdated()`, which clears the changed-properties map. A check gated on
 * `changed.has('value')` then skips on the NEXT update — driven by any other
 * property, e.g. `obc-readout-list.align()` writing the reservers — and the
 * invalid value renders as a plain dash. Loud once, then silent forever.
 *
 * An EMPTY changed map is exactly what Lit leaves behind after a throw, so
 * `willUpdate` is invoked directly with one on a detached element: an
 * unconnected LitElement never starts its update cycle, so the throw cannot
 * escape the scheduler as an unhandled rejection.
 */
describe('obc-readout-block validation', () => {
  type Probe = ObcReadoutBlock & {
    willUpdate: (changed: Map<string, unknown>) => void;
  };

  it('survives an update that touches neither value nor valueType', () => {
    const el = document.createElement('obc-readout-block') as Probe;
    const validateWithNoChanges = () => el.willUpdate(new Map());

    el.value = 'Auto';
    expect(validateWithNoChanges).toThrow(/value must be a number/);

    el.value = 12.4;
    expect(validateWithNoChanges).not.toThrow();

    el.value = null;
    expect(validateWithNoChanges).not.toThrow();
  });
});
