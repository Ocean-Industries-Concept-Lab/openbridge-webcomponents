import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySleetShowersPolartwilight as ObiLightningHeavySleetShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-sleet-showers-polartwilight.js';

@Component({
  selector: 'obi-lightning-heavy-sleet-showers-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiLightningHeavySleetShowersPolartwilight {
  private _el: ObiLightningHeavySleetShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySleetShowersPolartwilightElement>,
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

