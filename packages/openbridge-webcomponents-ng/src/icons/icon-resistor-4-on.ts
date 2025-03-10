import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor4On as ObiResistor4OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4-on.js';

@Component({
  selector: 'obi-resistor-4-on',
  template: '<ng-content></ng-content>',
})
export class ObiResistor4On {
  private _el: ObiResistor4OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor4OnElement>,
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

