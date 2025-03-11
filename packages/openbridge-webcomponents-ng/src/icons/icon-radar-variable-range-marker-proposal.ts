import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarVariableRangeMarkerProposal as ObiRadarVariableRangeMarkerProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-variable-range-marker-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-variable-range-marker-proposal.js';

@Component({
  selector: 'obi-radar-variable-range-marker-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRadarVariableRangeMarkerProposal {
  private _el: ObiRadarVariableRangeMarkerProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarVariableRangeMarkerProposalElement>,
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

