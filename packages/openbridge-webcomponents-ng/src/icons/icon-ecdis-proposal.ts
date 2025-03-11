import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiEcdisProposal as ObiEcdisProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ecdis-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ecdis-proposal.js';

@Component({
  selector: 'obi-ecdis-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiEcdisProposal {
  private _el: ObiEcdisProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiEcdisProposalElement>,
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

