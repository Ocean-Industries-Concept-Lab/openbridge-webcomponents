import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMinorSpecialPurpose as ObiSimplifiedBeaconMinorSpecialPurposeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-special-purpose.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-minor-special-purpose.js';

@Component({
  selector: 'obi-simplified-beacon-minor-special-purpose',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconMinorSpecialPurpose {
  private _el: ObiSimplifiedBeaconMinorSpecialPurposeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMinorSpecialPurposeElement>,
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

