import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiMosfetNtype4Off as ObiMosfetNtype4OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-4-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-mosfet-ntype-4-off.js';

@Component({
  selector: 'obi-mosfet-ntype-4-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiMosfetNtype4Off {
  private _el: ObiMosfetNtype4OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiMosfetNtype4OffElement>,
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

