import {describe, it, expect} from 'vitest';
import {resolveWindArrowPlacement, WindVariant} from './wind.js';

describe('resolveWindArrowPlacement', () => {
  it('matches the OpenBridge 6.1 design values (effective tip = radius × scale)', () => {
    expect(resolveWindArrowPlacement(WindVariant.large)).toEqual({
      windSymbolRadius: 119,
      scaleWindIcon: 1.0,
    });
    expect(resolveWindArrowPlacement(WindVariant.medium)).toEqual({
      windSymbolRadius: 62,
      scaleWindIcon: 1.5,
    });
    expect(resolveWindArrowPlacement(WindVariant.small)).toEqual({
      windSymbolRadius: 3,
      scaleWindIcon: 2.667,
    });
  });
});
