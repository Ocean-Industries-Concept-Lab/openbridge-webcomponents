import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor4Off as ObiResistor4OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-4-off.js';

@Component({
  selector: 'obi-resistor-4-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiResistor4Off {
  private _el: ObiResistor4OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor4OffElement>,
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

