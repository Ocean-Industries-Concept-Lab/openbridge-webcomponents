import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSnowShowersNight as ObiLightningLightSnowShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-night.js';

@Component({
  selector: 'obi-lightning-light-snow-showers-night',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSnowShowersNight {
  private _el: ObiLightningLightSnowShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSnowShowersNightElement>,
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

