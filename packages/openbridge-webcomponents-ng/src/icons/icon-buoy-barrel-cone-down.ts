import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelConeDown as ObiBuoyBarrelConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-cone-down.js';

@Component({
  selector: 'obi-buoy-barrel-cone-down',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyBarrelConeDown {
  private _el: ObiBuoyBarrelConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelConeDownElement>,
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

