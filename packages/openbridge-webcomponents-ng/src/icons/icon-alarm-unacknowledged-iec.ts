import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAlarmUnacknowledgedIec as ObiAlarmUnacknowledgedIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-unacknowledged-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-alarm-unacknowledged-iec.js';

@Component({
  selector: 'obi-alarm-unacknowledged-iec',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiAlarmUnacknowledgedIec {
  private _el: ObiAlarmUnacknowledgedIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAlarmUnacknowledgedIecElement>,
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

