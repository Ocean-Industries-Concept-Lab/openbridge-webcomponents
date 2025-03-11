import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarElectronicBearingLineProposal as ObiRadarElectronicBearingLineProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-electronic-bearing-line-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-electronic-bearing-line-proposal.js';

@Component({
  selector: 'obi-radar-electronic-bearing-line-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarElectronicBearingLineProposal {
  private _el: ObiRadarElectronicBearingLineProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarElectronicBearingLineProposalElement>,
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

