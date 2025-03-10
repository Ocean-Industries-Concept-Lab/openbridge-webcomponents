import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanSquare as ObiBuoyCanSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-square.js';

@Component({
  selector: 'obi-buoy-can-square',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyCanSquare {
  private _el: ObiBuoyCanSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanSquareElement>,
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

