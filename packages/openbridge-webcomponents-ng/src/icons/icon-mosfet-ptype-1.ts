import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype1 as ObiMosfetPtype1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-1.js';

@Component({
  selector: 'obi-mosfet-ptype-1',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetPtype1 {
  private _el: ObiMosfetPtype1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype1Element>,
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

