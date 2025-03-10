import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiIecChartDispSetProposal as ObiIecChartDispSetProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iec-chart-disp-set-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-iec-chart-disp-set-proposal.js';

@Component({
  selector: 'obi-iec-chart-disp-set-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiIecChartDispSetProposal {
  private _el: ObiIecChartDispSetProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiIecChartDispSetProposalElement>,
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

