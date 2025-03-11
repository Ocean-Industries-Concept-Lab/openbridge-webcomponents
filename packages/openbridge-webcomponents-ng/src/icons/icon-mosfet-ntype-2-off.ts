import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype2Off as ObiMosfetNtype2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-2-off.js';

@Component({
  selector: 'obi-mosfet-ntype-2-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetNtype2Off {
  private _el: ObiMosfetNtype2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype2OffElement>,
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

