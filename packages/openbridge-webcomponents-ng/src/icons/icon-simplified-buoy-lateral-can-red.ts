import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyLateralCanRed as ObiSimplifiedBuoyLateralCanRedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-can-red.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-can-red.js';

@Component({
  selector: 'obi-simplified-buoy-lateral-can-red',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoyLateralCanRed {
  private _el: ObiSimplifiedBuoyLateralCanRedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyLateralCanRedElement>,
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

