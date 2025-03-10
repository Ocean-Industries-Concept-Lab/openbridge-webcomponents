import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPanelIlluminationProposal as ObiPanelIlluminationProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-panel-illumination-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-panel-illumination-proposal.js';

@Component({
  selector: 'obi-panel-illumination-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiPanelIlluminationProposal {
  private _el: ObiPanelIlluminationProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPanelIlluminationProposalElement>,
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

