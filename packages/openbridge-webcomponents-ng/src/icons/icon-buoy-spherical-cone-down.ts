import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalConeDown as ObiBuoySphericalConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cone-down.js';

@Component({
  selector: 'obi-buoy-spherical-cone-down',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySphericalConeDown {
  private _el: ObiBuoySphericalConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalConeDownElement>,
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

