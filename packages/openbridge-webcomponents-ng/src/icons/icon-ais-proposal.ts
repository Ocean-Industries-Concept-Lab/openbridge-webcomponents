import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAisProposal as ObiAisProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ais-proposal.js';

@Component({
  selector: 'obi-ais-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiAisProposal {
  private _el: ObiAisProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAisProposalElement>,
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

