import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalNorth as ObiBuoySphericalNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-north.js';

@Component({
  selector: 'obi-buoy-spherical-north',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalNorth {
  private _el: ObiBuoySphericalNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalNorthElement>,
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

