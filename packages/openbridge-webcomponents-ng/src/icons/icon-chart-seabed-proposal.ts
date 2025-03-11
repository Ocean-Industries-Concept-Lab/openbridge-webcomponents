import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSeabedProposal as ObiChartSeabedProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-seabed-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-seabed-proposal.js';

@Component({
  selector: 'obi-chart-seabed-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartSeabedProposal {
  private _el: ObiChartSeabedProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSeabedProposalElement>,
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

