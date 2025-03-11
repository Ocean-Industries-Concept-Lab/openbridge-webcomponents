import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartDisplaySettingsProposal as ObiChartDisplaySettingsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-display-settings-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-display-settings-proposal.js';

@Component({
  selector: 'obi-chart-display-settings-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartDisplaySettingsProposal {
  private _el: ObiChartDisplaySettingsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartDisplaySettingsProposalElement>,
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

