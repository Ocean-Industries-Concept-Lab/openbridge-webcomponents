import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSensorGpsFull as ObiSensorGpsFullElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-full.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-full.js';

@Component({
  selector: 'obi-sensor-gps-full',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSensorGpsFull {
  private _el: ObiSensorGpsFullElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSensorGpsFullElement>,
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

