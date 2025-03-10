import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanNorth as ObiBuoyCanNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-north.js';

@Component({
  selector: 'obi-buoy-can-north',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanNorth {
  private _el: ObiBuoyCanNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanNorthElement>,
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

