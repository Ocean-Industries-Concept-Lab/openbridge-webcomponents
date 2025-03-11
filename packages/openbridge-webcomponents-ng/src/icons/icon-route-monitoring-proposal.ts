import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRouteMonitoringProposal as ObiRouteMonitoringProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-monitoring-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-route-monitoring-proposal.js';

@Component({
  selector: 'obi-route-monitoring-proposal',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRouteMonitoringProposal {
  private _el: ObiRouteMonitoringProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRouteMonitoringProposalElement>,
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

