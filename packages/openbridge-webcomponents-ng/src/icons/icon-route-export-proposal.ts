import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouteExportProposal as ObiRouteExportProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-export-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-export-proposal.js';

@Component({
  selector: 'obi-route-export-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiRouteExportProposal {
  private _el: ObiRouteExportProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteExportProposalElement>,
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

