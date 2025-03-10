import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSimplifiedBuoyDefault as ObiSimplifiedBuoyDefaultElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-default.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simplified-buoy-default.js';

@Component({
  selector: 'obi-simplified-buoy-default',
  template: '<ng-content></ng-content>',
})
export class ObiSimplifiedBuoyDefault {
  private _el: ObiSimplifiedBuoyDefaultElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSimplifiedBuoyDefaultElement>,
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

