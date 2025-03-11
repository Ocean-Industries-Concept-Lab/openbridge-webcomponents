import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarElectronicRangeAndBearingProposal as ObiRadarElectronicRangeAndBearingProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-electronic-range-and-bearing-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-electronic-range-and-bearing-proposal.js';

@Component({
  selector: 'obi-radar-electronic-range-and-bearing-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarElectronicRangeAndBearingProposal {
  private _el: ObiRadarElectronicRangeAndBearingProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarElectronicRangeAndBearingProposalElement>,
    ngZone: NgZone
  ) {
    this._el = e.nativeElement;
    this._ngZone = ngZone;
    
  }

  
  @Input()
  set useCssColor(v: boolean) {
    this._ngZone.runOutsideAngular(() => (this._el.useCssColor = v));
  }

  get useCssColor() {
    return this._el.useCssColor;
  }
  

  
}

