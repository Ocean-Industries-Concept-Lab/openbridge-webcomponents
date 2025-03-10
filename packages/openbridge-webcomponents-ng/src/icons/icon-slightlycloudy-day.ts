import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSlightlycloudyDay as ObiSlightlycloudyDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-day.js';

@Component({
  selector: 'obi-slightlycloudy-day',
  template: '<ng-content></ng-content>',
})
export class ObiSlightlycloudyDay {
  private _el: ObiSlightlycloudyDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSlightlycloudyDayElement>,
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

