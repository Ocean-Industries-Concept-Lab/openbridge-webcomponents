import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSensorGyro as ObiSensorGyroElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gyro.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gyro.js';

@Component({
  selector: 'obi-sensor-gyro',
  template: '<ng-content></ng-content>',
})
export class ObiSensorGyro {
  private _el: ObiSensorGyroElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSensorGyroElement>,
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

