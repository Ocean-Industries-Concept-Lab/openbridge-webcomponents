import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetPtype4 as ObiMosfetPtype4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ptype-4.js';

@Component({
  selector: 'obi-mosfet-ptype-4',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetPtype4 {
  private _el: ObiMosfetPtype4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetPtype4Element>,
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

