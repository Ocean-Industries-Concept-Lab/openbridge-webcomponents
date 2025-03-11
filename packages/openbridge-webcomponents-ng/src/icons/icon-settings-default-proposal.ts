import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSettingsDefaultProposal as ObiSettingsDefaultProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-default-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-settings-default-proposal.js';

@Component({
  selector: 'obi-settings-default-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSettingsDefaultProposal {
  private _el: ObiSettingsDefaultProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSettingsDefaultProposalElement>,
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

