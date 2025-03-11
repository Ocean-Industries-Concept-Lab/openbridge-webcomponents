import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartFourShadesProposal as ObiChartFourShadesProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-four-shades-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-four-shades-proposal.js';

@Component({
  selector: 'obi-chart-four-shades-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartFourShadesProposal {
  private _el: ObiChartFourShadesProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartFourShadesProposalElement>,
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

