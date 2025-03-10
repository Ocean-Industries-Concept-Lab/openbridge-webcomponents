import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype3On as ObiMosfetNtype3OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3-on.js';

@Component({
  selector: 'obi-mosfet-ntype-3-on',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetNtype3On {
  private _el: ObiMosfetNtype3OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype3OnElement>,
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

