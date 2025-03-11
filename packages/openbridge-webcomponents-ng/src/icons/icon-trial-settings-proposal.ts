import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTrialSettingsProposal as ObiTrialSettingsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trial-settings-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-trial-settings-proposal.js';

@Component({
  selector: 'obi-trial-settings-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiTrialSettingsProposal {
  private _el: ObiTrialSettingsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTrialSettingsProposalElement>,
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

