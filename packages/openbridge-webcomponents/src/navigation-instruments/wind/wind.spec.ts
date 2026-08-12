import {describe, it, expect} from 'vitest';
import {resolveWindArrowPlacement, WindVariant} from './wind.js';

describe('resolveWindArrowPlacement', () => {
  it('matches the OpenBridge 6.1 design values (effective tip = radius × scale)', () => {
    // Large: 48-unit icon box fills the double-face track band (112–160);
    // tip anchor = 112 + inward overhang 3.1094 of the 2× glyph.
    expect(resolveWindArrowPlacement(WindVariant.large)).toEqual({
      windSymbolRadius: 112 + (24 - 22.4453) * 2,
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
