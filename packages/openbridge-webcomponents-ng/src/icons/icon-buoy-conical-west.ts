import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalWest as ObiBuoyConicalWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-west.js';

@Component({
  selector: 'obi-buoy-conical-west',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalWest {
  private _el: ObiBuoyConicalWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalWestElement>,
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

