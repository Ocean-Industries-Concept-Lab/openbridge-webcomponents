import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningRainShowersDayColour as ObiLightningRainShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-day-colour.js';

@Component({
  selector: 'obi-lightning-rain-showers-day-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningRainShowersDayColour {
  private _el: ObiLightningRainShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningRainShowersDayColourElement>,
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

