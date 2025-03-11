import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSettingsUserProposal as ObiSettingsUserProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-user-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-user-proposal.js';

@Component({
  selector: 'obi-settings-user-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSettingsUserProposal {
  private _el: ObiSettingsUserProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSettingsUserProposalElement>,
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

