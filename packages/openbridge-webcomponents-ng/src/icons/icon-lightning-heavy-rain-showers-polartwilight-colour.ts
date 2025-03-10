import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavyRainShowersPolartwilightColour as ObiLightningHeavyRainShowersPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-rain-showers-polartwilight-colour.js';

@Component({
  selector: 'obi-lightning-heavy-rain-showers-polartwilight-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavyRainShowersPolartwilightColour {
  private _el: ObiLightningHeavyRainShowersPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavyRainShowersPolartwilightColourElement>,
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

