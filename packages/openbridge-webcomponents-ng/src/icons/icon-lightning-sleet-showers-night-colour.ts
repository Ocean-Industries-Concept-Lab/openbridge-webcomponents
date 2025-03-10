import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSleetShowersNightColour as ObiLightningSleetShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-night-colour.js';

@Component({
  selector: 'obi-lightning-sleet-showers-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningSleetShowersNightColour {
  private _el: ObiLightningSleetShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSleetShowersNightColourElement>,
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

