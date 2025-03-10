import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavyRainShowersNight as ObiLightningHeavyRainShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-night.js';

@Component({
  selector: 'obi-lightning-heavy-rain-showers-night',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavyRainShowersNight {
  private _el: ObiLightningHeavyRainShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavyRainShowersNightElement>,
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

