import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSleetShowersPolartwilightColour as ObiLightningLightSleetShowersPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-polartwilight-colour.js';

@Component({
  selector: 'obi-lightning-light-sleet-showers-polartwilight-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSleetShowersPolartwilightColour {
  private _el: ObiLightningLightSleetShowersPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSleetShowersPolartwilightColourElement>,
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

