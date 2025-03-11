import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeadingNUpProposal as ObiHeadingNUpProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-n-up-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-n-up-proposal.js';

@Component({
  selector: 'obi-heading-n-up-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeadingNUpProposal {
  private _el: ObiHeadingNUpProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeadingNUpProposalElement>,
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

