import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor5Off as ObiResistor5OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5-off.js';

@Component({
  selector: 'obi-resistor-5-off',
  template: '<ng-content></ng-content>',
})
export class ObiResistor5Off {
  private _el: ObiResistor5OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor5OffElement>,
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

