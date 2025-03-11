import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRoutePlanProposal as ObiRoutePlanProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-plan-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-plan-proposal.js';

@Component({
  selector: 'obi-route-plan-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRoutePlanProposal {
  private _el: ObiRoutePlanProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRoutePlanProposalElement>,
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

