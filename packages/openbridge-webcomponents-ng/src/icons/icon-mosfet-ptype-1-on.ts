import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype1On as ObiMosfetPtype1OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-1-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-1-on.js';

@Component({
  selector: 'obi-mosfet-ptype-1-on',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetPtype1On {
  private _el: ObiMosfetPtype1OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype1OnElement>,
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

