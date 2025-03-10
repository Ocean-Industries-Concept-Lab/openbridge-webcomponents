import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSleetShowersDay as ObiLightningSleetShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-day.js';

@Component({
  selector: 'obi-lightning-sleet-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightningSleetShowersDay {
  private _el: ObiLightningSleetShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSleetShowersDayElement>,
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

