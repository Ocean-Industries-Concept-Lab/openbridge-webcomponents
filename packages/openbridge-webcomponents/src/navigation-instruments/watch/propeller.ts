import {SVGTemplateResult} from 'lit';

import threeBlade from './propellers/three-blade.js';
import fourBlade from './propellers/four-blade.js';
import fiveBlade from './propellers/five-blade.js';
import sixBlade from './propellers/six-blade.js';
import shaftlessFiveBlade from './propellers/shaftless-five-blade.js';
import shaftlessSevenBlade from './propellers/shaftless-seven-blade.js';
import vspSevenBlade from './propellers/vsp-seven-blade.js';
import capFiveBlade from './propellers/cap-five-blade.js';

export enum PropellerImage {
  threeBlade = 'three-blade',
  fourBlade = 'four-blade',
  fiveBlade = 'five-blade',
  sixBlade = 'six-blade',
  shaftlessFiveBlade = 'shaftless-five-blade',
  shaftlessSevenBlade = 'shaftless-seven-blade',
  vspSevenBlade = 'vsp-seven-blade',
  // TODO(designer): the Figma variant is named "Type9"; the art reads as a
  // bladed hub cap, named descriptively here until the design names it.
  capFiveBlade = 'cap-five-blade',
}

/**
 * Top-view propeller art in the shared 160x160 vessel-image coordinate
 * system, centered at (80, 80). Consumers center it with the same
 * `scale(size / 160) translate(-80 -80)` wrapper as `vesselImages`.
 */
export const propellerImages: Record<PropellerImage, SVGTemplateResult> = {
  [PropellerImage.threeBlade]: threeBlade,
  [PropellerImage.fourBlade]: fourBlade,
  [PropellerImage.fiveBlade]: fiveBlade,
  [PropellerImage.sixBlade]: sixBlade,
  [PropellerImage.shaftlessFiveBlade]: shaftlessFiveBlade,
  [PropellerImage.shaftlessSevenBlade]: shaftlessSevenBlade,
  [PropellerImage.vspSevenBlade]: vspSevenBlade,
  [PropellerImage.capFiveBlade]: capFiveBlade,
};
