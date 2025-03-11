import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmTransferredIec as ObiAlarmTransferredIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-transferred-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-transferred-iec.js';

@Component({
  selector: 'obi-alarm-transferred-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmTransferredIec {
  private _el: ObiAlarmTransferredIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmTransferredIecElement>,
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

