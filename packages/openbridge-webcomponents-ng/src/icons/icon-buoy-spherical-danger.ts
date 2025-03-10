import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalDanger as ObiBuoySphericalDangerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-danger.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-danger.js';

@Component({
  selector: 'obi-buoy-spherical-danger',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalDanger {
  private _el: ObiBuoySphericalDangerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalDangerElement>,
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

