import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalEast as ObiBuoySphericalEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-east.js';

@Component({
  selector: 'obi-buoy-spherical-east',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySphericalEast {
  private _el: ObiBuoySphericalEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalEastElement>,
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

