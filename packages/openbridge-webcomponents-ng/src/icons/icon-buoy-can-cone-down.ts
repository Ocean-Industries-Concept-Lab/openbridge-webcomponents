import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanConeDown as ObiBuoyCanConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-cone-down.js';

@Component({
  selector: 'obi-buoy-can-cone-down',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanConeDown {
  private _el: ObiBuoyCanConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanConeDownElement>,
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

