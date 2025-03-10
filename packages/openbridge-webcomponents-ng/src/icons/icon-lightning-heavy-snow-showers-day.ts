import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySnowShowersDay as ObiLightningHeavySnowShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-day.js';

@Component({
  selector: 'obi-lightning-heavy-snow-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavySnowShowersDay {
  private _el: ObiLightningHeavySnowShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySnowShowersDayElement>,
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

