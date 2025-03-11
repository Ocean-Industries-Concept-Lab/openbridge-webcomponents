import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor2 as ObiResistor2Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-2.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-2.js';

@Component({
  selector: 'obi-resistor-2',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiResistor2 {
  private _el: ObiResistor2Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor2Element>,
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

