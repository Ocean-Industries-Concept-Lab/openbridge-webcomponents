import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalConeUp as ObiBuoySphericalConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cone-up.js';

@Component({
  selector: 'obi-buoy-spherical-cone-up',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalConeUp {
  private _el: ObiBuoySphericalConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalConeUpElement>,
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

