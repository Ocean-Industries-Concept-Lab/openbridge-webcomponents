import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeadingLineOffProposal as ObiHeadingLineOffProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-line-off-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heading-line-off-proposal.js';

@Component({
  selector: 'obi-heading-line-off-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiHeadingLineOffProposal {
  private _el: ObiHeadingLineOffProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeadingLineOffProposalElement>,
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

