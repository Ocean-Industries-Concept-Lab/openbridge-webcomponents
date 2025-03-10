import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMinorLateralRed as ObiSimplifiedBeaconMinorLateralRedElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-lateral-red.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-lateral-red.js';

@Component({
  selector: 'obi-simplified-beacon-minor-lateral-red',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconMinorLateralRed {
  private _el: ObiSimplifiedBeaconMinorLateralRedElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMinorLateralRedElement>,
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

