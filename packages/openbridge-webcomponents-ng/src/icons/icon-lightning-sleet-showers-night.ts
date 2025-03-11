import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSleetShowersNight as ObiLightningSleetShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-night.js';

@Component({
  selector: 'obi-lightning-sleet-showers-night',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningSleetShowersNight {
  private _el: ObiLightningSleetShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSleetShowersNightElement>,
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

