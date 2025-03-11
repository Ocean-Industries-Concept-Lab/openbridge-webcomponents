import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype3Off as ObiMosfetNtype3OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-3-off.js';

@Component({
  selector: 'obi-mosfet-ntype-3-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetNtype3Off {
  private _el: ObiMosfetNtype3OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype3OffElement>,
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

