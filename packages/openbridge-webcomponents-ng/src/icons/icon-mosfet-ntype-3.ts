import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype3 as ObiMosfetNtype3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3.js';

@Component({
  selector: 'obi-mosfet-ntype-3',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetNtype3 {
  private _el: ObiMosfetNtype3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype3Element>,
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

