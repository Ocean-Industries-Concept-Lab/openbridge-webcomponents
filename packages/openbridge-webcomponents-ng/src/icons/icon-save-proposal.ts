import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSaveProposal as ObiSaveProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-save-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-save-proposal.js';

@Component({
  selector: 'obi-save-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiSaveProposal {
  private _el: ObiSaveProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSaveProposalElement>,
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

