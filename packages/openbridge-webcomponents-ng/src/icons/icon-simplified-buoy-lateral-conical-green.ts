import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyLateralConicalGreen as ObiSimplifiedBuoyLateralConicalGreenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-conical-green.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-conical-green.js';

@Component({
  selector: 'obi-simplified-buoy-lateral-conical-green',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoyLateralConicalGreen {
  private _el: ObiSimplifiedBuoyLateralConicalGreenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyLateralConicalGreenElement>,
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

