import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySnowShowersPolartwilightColour as ObiHeavySnowShowersPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-snow-showers-polartwilight-colour.js';

@Component({
  selector: 'obi-heavy-snow-showers-polartwilight-colour',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySnowShowersPolartwilightColour {
  private _el: ObiHeavySnowShowersPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySnowShowersPolartwilightColourElement>,
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

