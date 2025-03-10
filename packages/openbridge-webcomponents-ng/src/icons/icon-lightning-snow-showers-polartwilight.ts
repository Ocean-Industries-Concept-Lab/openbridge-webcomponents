import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSnowShowersPolartwilight as ObiLightningSnowShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-snow-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-snow-showers-polartwilight.js';

@Component({
  selector: 'obi-lightning-snow-showers-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiLightningSnowShowersPolartwilight {
  private _el: ObiLightningSnowShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSnowShowersPolartwilightElement>,
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

