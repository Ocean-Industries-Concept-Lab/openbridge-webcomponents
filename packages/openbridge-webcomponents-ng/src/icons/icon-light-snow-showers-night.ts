import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSnowShowersNight as ObiLightSnowShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-snow-showers-night.js';

@Component({
  selector: 'obi-light-snow-showers-night',
  template: '<ng-content></ng-content>',
})
export class ObiLightSnowShowersNight {
  private _el: ObiLightSnowShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSnowShowersNightElement>,
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

