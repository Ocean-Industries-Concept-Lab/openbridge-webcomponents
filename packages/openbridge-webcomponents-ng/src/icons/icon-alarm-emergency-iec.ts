import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmEmergencyIec as ObiAlarmEmergencyIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-emergency-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-emergency-iec.js';

@Component({
  selector: 'obi-alarm-emergency-iec',
  template: '<ng-content></ng-content>',
})
export class ObiAlarmEmergencyIec {
  private _el: ObiAlarmEmergencyIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmEmergencyIecElement>,
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

