import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMotionTrueProposal as ObiMotionTrueProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-true-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-motion-true-proposal.js';

@Component({
  selector: 'obi-motion-true-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMotionTrueProposal {
  private _el: ObiMotionTrueProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMotionTrueProposalElement>,
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

