import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRainShowersDay as ObiHeavyRainShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-day.js';

@Component({
  selector: 'obi-heavy-rain-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiHeavyRainShowersDay {
  private _el: ObiHeavyRainShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainShowersDayElement>,
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

