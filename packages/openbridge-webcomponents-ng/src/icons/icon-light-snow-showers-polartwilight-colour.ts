import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSnowShowersPolartwilightColour as ObiLightSnowShowersPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-polartwilight-colour.js';

@Component({
  selector: 'obi-light-snow-showers-polartwilight-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightSnowShowersPolartwilightColour {
  private _el: ObiLightSnowShowersPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSnowShowersPolartwilightColourElement>,
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

