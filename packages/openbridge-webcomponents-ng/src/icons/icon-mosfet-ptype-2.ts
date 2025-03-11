import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype2 as ObiMosfetPtype2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-2.js';

@Component({
  selector: 'obi-mosfet-ptype-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetPtype2 {
  private _el: ObiMosfetPtype2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype2Element>,
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

