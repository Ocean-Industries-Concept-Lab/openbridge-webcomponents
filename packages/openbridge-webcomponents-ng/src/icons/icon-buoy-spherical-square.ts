import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalSquare as ObiBuoySphericalSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-square.js';

@Component({
  selector: 'obi-buoy-spherical-square',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySphericalSquare {
  private _el: ObiBuoySphericalSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalSquareElement>,
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

