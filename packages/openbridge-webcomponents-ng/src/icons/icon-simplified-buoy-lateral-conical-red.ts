import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyLateralConicalRed as ObiSimplifiedBuoyLateralConicalRedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-conical-red.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-conical-red.js';

@Component({
  selector: 'obi-simplified-buoy-lateral-conical-red',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSimplifiedBuoyLateralConicalRed {
  private _el: ObiSimplifiedBuoyLateralConicalRedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyLateralConicalRedElement>,
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

