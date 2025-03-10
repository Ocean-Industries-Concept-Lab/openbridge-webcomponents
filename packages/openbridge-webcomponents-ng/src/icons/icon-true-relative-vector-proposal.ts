import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrueRelativeVectorProposal as ObiTrueRelativeVectorProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-true-relative-vector-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-true-relative-vector-proposal.js';

@Component({
  selector: 'obi-true-relative-vector-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiTrueRelativeVectorProposal {
  private _el: ObiTrueRelativeVectorProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrueRelativeVectorProposalElement>,
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

