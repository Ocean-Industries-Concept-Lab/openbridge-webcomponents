import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalSphere as ObiBuoySphericalSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-sphere.js';

@Component({
  selector: 'obi-buoy-spherical-sphere',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySphericalSphere {
  private _el: ObiBuoySphericalSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalSphereElement>,
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

