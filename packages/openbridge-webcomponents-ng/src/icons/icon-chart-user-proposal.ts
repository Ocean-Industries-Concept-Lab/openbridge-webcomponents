import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartUserProposal as ObiChartUserProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-user-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-user-proposal.js';

@Component({
  selector: 'obi-chart-user-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiChartUserProposal {
  private _el: ObiChartUserProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartUserProposalElement>,
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

