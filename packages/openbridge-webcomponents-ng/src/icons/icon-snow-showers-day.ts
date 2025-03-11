import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSnowShowersDay as ObiSnowShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-snow-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-snow-showers-day.js';

@Component({
  selector: 'obi-snow-showers-day',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSnowShowersDay {
  private _el: ObiSnowShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSnowShowersDayElement>,
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

