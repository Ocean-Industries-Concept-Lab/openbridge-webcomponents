import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRainShowersSunColour as ObiLightRainShowersSunColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-sun-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-sun-colour.js';

@Component({
  selector: 'obi-light-rain-showers-sun-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightRainShowersSunColour {
  private _el: ObiLightRainShowersSunColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainShowersSunColourElement>,
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

