import {describe, expect, it} from 'vitest';
import {fenceState} from './markdown.js';

describe('fenceState', () => {
  it('closes only on the opening character, at least as long', () => {
    const f = fenceState();
    expect(f.update('```md')).toBe(true);
    expect(f.update('```~~~')).toBe(false);
    expect(f.inFence).toBe(true);
    expect(f.update('~~~')).toBe(false);
    expect(f.update('``')).toBe(false);
    expect(f.update('````')).toBe(true);
    expect(f.inFence).toBe(false);
  });

  it('keeps a shorter fence of the same character inside', () => {
    const f = fenceState();
    f.update('````');
    expect(f.update('```')).toBe(false);
    expect(f.inFence).toBe(true);
  });
});
