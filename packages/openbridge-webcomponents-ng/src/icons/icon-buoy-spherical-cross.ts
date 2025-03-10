import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalCross as ObiBuoySphericalCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-cross.js';

@Component({
  selector: 'obi-buoy-spherical-cross',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalCross {
  private _el: ObiBuoySphericalCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalCrossElement>,
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

