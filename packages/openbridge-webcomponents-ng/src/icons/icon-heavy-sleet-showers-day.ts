import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleetShowersDay as ObiHeavySleetShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-day.js';

@Component({
  selector: 'obi-heavy-sleet-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySleetShowersDay {
  private _el: ObiHeavySleetShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetShowersDayElement>,
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

