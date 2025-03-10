import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor1On as ObiResistor1OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1-on.js';

@Component({
  selector: 'obi-resistor-1-on',
  template: '<ng-content></ng-content>',
})
export class ObiResistor1On {
  private _el: ObiResistor1OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor1OnElement>,
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

