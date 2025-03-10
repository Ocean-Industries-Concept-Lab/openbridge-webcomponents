import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalXShape as ObiBuoySphericalXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-x-shape.js';

@Component({
  selector: 'obi-buoy-spherical-x-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalXShape {
  private _el: ObiBuoySphericalXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalXShapeElement>,
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

