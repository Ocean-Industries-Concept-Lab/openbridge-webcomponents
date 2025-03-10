import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype4 as ObiMosfetNtype4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-4.js';

@Component({
  selector: 'obi-mosfet-ntype-4',
  template: '<ng-content></ng-content>',
})
export class ObiMosfetNtype4 {
  private _el: ObiMosfetNtype4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype4Element>,
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

