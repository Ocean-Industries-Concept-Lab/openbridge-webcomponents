import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartBoundariesLimitsProposal as ObiChartBoundariesLimitsProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-boundaries-limits-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-boundaries-limits-proposal.js';

@Component({
  selector: 'obi-chart-boundaries-limits-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartBoundariesLimitsProposal {
  private _el: ObiChartBoundariesLimitsProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartBoundariesLimitsProposalElement>,
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

