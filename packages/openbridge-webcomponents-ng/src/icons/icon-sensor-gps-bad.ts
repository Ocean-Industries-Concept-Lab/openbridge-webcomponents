import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSensorGpsBad as ObiSensorGpsBadElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-bad.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-bad.js';

@Component({
  selector: 'obi-sensor-gps-bad',
  template: '<ng-content></ng-content>',
})
export class ObiSensorGpsBad {
  private _el: ObiSensorGpsBadElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSensorGpsBadElement>,
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

