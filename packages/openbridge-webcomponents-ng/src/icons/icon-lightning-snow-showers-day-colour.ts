import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSnowShowersDayColour as ObiLightningSnowShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-snow-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-snow-showers-day-colour.js';

@Component({
  selector: 'obi-lightning-snow-showers-day-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningSnowShowersDayColour {
  private _el: ObiLightningSnowShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSnowShowersDayColourElement>,
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

