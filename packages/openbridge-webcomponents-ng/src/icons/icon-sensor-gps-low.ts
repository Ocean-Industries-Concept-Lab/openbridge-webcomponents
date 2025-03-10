import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSensorGpsLow as ObiSensorGpsLowElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-low.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-low.js';

@Component({
  selector: 'obi-sensor-gps-low',
  template: '<ng-content></ng-content>',
})
export class ObiSensorGpsLow {
  private _el: ObiSensorGpsLowElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSensorGpsLowElement>,
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

