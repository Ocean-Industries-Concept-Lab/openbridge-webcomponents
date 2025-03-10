import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeadingHUpProposal as ObiHeadingHUpProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-h-up-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-h-up-proposal.js';

@Component({
  selector: 'obi-heading-h-up-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiHeadingHUpProposal {
  private _el: ObiHeadingHUpProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeadingHUpProposalElement>,
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

