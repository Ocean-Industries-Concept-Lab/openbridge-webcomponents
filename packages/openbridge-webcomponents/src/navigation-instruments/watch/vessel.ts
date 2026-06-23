import {SVGTemplateResult} from 'lit';

// Import all vessel images statically
import * as carFerryAft from './vessels/car-ferry-aft.js';
import * as carFerryFore from './vessels/car-ferry-fore.js';
import carFerrySide, {carFerrySideFaded} from './vessels/car-ferry-side.js';
import * as carFerryTop from './vessels/car-ferry-top.js';
import * as cargoFore from './vessels/cargo-fore.js';
import cargoSide, {cargoSideFaded} from './vessels/cargo-side.js';
import * as cargoTop from './vessels/cargo-top.js';
import * as cargoWindFore from './vessels/cargo-wind-fore.js';
import cargoWindSide, {cargoWindSideFaded} from './vessels/cargo-wind-side.js';
import * as cargoWindTop from './vessels/cargo-wind-top.js';
import fishingVesselSide, {
  fishingVesselSideFaded,
} from './vessels/fishing-vessel-side.js';
import * as fishingVesselTop from './vessels/fishing-vessel-top.js';
import genericSide, {genericSideFaded} from './vessels/generic-side.js';
import * as genericTop from './vessels/generic-top.js';
import * as psvAft from './vessels/psv-aft.js';
import * as psvFore from './vessels/psv-fore.js';
import psvSide, {psvSideFaded} from './vessels/psv-side.js';
import * as psvTop from './vessels/psv-top.js';
import sovSide, {sovSideFaded} from './vessels/sov-side.js';
import * as sovTop from './vessels/sov-top.js';
import * as tankerFore from './vessels/tanker-fore.js';
import tankerSide, {tankerSideFaded} from './vessels/tanker-side.js';
import * as tankerTop from './vessels/tanker-top.js';
import usvLargeSide, {usvLargeSideFaded} from './vessels/usv-large-side.js';
import usvSmallSide, {usvSmallSideFaded} from './vessels/usv-small-side.js';
import * as droneMediumFront from './vessels/drone-medium-front.js';
import droneMediumStbdSide, {
  droneMediumStbdSideFaded,
} from './vessels/drone-medium-stbd-side.js';
import * as droneMediumTop from './vessels/drone-medium-top.js';
import * as droneSmallFront from './vessels/drone-small-front.js';
import droneSmallStbdSide, {
  droneSmallStbdSideFaded,
} from './vessels/drone-small-stbd-side.js';
import * as droneSmallTop from './vessels/drone-small-top.js';
import * as droneGenericFront from './vessels/drone-generic-front.js';
import droneGenericSide, {
  droneGenericSideFaded,
} from './vessels/drone-generic-side.js';
import * as droneGenericTop from './vessels/drone-generic-top.js';
import * as rovFront from './vessels/rov-front.js';
import rovSide, {rovSideFaded} from './vessels/rov-side.js';
import * as rovTop from './vessels/rov-top.js';

