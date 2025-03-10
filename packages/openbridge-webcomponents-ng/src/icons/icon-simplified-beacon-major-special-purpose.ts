import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBeaconMajorSpecialPurpose as ObiSimplifiedBeaconMajorSpecialPurposeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-major-special-purpose.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-beacon-major-special-purpose.js';

@Component({
  selector: 'obi-simplified-beacon-major-special-purpose',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBeaconMajorSpecialPurpose {
  private _el: ObiSimplifiedBeaconMajorSpecialPurposeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBeaconMajorSpecialPurposeElement>,
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

