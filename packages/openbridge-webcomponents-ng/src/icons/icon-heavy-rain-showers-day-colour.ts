import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRainShowersDayColour as ObiHeavyRainShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-day-colour.js';

@Component({
  selector: 'obi-heavy-rain-showers-day-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiHeavyRainShowersDayColour {
  private _el: ObiHeavyRainShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainShowersDayColourElement>,
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

