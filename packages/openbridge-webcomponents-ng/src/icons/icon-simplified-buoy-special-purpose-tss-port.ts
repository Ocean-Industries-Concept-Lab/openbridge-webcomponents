import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoySpecialPurposeTssPort as ObiSimplifiedBuoySpecialPurposeTssPortElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-special-purpose-tss-port.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-special-purpose-tss-port.js';

@Component({
  selector: 'obi-simplified-buoy-special-purpose-tss-port',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoySpecialPurposeTssPort {
  private _el: ObiSimplifiedBuoySpecialPurposeTssPortElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoySpecialPurposeTssPortElement>,
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

