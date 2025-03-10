import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarSquare as ObiBuoyPilarSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-square.js';

@Component({
  selector: 'obi-buoy-pilar-square',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarSquare {
  private _el: ObiBuoyPilarSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarSquareElement>,
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

