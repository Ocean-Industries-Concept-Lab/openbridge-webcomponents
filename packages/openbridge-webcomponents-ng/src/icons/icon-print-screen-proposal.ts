import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPrintScreenProposal as ObiPrintScreenProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print-screen-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-print-screen-proposal.js';

@Component({
  selector: 'obi-print-screen-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiPrintScreenProposal {
  private _el: ObiPrintScreenProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPrintScreenProposalElement>,
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

