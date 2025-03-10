import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRainShowersNight as ObiHeavyRainShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-night.js';

@Component({
  selector: 'obi-heavy-rain-showers-night',
  template: '<ng-content></ng-content>',
})
export class ObiHeavyRainShowersNight {
  private _el: ObiHeavyRainShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainShowersNightElement>,
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

