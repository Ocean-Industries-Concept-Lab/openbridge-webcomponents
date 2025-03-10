import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavyRainShowersNightColour as ObiLightningHeavyRainShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-night-colour.js';

@Component({
  selector: 'obi-lightning-heavy-rain-showers-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavyRainShowersNightColour {
  private _el: ObiLightningHeavyRainShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavyRainShowersNightColourElement>,
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

