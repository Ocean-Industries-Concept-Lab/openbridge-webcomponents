import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSafetyDepthsShowProposal as ObiChartSafetyDepthsShowProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-depths-show-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-depths-show-proposal.js';

@Component({
  selector: 'obi-chart-safety-depths-show-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartSafetyDepthsShowProposal {
  private _el: ObiChartSafetyDepthsShowProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSafetyDepthsShowProposalElement>,
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

