import { SVGTemplateResult } from 'lit';

// Import all vessel images statically
import * as carFerryAft from './vessels/car-ferry-aft.js';
import * as carFerrySide from './vessels/car-ferry-side.js';
import * as carFerryTop from './vessels/car-ferry-top.js';
import * as cargoFore from './vessels/cargo-fore.js';
import * as cargoSide from './vessels/cargo-side.js';
import * as cargoTop from './vessels/cargo-top.js';
import * as cargoWindFore from './vessels/cargo-wind-fore.js';
import * as cargoWindSide from './vessels/cargo-wind-side.js';
import * as cargoWindTop from './vessels/cargo-wind-top.js';
import * as fishingVesselSide from './vessels/fishing-vessel-side.js';
import * as fishingVesselTop from './vessels/fishing-vessel-top.js';
import * as foreFore from './vessels/fore-fore.js';
import * as genericSide from './vessels/generic-side.js';
import * as genericTop from './vessels/generic-top.js';
import * as psvAft from './vessels/psv-aft.js';
import * as psvFore from './vessels/psv-fore.js';
import * as psvSide from './vessels/psv-side.js';
import * as psvTop from './vessels/psv-top.js';
import * as sovSide from './vessels/sov-side.js';
import * as sovTop from './vessels/sov-top.js';
import * as tankerFore from './vessels/tanker-fore.js';
import * as tankerSide from './vessels/tanker-side.js';
import * as tankerTop from './vessels/tanker-top.js';
import * as usvLargeSide from './vessels/usv-large-side.js';
import * as usvSmallSide from './vessels/usv-small-side.js';

export enum VesselImageSize {
  none = 'none',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum VesselImage {
  carFerryAft = 'car-ferry-aft',
  carFerrySide = 'car-ferry-side',
  carFerryTop = 'car-ferry-top',
  cargoFore = 'cargo-fore',
  cargoSide = 'cargo-side',
  cargoTop = 'cargo-top',
  cargoWindFore = 'cargo-wind-fore',
  cargoWindSide = 'cargo-wind-side',
  cargoWindTop = 'cargo-wind-top',
  fishingVesselSide = 'fishing-vessel-side',
  fishingVesselTop = 'fishing-vessel-top',
  foreFore = 'fore-fore',
  genericSide = 'generic-side',
  genericTop = 'generic-top',
  psvAft = 'psv-aft',
  psvFore = 'psv-fore',
  psvSide = 'psv-side',
  psvTop = 'psv-top',
  sovSide = 'sov-side',
  sovTop = 'sov-top',
  tankerFore = 'tanker-fore',
  tankerSide = 'tanker-side',
  tankerTop = 'tanker-top',
  usvLargeSide = 'usv-large-side',
  usvSmallSide = 'usv-small-side'
}

// Map of vessel images
export const vesselImages: Record<VesselImage, SVGTemplateResult> = {
  [VesselImage.carFerryAft]: carFerryAft.default,
  [VesselImage.carFerrySide]: carFerrySide.default,
  [VesselImage.carFerryTop]: carFerryTop.default,
  [VesselImage.cargoFore]: cargoFore.default,
  [VesselImage.cargoSide]: cargoSide.default,
  [VesselImage.cargoTop]: cargoTop.default,
  [VesselImage.cargoWindFore]: cargoWindFore.default,
  [VesselImage.cargoWindSide]: cargoWindSide.default,
  [VesselImage.cargoWindTop]: cargoWindTop.default,
  [VesselImage.fishingVesselSide]: fishingVesselSide.default,
  [VesselImage.fishingVesselTop]: fishingVesselTop.default,
  [VesselImage.foreFore]: foreFore.default,
  [VesselImage.genericSide]: genericSide.default,
  [VesselImage.genericTop]: genericTop.default,
  [VesselImage.psvAft]: psvAft.default,
  [VesselImage.psvFore]: psvFore.default,
  [VesselImage.psvSide]: psvSide.default,
  [VesselImage.psvTop]: psvTop.default,
  [VesselImage.sovSide]: sovSide.default,
  [VesselImage.sovTop]: sovTop.default,
  [VesselImage.tankerFore]: tankerFore.default,
  [VesselImage.tankerSide]: tankerSide.default,
  [VesselImage.tankerTop]: tankerTop.default,
  [VesselImage.usvLargeSide]: usvLargeSide.default,
  [VesselImage.usvSmallSide]: usvSmallSide.default,
}; 