import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResistor1 as ObiResistor1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resistor-1.js';

@Component({
  selector: 'obi-resistor-1',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiResistor1 {
  private _el: ObiResistor1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResistor1Element>,
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

