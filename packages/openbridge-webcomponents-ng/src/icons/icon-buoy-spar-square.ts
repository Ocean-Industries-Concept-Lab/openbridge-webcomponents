import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparSquare as ObiBuoySparSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-square.js';

@Component({
  selector: 'obi-buoy-spar-square',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparSquare {
  private _el: ObiBuoySparSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparSquareElement>,
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

