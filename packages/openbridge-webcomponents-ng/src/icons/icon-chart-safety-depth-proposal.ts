import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSafetyDepthProposal as ObiChartSafetyDepthProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-depth-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-depth-proposal.js';

@Component({
  selector: 'obi-chart-safety-depth-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartSafetyDepthProposal {
  private _el: ObiChartSafetyDepthProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSafetyDepthProposalElement>,
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

