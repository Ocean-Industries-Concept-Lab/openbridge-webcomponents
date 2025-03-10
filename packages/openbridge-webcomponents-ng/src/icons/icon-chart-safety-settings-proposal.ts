import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSafetySettingsProposal as ObiChartSafetySettingsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-settings-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-settings-proposal.js';

@Component({
  selector: 'obi-chart-safety-settings-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartSafetySettingsProposal {
  private _el: ObiChartSafetySettingsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSafetySettingsProposalElement>,
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

