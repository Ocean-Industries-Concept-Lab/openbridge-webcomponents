import {describe, it, expect} from 'vitest';
import {initialsFromName} from './user-button.js';

describe('initialsFromName', () => {
  it('takes the first letter of the first and last word', () => {
    expect(initialsFromName('Ola Nordmann')).toBe('ON');
    expect(initialsFromName('Kari Anne Nordmann')).toBe('KN');
  });

  it('returns one letter for a single word', () => {
    expect(initialsFromName('Ola')).toBe('O');
    expect(initialsFromName('O')).toBe('O');
  });

  it('returns an empty string for an empty or blank name', () => {
    expect(initialsFromName('')).toBe('');
    expect(initialsFromName('   ')).toBe('');
  });

  it('ignores surrounding and repeated whitespace', () => {
    expect(initialsFromName('  Ola   Nordmann  ')).toBe('ON');
  });

  it('keeps the original case', () => {
    expect(initialsFromName('ola nordmann')).toBe('on');
  });
});
