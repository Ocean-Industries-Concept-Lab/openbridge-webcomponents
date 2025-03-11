import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartShallowContourProposal as ObiChartShallowContourProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-shallow-contour-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-shallow-contour-proposal.js';

@Component({
  selector: 'obi-chart-shallow-contour-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartShallowContourProposal {
  private _el: ObiChartShallowContourProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartShallowContourProposalElement>,
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

