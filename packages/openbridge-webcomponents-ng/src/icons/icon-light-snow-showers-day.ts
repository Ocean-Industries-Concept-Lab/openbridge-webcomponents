import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSnowShowersDay as ObiLightSnowShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-day.js';

@Component({
  selector: 'obi-light-snow-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightSnowShowersDay {
  private _el: ObiLightSnowShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSnowShowersDayElement>,
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

