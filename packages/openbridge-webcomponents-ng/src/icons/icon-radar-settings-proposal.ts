import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRadarSettingsProposal as ObiRadarSettingsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-settings-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-radar-settings-proposal.js';

@Component({
  selector: 'obi-radar-settings-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiRadarSettingsProposal {
  private _el: ObiRadarSettingsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRadarSettingsProposalElement>,
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

