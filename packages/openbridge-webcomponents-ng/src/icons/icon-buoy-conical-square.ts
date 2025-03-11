import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalSquare as ObiBuoyConicalSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-square.js';

@Component({
  selector: 'obi-buoy-conical-square',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyConicalSquare {
  private _el: ObiBuoyConicalSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalSquareElement>,
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

