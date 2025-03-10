import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelConeUp as ObiBuoyBarrelConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-cone-up.js';

@Component({
  selector: 'obi-buoy-barrel-cone-up',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyBarrelConeUp {
  private _el: ObiBuoyBarrelConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelConeUpElement>,
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

