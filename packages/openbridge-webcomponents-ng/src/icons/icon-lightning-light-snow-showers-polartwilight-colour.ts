import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSnowShowersPolartwilightColour as ObiLightningLightSnowShowersPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-polartwilight-colour.js';

@Component({
  selector: 'obi-lightning-light-snow-showers-polartwilight-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSnowShowersPolartwilightColour {
  private _el: ObiLightningLightSnowShowersPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSnowShowersPolartwilightColourElement>,
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

