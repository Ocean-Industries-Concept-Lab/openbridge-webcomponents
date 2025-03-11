import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRainShowersNightColour as ObiLightRainShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-night-colour.js';

@Component({
  selector: 'obi-light-rain-showers-night-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRainShowersNightColour {
  private _el: ObiLightRainShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainShowersNightColourElement>,
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

