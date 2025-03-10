import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalCube as ObiBuoySphericalCubeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cube.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cube.js';

@Component({
  selector: 'obi-buoy-spherical-cube',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalCube {
  private _el: ObiBuoySphericalCubeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalCubeElement>,
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

