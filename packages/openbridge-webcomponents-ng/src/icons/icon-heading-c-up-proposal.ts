import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeadingCUpProposal as ObiHeadingCUpProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-c-up-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-c-up-proposal.js';

@Component({
  selector: 'obi-heading-c-up-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeadingCUpProposal {
  private _el: ObiHeadingCUpProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeadingCUpProposalElement>,
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

