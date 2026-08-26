import {describe, expect, it} from 'vitest';
import {computeZoomToFitArcFrame} from './arc-frame.js';
import {
  computeRadialFrame,
  estimateLabelWidthPx,
  LABEL_RESERVE_MAX_FRACTION,
} from './radial-frame.js';

const ZOOM_AREAS = [
  {
    startAngle: -135,
    endAngle: 135,
    roundInsideCut: true,
    roundOutsideCut: true,
  },
];

describe('computeRadialFrame — back-compat identity', () => {
  it('no labels reproduces the legacy (176+padding)*2 box', () => {
    const f = computeRadialFrame({basePadding: 48});
    expect(f.viewBox).toBe('-224 -224 448 448');
    expect(f.width).toBe(448);
    expect(f.height).toBe(448);
    expect(f.x).toBe(-224);
    expect(f.y).toBe(-224);
    expect(f.radiusOffset).toBe(0);
    expect(f.labelReserve).toBe(0);
    expect(f.labelsHidden).toBe(false);
    expect(f.hostWidthPx).toBeUndefined();
  });

  it('no labels + clips reproduces the legacy clipped box (rudder: top 40%)', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      clips: {top: 40, bottom: 0, left: 0, right: 0},
    });
    expect(f.x).toBe(-224);
    expect(f.y).toBeCloseTo(-44.8);
    expect(f.width).toBe(448);
    expect(f.height).toBeCloseTo(268.8);
  });

  it('labels with a generous container never shrink below the base box', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 14,
      containerPx: {width: 2000, height: 2000},
    });
    expect(f.width).toBe(448);
    expect(f.labelReserve).toBe(0);
    expect(f.labelsHidden).toBe(false);
  });
});

describe('computeRadialFrame — mode (a) label reserve', () => {
  it('grows the box for 4-digit labels in a shrunk container', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 28,
      containerPx: {width: 200, height: 200},
    });
    // P = 9 + 28 + 4 = 41; side = 374 / (1 - 82/200)
    expect(f.width).toBeCloseTo(374 / (1 - 82 / 200), 6);
    expect(f.width).toBeGreaterThan(448);
    expect(f.labelsHidden).toBe(false);
    expect(f.labelReserve).toBeCloseTo((f.width - 448) / 2, 6);
    // The label's far edge must fit inside the box at the implied scale.
    const scale = 200 / f.width;
    expect(f.scale).toBeCloseTo(scale, 6);
    expect(187 + 41 / scale).toBeLessThanOrEqual(f.width / 2 + 1e-6);
  });

  it('hides labels past the reserve cap instead of growing unboundedly', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 28,
      containerPx: {width: 120, height: 120},
    });
    expect((2 * 41) / 120).toBeGreaterThan(LABEL_RESERVE_MAX_FRACTION);
    expect(f.labelsHidden).toBe(true);
    expect(f.labelReserve).toBe(0);
    expect(f.width).toBe(448);
  });

  it('uses the binding axis with clips (180° sector in a short wide cell)', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: {top: 0, bottom: 44, left: 0, right: 0},
      containerPx: {width: 600, height: 120},
    });
    // fy = 0.56 → Ceff = min(600/1, 120/0.56); P = 34
    const ceff = 120 / 0.56;
    const side = 374 / (1 - 68 / ceff);
    expect(f.width).toBeCloseTo(side, 6);
    expect(f.height).toBeCloseTo(side * 0.56, 6);
  });

  it('falls back to scale 1 for a zero-size container (first paint)', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 28,
      containerPx: {width: 0, height: 0},
    });
    expect(Number.isFinite(f.width)).toBe(true);
    expect(f.labelsHidden).toBe(false);
    expect(f.width).toBeCloseTo(2 * (187 + 41), 6);
  });
});

describe('computeRadialFrame — labelDropPx clip adjustment', () => {
  const SECTOR_180 = {top: 0, bottom: 44, left: 0, right: 0};

  it('leaves the requested clips untouched when the drop already fits', () => {
    const plain = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: SECTOR_180,
      containerPx: {width: 400, height: 224},
    });
    const withDrop = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: SECTOR_180,
      labelDropPx: 21,
      containerPx: {width: 400, height: 224},
    });
    expect(withDrop.viewBox).toBe(plain.viewBox);
    expect(withDrop.clipsAdjusted).toBe(false);
    expect(plain.clipsAdjusted).toBe(false);
  });

  it('lowers the bottom clip when a pinned face would cut the end labels', () => {
    const plain = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: SECTOR_180,
      faceDiameter: 180,
    });
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: SECTOR_180,
      labelDropPx: 21,
      faceDiameter: 180,
    });
    expect(f.clipsAdjusted).toBe(true);
    expect(f.height).toBeGreaterThan(plain.height);
    // The box bottom must sit at least labelDropPx/scale below the center.
    const bottomExtentUnits = f.y + f.height;
    expect(bottomExtentUnits).toBeGreaterThanOrEqual(21 / f.scale - 1e-6);
    // The width (and thus the ring scale) is not affected.
    expect(f.width).toBeCloseTo(plain.width, 6);
    expect(f.scale).toBeCloseTo(plain.scale, 6);
  });

  it('adjusts symmetrically for a top clip (rudder-style windows)', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      clips: {top: 47, bottom: 0, left: 0, right: 0},
      labelDropPx: 21,
      faceDiameter: 180,
    });
    expect(f.clipsAdjusted).toBe(true);
    // The box top must sit at least labelDropPx/scale above the center.
    expect(-f.y).toBeGreaterThanOrEqual(21 / f.scale - 1e-6);
  });

  it('does nothing without clips or when labels are hidden', () => {
    const noClips = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 21,
      labelDropPx: 21,
      containerPx: {width: 400, height: 400},
    });
    expect(noClips.clipsAdjusted).toBe(false);

    const hidden = computeRadialFrame({
      basePadding: 48,
      labelWidthPx: 28,
      clips: SECTOR_180,
      labelDropPx: 21,
      containerPx: {width: 100, height: 56},
    });
    expect(hidden.labelsHidden).toBe(true);
    expect(hidden.clipsAdjusted).toBe(false);
    expect(hidden.height).toBeCloseTo(hidden.width * 0.56, 6);
  });
});

