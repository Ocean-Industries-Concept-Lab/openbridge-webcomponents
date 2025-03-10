import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartScaleMinProposal as ObiChartScaleMinProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-scale-min-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-scale-min-proposal.js';

@Component({
  selector: 'obi-chart-scale-min-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartScaleMinProposal {
  private _el: ObiChartScaleMinProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartScaleMinProposalElement>,
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

