import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype3Off as ObiMosfetPtype3OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-3-off.js';

@Component({
  selector: 'obi-mosfet-ptype-3-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetPtype3Off {
  private _el: ObiMosfetPtype3OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype3OffElement>,
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

