import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor3Off as ObiResistor3OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-3-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-3-off.js';

@Component({
  selector: 'obi-resistor-3-off',
  template: '<ng-content></ng-content>',
})
export class ObiResistor3Off {
  private _el: ObiResistor3OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor3OffElement>,
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

