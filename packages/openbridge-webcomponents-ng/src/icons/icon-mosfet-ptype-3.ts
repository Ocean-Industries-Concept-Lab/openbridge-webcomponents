import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype3 as ObiMosfetPtype3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3.js';

@Component({
  selector: 'obi-mosfet-ptype-3',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetPtype3 {
  private _el: ObiMosfetPtype3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype3Element>,
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

