import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype3On as ObiMosfetPtype3OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3-on.js';

@Component({
  selector: 'obi-mosfet-ptype-3-on',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetPtype3On {
  private _el: ObiMosfetPtype3OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype3OnElement>,
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

