import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor3 as ObiResistor3Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-3.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-3.js';

@Component({
  selector: 'obi-resistor-3',
  template: '<ng-content></ng-content>',
})
export class ObiResistor3 {
  private _el: ObiResistor3Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor3Element>,
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

