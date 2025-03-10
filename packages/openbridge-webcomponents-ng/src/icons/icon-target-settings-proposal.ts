import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTargetSettingsProposal as ObiTargetSettingsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-settings-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-target-settings-proposal.js';

@Component({
  selector: 'obi-target-settings-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiTargetSettingsProposal {
  private _el: ObiTargetSettingsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTargetSettingsProposalElement>,
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

