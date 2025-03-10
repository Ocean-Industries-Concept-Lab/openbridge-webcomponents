import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSnowShowersPolartwilight as ObiLightningLightSnowShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-polartwilight.js';

@Component({
  selector: 'obi-lightning-light-snow-showers-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSnowShowersPolartwilight {
  private _el: ObiLightningLightSnowShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSnowShowersPolartwilightElement>,
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

