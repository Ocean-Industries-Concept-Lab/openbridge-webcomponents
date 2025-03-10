import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSlightlycloudyDayColour as ObiSlightlycloudyDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-day-colour.js';

@Component({
  selector: 'obi-slightlycloudy-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiSlightlycloudyDayColour {
  private _el: ObiSlightlycloudyDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSlightlycloudyDayColourElement>,
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

