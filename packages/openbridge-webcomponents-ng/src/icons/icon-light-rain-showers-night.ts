import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRainShowersNight as ObiLightRainShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-night.js';

@Component({
  selector: 'obi-light-rain-showers-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRainShowersNight {
  private _el: ObiLightRainShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainShowersNightElement>,
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

