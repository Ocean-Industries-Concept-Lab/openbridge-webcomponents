import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSleetShowersDay as ObiLightSleetShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet-showers-day.js';

@Component({
  selector: 'obi-light-sleet-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightSleetShowersDay {
  private _el: ObiLightSleetShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSleetShowersDayElement>,
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

