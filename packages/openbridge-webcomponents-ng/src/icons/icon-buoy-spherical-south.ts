import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalSouth as ObiBuoySphericalSouthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-south.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-south.js';

@Component({
  selector: 'obi-buoy-spherical-south',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalSouth {
  private _el: ObiBuoySphericalSouthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalSouthElement>,
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