describe('computeRadialFrame — mode (b) faceDiameter', () => {
  it('pins the scale and emits fixed host px', () => {
    const f = computeRadialFrame({basePadding: 48, faceDiameter: 368});
    expect(f.scale).toBe(1);
    expect(f.hostWidthPx).toBeCloseTo(448);
    expect(f.hostHeightPx).toBeCloseTo(448);
  });

  it('same faceDiameter, wider labels → same ring scale, wider box', () => {
    const a = computeRadialFrame({
      basePadding: 48,
      faceDiameter: 200,
      labelWidthPx: 14,
    });
    const b = computeRadialFrame({
      basePadding: 48,
      faceDiameter: 200,
      labelWidthPx: 28,
    });
    expect(a.scale).toBeCloseTo(b.scale, 6);
    expect(b.hostWidthPx!).toBeGreaterThan(a.hostWidthPx!);
  });

  it('treats zero/negative/non-finite faceDiameter as unset (no host pin)', () => {
    for (const bad of [0, -100, NaN, Infinity]) {
      const f = computeRadialFrame({
        basePadding: 48,
        faceDiameter: bad,
        containerPx: {width: 300, height: 300},
      });
      expect(f.hostWidthPx).toBeUndefined();
      expect(f.hostHeightPx).toBeUndefined();
      expect(f.viewBox).toBe('-224 -224 448 448');
    }
  });

  it('treats an unusable faceDiameter as unset on the zoom path too', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      faceDiameter: NaN,
      zoomToFitArc: true,
      areas: ZOOM_AREAS,
      innerRadius: 112,
      containerPx: {width: 300, height: 300},
    });
    expect(f.hostWidthPx).toBeUndefined();
    expect(f.hostHeightPx).toBeUndefined();
  });

  it('faceDiameter + 180° clips yields a shorter host box at the same scale', () => {
    const full = computeRadialFrame({basePadding: 48, faceDiameter: 200});
    const half = computeRadialFrame({
      basePadding: 48,
      faceDiameter: 200,
      clips: {top: 0, bottom: 44, left: 0, right: 0},
    });
    expect(half.scale).toBeCloseTo(full.scale, 6);
    expect(half.hostWidthPx!).toBeCloseTo(full.hostWidthPx!, 6);
    expect(half.hostHeightPx!).toBeCloseTo(full.hostHeightPx! * 0.56, 6);
  });
});

describe('computeRadialFrame — zoom path', () => {
  it('matches computeZoomToFitArcFrame exactly when no labels', () => {
    const f = computeRadialFrame({
      basePadding: 48,
      zoomToFitArc: true,
      areas: ZOOM_AREAS,
      innerRadius: 112,
    });
    const direct = computeZoomToFitArcFrame({
      areas: ZOOM_AREAS,
      outerRadius: 184,
      innerRadius: 112,
      extension: 48,
      targetSize: 448,
    });
    expect(f.viewBox).toBe(direct.viewBox);
    expect(f.width).toBe(direct.width);
    expect(f.height).toBe(direct.height);
    expect(f.radiusOffset).toBe(direct.radiusOffset);
    expect(f.labelReserve).toBe(0);
  });

  it('adds a label reserve via the extension in a small container', () => {
    const plain = computeRadialFrame({
      basePadding: 48,
      zoomToFitArc: true,
      areas: ZOOM_AREAS,
      innerRadius: 112,
    });
    const labeled = computeRadialFrame({
      basePadding: 48,
      zoomToFitArc: true,
      areas: ZOOM_AREAS,
      innerRadius: 112,
      labelWidthPx: 28,
      containerPx: {width: 300, height: 300},
    });
    expect(labeled.labelsHidden).toBe(false);
    expect(labeled.labelReserve).toBeGreaterThan(0);
    expect(labeled.width).toBeGreaterThan(plain.width);
  });
});

describe('estimateLabelWidthPx', () => {
  it('is maxChars * 7', () => {
    expect(estimateLabelWidthPx(['0', '3600', undefined])).toBe(28);
    expect(estimateLabelWidthPx(['5'])).toBe(7);
  });

  it('is 0 for no texts', () => {
    expect(estimateLabelWidthPx([undefined])).toBe(0);
    expect(estimateLabelWidthPx([])).toBe(0);
  });
});
