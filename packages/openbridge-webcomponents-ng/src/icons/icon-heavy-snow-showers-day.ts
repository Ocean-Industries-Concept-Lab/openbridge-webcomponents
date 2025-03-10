import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySnowShowersDay as ObiHeavySnowShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-day.js';

@Component({
  selector: 'obi-heavy-snow-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySnowShowersDay {
  private _el: ObiHeavySnowShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySnowShowersDayElement>,
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

