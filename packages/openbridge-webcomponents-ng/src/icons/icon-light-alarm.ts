import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAlarm as ObiLightAlarmElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-alarm.js';

@Component({
  selector: 'obi-light-alarm',
  template: '<ng-content></ng-content>',
})
export class ObiLightAlarm {
  private _el: ObiLightAlarmElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAlarmElement>,
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

