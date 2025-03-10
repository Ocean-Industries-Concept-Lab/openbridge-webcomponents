import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalWest as ObiBuoySphericalWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-west.js';

@Component({
  selector: 'obi-buoy-spherical-west',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalWest {
  private _el: ObiBuoySphericalWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalWestElement>,
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

