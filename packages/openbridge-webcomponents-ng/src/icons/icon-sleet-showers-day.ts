import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSleetShowersDay as ObiSleetShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-day.js';

@Component({
  selector: 'obi-sleet-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiSleetShowersDay {
  private _el: ObiSleetShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSleetShowersDayElement>,
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

