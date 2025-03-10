import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRainShowersDay as ObiRainShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-day.js';

@Component({
  selector: 'obi-rain-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiRainShowersDay {
  private _el: ObiRainShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRainShowersDayElement>,
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

