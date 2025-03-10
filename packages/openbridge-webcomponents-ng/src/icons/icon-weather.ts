import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWeather as ObiWeatherElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-weather.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-weather.js';

@Component({
  selector: 'obi-weather',
  template: '<ng-content></ng-content>',
})
export class ObiWeather {
  private _el: ObiWeatherElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWeatherElement>,
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

