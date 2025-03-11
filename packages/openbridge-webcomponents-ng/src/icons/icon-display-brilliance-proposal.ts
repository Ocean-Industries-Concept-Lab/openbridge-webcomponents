import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDisplayBrillianceProposal as ObiDisplayBrillianceProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-display-brilliance-proposal.js';

@Component({
  selector: 'obi-display-brilliance-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiDisplayBrillianceProposal {
  private _el: ObiDisplayBrillianceProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDisplayBrillianceProposalElement>,
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

