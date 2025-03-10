import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor2Off as ObiResistor2OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-2-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-2-off.js';

@Component({
  selector: 'obi-resistor-2-off',
  template: '<ng-content></ng-content>',
})
export class ObiResistor2Off {
  private _el: ObiResistor2OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor2OffElement>,
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

