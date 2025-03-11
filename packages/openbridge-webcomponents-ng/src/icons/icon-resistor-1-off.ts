import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor1Off as ObiResistor1OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1-off.js';

@Component({
  selector: 'obi-resistor-1-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiResistor1Off {
  private _el: ObiResistor1OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor1OffElement>,
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

