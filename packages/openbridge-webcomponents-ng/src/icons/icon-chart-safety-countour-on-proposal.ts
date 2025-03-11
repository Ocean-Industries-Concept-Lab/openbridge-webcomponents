import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiChartSafetyCountourOnProposal as ObiChartSafetyCountourOnProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-countour-on-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chart-safety-countour-on-proposal.js';

@Component({
  selector: 'obi-chart-safety-countour-on-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiChartSafetyCountourOnProposal {
  private _el: ObiChartSafetyCountourOnProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiChartSafetyCountourOnProposalElement>,
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

