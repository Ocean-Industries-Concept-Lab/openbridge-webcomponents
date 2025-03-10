import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype4Off as ObiMosfetPtype4OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4-off.js';

@Component({
  selector: 'obi-mosfet-ptype-4-off',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetPtype4Off {
  private _el: ObiMosfetPtype4OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype4OffElement>,
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