export enum VesselImageSize {
  none = 'none',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum VesselImage {
  carFerryAft = 'car-ferry-aft',
  carFerryFore = 'car-ferry-fore',
  carFerrySide = 'car-ferry-side',
  carFerrySideFaded = 'car-ferry-side-faded',
  carFerryTop = 'car-ferry-top',
  cargoFore = 'cargo-fore',
  cargoSide = 'cargo-side',
  cargoSideFaded = 'cargo-side-faded',
  cargoTop = 'cargo-top',
  cargoWindFore = 'cargo-wind-fore',
  cargoWindSide = 'cargo-wind-side',
  cargoWindSideFaded = 'cargo-wind-side-faded',
  cargoWindTop = 'cargo-wind-top',
  fishingVesselSide = 'fishing-vessel-side',
  fishingVesselSideFaded = 'fishing-vessel-side-faded',
  fishingVesselTop = 'fishing-vessel-top',
  genericSide = 'generic-side',
  genericSideFaded = 'generic-side-faded',
  genericTop = 'generic-top',
  psvAft = 'psv-aft',
  psvFore = 'psv-fore',
  psvSide = 'psv-side',
  psvSideFaded = 'psv-side-faded',
  psvTop = 'psv-top',
  sovSide = 'sov-side',
  sovSideFaded = 'sov-side-faded',
  sovTop = 'sov-top',
  tankerFore = 'tanker-fore',
  tankerSide = 'tanker-side',
  tankerSideFaded = 'tanker-side-faded',
  tankerTop = 'tanker-top',
  usvLargeSide = 'usv-large-side',
  usvLargeSideFaded = 'usv-large-side-faded',
  usvSmallSide = 'usv-small-side',
  usvSmallSideFaded = 'usv-small-side-faded',
  droneMediumFront = 'drone-medium-front',
  droneMediumStbdSide = 'drone-medium-stbd-side',
  droneMediumStbdSideFaded = 'drone-medium-stbd-side-faded',
  droneMediumTop = 'drone-medium-top',
  droneSmallFront = 'drone-small-front',
  droneSmallStbdSide = 'drone-small-stbd-side',
  droneSmallStbdSideFaded = 'drone-small-stbd-side-faded',
  droneSmallTop = 'drone-small-top',
  droneGenericFront = 'drone-generic-front',
  droneGenericSide = 'drone-generic-side',
  droneGenericSideFaded = 'drone-generic-side-faded',
  droneGenericTop = 'drone-generic-top',
  rovFront = 'rov-front',
  rovSide = 'rov-side',
  rovSideFaded = 'rov-side-faded',
  rovTop = 'rov-top',
}

// Map of vessel images
export const vesselImages: Record<VesselImage, SVGTemplateResult> = {
  [VesselImage.carFerryAft]: carFerryAft.default,
  [VesselImage.carFerryFore]: carFerryFore.default,
  [VesselImage.carFerrySide]: carFerrySide,
  [VesselImage.carFerrySideFaded]: carFerrySideFaded,
  [VesselImage.carFerryTop]: carFerryTop.default,
  [VesselImage.cargoFore]: cargoFore.default,
  [VesselImage.cargoSide]: cargoSide,
  [VesselImage.cargoSideFaded]: cargoSideFaded,
  [VesselImage.cargoTop]: cargoTop.default,
  [VesselImage.cargoWindFore]: cargoWindFore.default,
  [VesselImage.cargoWindSide]: cargoWindSide,
  [VesselImage.cargoWindSideFaded]: cargoWindSideFaded,
  [VesselImage.cargoWindTop]: cargoWindTop.default,
  [VesselImage.fishingVesselSide]: fishingVesselSide,
  [VesselImage.fishingVesselSideFaded]: fishingVesselSideFaded,
  [VesselImage.fishingVesselTop]: fishingVesselTop.default,
  [VesselImage.genericSide]: genericSide,
  [VesselImage.genericSideFaded]: genericSideFaded,
  [VesselImage.genericTop]: genericTop.default,
  [VesselImage.psvAft]: psvAft.default,
  [VesselImage.psvFore]: psvFore.default,
  [VesselImage.psvSide]: psvSide,
  [VesselImage.psvSideFaded]: psvSideFaded,
  [VesselImage.psvTop]: psvTop.default,
  [VesselImage.sovSide]: sovSide,
  [VesselImage.sovSideFaded]: sovSideFaded,
  [VesselImage.sovTop]: sovTop.default,
  [VesselImage.tankerFore]: tankerFore.default,
  [VesselImage.tankerSide]: tankerSide,
  [VesselImage.tankerSideFaded]: tankerSideFaded,
  [VesselImage.tankerTop]: tankerTop.default,
  [VesselImage.usvLargeSide]: usvLargeSide,
  [VesselImage.usvLargeSideFaded]: usvLargeSideFaded,
  [VesselImage.usvSmallSide]: usvSmallSide,
  [VesselImage.usvSmallSideFaded]: usvSmallSideFaded,
  [VesselImage.droneMediumFront]: droneMediumFront.default,
  [VesselImage.droneMediumStbdSide]: droneMediumStbdSide,
  [VesselImage.droneMediumStbdSideFaded]: droneMediumStbdSideFaded,
  [VesselImage.droneMediumTop]: droneMediumTop.default,
  [VesselImage.droneSmallFront]: droneSmallFront.default,
  [VesselImage.droneSmallStbdSide]: droneSmallStbdSide,
  [VesselImage.droneSmallStbdSideFaded]: droneSmallStbdSideFaded,
  [VesselImage.droneSmallTop]: droneSmallTop.default,
  [VesselImage.droneGenericFront]: droneGenericFront.default,
  [VesselImage.droneGenericSide]: droneGenericSide,
  [VesselImage.droneGenericSideFaded]: droneGenericSideFaded,
  [VesselImage.droneGenericTop]: droneGenericTop.default,
  [VesselImage.rovFront]: rovFront.default,
  [VesselImage.rovSide]: rovSide,
  [VesselImage.rovSideFaded]: rovSideFaded,
  [VesselImage.rovTop]: rovTop.default,
};
