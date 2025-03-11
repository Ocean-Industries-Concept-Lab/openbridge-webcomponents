import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype4On as ObiMosfetPtype4OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4-on.js';

@Component({
  selector: 'obi-mosfet-ptype-4-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetPtype4On {
  private _el: ObiMosfetPtype4OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype4OnElement>,
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

