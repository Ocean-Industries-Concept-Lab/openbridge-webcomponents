import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouteImportProposal as ObiRouteImportProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-import-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-import-proposal.js';

@Component({
  selector: 'obi-route-import-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouteImportProposal {
  private _el: ObiRouteImportProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteImportProposalElement>,
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

