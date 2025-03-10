import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype1On as ObiMosfetNtype1OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-1-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-1-on.js';

@Component({
  selector: 'obi-mosfet-ntype-1-on',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetNtype1On {
  private _el: ObiMosfetNtype1OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype1OnElement>,
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

