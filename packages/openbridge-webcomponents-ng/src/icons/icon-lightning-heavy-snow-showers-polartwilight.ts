import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningHeavySnowShowersPolartwilight as ObiLightningHeavySnowShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-heavy-snow-showers-polartwilight.js';

@Component({
  selector: 'obi-lightning-heavy-snow-showers-polartwilight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningHeavySnowShowersPolartwilight {
  private _el: ObiLightningHeavySnowShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningHeavySnowShowersPolartwilightElement>,
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

