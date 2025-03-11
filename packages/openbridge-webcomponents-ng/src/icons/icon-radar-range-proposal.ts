import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarRangeProposal as ObiRadarRangeProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-range-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-range-proposal.js';

@Component({
  selector: 'obi-radar-range-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarRangeProposal {
  private _el: ObiRadarRangeProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarRangeProposalElement>,
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

