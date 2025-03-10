import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarNorth as ObiBuoyPilarNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-north.js';

@Component({
  selector: 'obi-buoy-pilar-north',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarNorth {
  private _el: ObiBuoyPilarNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarNorthElement>,
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

