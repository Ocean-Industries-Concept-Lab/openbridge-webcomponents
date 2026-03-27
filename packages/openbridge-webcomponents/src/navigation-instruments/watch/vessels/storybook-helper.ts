import {VesselImage} from '../vessel.js';

export const sideVessels = Object.values(VesselImage).filter((v) =>
  v.includes('side')
);
export const foreVessels = Object.values(VesselImage).filter(
  (v) => v.includes('fore') || v.includes('front')
);
export const topVessels = Object.values(VesselImage).filter((v) =>
  v.includes('top')
);
