import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartManagementProposal as ObiChartManagementProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-management-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-management-proposal.js';

@Component({
  selector: 'obi-chart-management-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartManagementProposal {
  private _el: ObiChartManagementProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartManagementProposalElement>,
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

