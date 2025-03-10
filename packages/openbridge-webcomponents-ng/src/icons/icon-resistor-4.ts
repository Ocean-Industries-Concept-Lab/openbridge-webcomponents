import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor4 as ObiResistor4Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4.js';

@Component({
  selector: 'obi-resistor-4',
  template: '<ng-content></ng-content>',
})
export class ObiResistor4 {
  private _el: ObiResistor4Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor4Element>,
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

