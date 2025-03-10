import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMinorLateralGreen as ObiSimplifiedBeaconMinorLateralGreenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-lateral-green.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-lateral-green.js';

@Component({
  selector: 'obi-simplified-beacon-minor-lateral-green',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconMinorLateralGreen {
  private _el: ObiSimplifiedBeaconMinorLateralGreenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMinorLateralGreenElement>,
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

