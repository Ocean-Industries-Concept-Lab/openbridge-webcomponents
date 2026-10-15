import {afterEach, describe, it, expect} from 'vitest';
import {ObcPalette, currentPalette} from '../../charthelpers/theme.js';
import {VesselImage, vesselArt, vesselImageSrcFor} from './vessel.js';

describe('vesselImageSrcFor', () => {
  const all = {bright: 'b', day: 'd', dusk: 'k', night: 'n'};

  it('uses the URL for the current palette when there is one', () => {
    for (const palette of Object.values(ObcPalette)) {
      expect(vesselImageSrcFor(all, palette)).toBe(all[palette]);
    }
  });

  it.each([
    [ObcPalette.bright, {dusk: 'k', night: 'n'}, 'k'],
    [ObcPalette.bright, {night: 'n'}, 'n'],
    [ObcPalette.day, {bright: 'b', dusk: 'k'}, 'b'],
    [ObcPalette.day, {night: 'n', dusk: 'k'}, 'k'],
    [ObcPalette.dusk, {night: 'n', day: 'd'}, 'n'],
    [ObcPalette.dusk, {day: 'd', bright: 'b'}, 'd'],
    [ObcPalette.night, {dusk: 'k', day: 'd'}, 'k'],
    [ObcPalette.night, {bright: 'b'}, 'b'],
  ])('%s falls back through its order (%o → %s)', (palette, src, expected) => {
    expect(vesselImageSrcFor(src, palette)).toBe(expected);
  });

  it('returns undefined when no palette has a URL', () => {
    expect(vesselImageSrcFor({}, ObcPalette.day)).toBeUndefined();
  });
});

describe('vesselArt', () => {
  it('keeps the built-in image when no custom URL is given', () => {
    expect(vesselArt(VesselImage.psvTop)).toEqual({
      vesselImage: VesselImage.psvTop,
    });
    expect(vesselArt(VesselImage.psvTop, {day: ''})).toEqual({
      vesselImage: VesselImage.psvTop,
    });
  });

  it('switches to the custom image when any palette has a URL', () => {
    expect(vesselArt(VesselImage.psvTop, {night: 'n'})).toEqual({
      customImage: {night: 'n'},
    });
  });
});

describe('currentPalette', () => {
  afterEach(() => document.documentElement.removeAttribute('data-obc-theme'));

  it('reads data-obc-theme and defaults to day', () => {
    document.documentElement.setAttribute('data-obc-theme', 'night');
    expect(currentPalette()).toBe(ObcPalette.night);
    document.documentElement.removeAttribute('data-obc-theme');
    expect(currentPalette()).toBe(ObcPalette.day);
    document.documentElement.setAttribute('data-obc-theme', 'neon');
    expect(currentPalette()).toBe(ObcPalette.day);
  });
});
