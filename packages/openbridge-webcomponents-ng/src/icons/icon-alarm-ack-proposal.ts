import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmAckProposal as ObiAlarmAckProposalElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-ack-proposal.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-ack-proposal.js';

@Component({
  selector: 'obi-alarm-ack-proposal',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmAckProposal {
  private _el: ObiAlarmAckProposalElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmAckProposalElement>,
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

