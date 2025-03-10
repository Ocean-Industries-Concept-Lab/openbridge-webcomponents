import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype1 as ObiMosfetNtype1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-1.js';

@Component({
  selector: 'obi-mosfet-ntype-1',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetNtype1 {
  private _el: ObiMosfetNtype1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype1Element>,
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

