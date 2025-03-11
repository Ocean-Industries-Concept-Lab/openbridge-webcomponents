import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSensorGpsMedium as ObiSensorGpsMediumElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-medium.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sensor-gps-medium.js';

@Component({
  selector: 'obi-sensor-gps-medium',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSensorGpsMedium {
  private _el: ObiSensorGpsMediumElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSensorGpsMediumElement>,
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

