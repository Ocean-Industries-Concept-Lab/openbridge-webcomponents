import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavyRainShowersDay as ObiLightningHeavyRainShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-day.js';

@Component({
  selector: 'obi-lightning-heavy-rain-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavyRainShowersDay {
  private _el: ObiLightningHeavyRainShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavyRainShowersDayElement>,
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

