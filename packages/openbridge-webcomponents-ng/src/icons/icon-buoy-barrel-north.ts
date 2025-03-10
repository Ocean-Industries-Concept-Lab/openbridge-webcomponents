import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelNorth as ObiBuoyBarrelNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-north.js';

@Component({
  selector: 'obi-buoy-barrel-north',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyBarrelNorth {
  private _el: ObiBuoyBarrelNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelNorthElement>,
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

