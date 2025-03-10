import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor5 as ObiResistor5Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-5.js';

@Component({
  selector: 'obi-resistor-5',
  template: '<ng-content></ng-content>',
})
export class ObiResistor5 {
  private _el: ObiResistor5Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor5Element>,
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

