import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyLateralCanGreen as ObiSimplifiedBuoyLateralCanGreenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-can-green.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-lateral-can-green.js';

@Component({
  selector: 'obi-simplified-buoy-lateral-can-green',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoyLateralCanGreen {
  private _el: ObiSimplifiedBuoyLateralCanGreenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyLateralCanGreenElement>,
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

