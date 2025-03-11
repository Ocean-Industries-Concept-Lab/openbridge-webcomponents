import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiInfoReportProposal as ObiInfoReportProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info-report-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-info-report-proposal.js';

@Component({
  selector: 'obi-info-report-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiInfoReportProposal {
  private _el: ObiInfoReportProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiInfoReportProposalElement>,
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

