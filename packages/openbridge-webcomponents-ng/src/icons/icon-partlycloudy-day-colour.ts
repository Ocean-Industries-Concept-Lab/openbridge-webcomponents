import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPartlycloudyDayColour as ObiPartlycloudyDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-day-colour.js';

@Component({
  selector: 'obi-partlycloudy-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiPartlycloudyDayColour {
  private _el: ObiPartlycloudyDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPartlycloudyDayColourElement>,
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

