import {SVGTemplateResult} from 'lit';

import * as flapSailAlong from './sail-types/flap-sail-along.js';
import * as flapSail from './sail-types/flap-sail.js';
import * as hardSailFlaps from './sail-types/hard-sail-flaps.js';
import * as hardSail from './sail-types/hard-sail.js';
import * as kite from './sail-types/kite.js';
import * as rotorSail from './sail-types/rotor-sail.js';
import * as softSail from './sail-types/soft-sail.js';
import * as solidSailFlap from './sail-types/solid-sail-flap.js';
import * as solidSail from './sail-types/solid-sail.js';
import * as suctionSail from './sail-types/suction-sail.js';
import * as waveFoilRetracted from './sail-types/wave-foil-retracted.js';
import * as waveFoil from './sail-types/wave-foil.js';

export enum SailType {
  flapSailAlong = 'flap-sail-along',
  flapSail = 'flap-sail',
  hardSailFlaps = 'hard-sail-flaps',
  hardSail = 'hard-sail',
  kite = 'kite',
  rotorSail = 'rotor-sail',
  softSail = 'soft-sail',
  solidSailFlap = 'solid-sail-flap',
  solidSail = 'solid-sail',
  suctionSail = 'suction-sail',
  waveFoilRetracted = 'wave-foil-retracted',
  waveFoil = 'wave-foil',
}

export interface SailTypeEntry {
  svg: SVGTemplateResult;
  width: number;
  height: number;
  /** Visual center X override (defaults to width/2). */
  cx?: number;
  /** Visual center Y override (defaults to height/2). */
  cy?: number;
}

export const sailTypeImages: Record<SailType, SailTypeEntry> = {
  [SailType.flapSailAlong]: {
    svg: flapSailAlong.default,
    width: 280,
    height: 418,
    cx: 140,
    cy: 262,
  },
  [SailType.flapSail]: {svg: flapSail.default, width: 310, height: 280},
  [SailType.hardSailFlaps]: {
    svg: hardSailFlaps.default,
    width: 283,
    height: 280,
  },
  [SailType.hardSail]: {svg: hardSail.default, width: 281, height: 280},
  [SailType.kite]: {svg: kite.default, width: 280, height: 281},
  [SailType.rotorSail]: {svg: rotorSail.default, width: 280, height: 280},
  [SailType.softSail]: {svg: softSail.default, width: 280, height: 280},
  [SailType.solidSailFlap]: {
    svg: solidSailFlap.default,
    width: 280,
    height: 280,
  },
  [SailType.solidSail]: {svg: solidSail.default, width: 280, height: 280},
  [SailType.suctionSail]: {svg: suctionSail.default, width: 280, height: 280},
  [SailType.waveFoilRetracted]: {
    svg: waveFoilRetracted.default,
    width: 280,
    height: 280,
  },
  [SailType.waveFoil]: {svg: waveFoil.default, width: 280, height: 280},
};
