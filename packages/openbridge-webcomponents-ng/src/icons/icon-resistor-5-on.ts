import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor5On as ObiResistor5OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5-on.js';

@Component({
  selector: 'obi-resistor-5-on',
  template: '<ng-content></ng-content>',
})
export class ObiResistor5On {
  private _el: ObiResistor5OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor5OnElement>,
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

