import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalConeUp as ObiBuoyConicalConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cone-up.js';

@Component({
  selector: 'obi-buoy-conical-cone-up',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalConeUp {
  private _el: ObiBuoyConicalConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalConeUpElement>,
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

