import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSafetyCountourOffProposal as ObiChartSafetyCountourOffProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-countour-off-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-countour-off-proposal.js';

@Component({
  selector: 'obi-chart-safety-countour-off-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartSafetyCountourOffProposal {
  private _el: ObiChartSafetyCountourOffProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSafetyCountourOffProposalElement>,
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

