import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleetShowersDayColour as ObiHeavySleetShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-day-colour.js';

@Component({
  selector: 'obi-heavy-sleet-showers-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySleetShowersDayColour {
  private _el: ObiHeavySleetShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetShowersDayColourElement>,
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

