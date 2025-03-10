import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavyRainShowersDayColour as ObiLightningHeavyRainShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-day-colour.js';

@Component({
  selector: 'obi-lightning-heavy-rain-showers-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavyRainShowersDayColour {
  private _el: ObiLightningHeavyRainShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavyRainShowersDayColourElement>,
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

