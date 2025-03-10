import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRainShowersPolartwilight as ObiHeavyRainShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain-showers-polartwilight.js';

@Component({
  selector: 'obi-heavy-rain-showers-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiHeavyRainShowersPolartwilight {
  private _el: ObiHeavyRainShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainShowersPolartwilightElement>,
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

