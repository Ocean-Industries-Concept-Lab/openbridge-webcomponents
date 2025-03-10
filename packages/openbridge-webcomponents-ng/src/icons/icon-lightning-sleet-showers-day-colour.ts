import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningSleetShowersDayColour as ObiLightningSleetShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-sleet-showers-day-colour.js';

@Component({
  selector: 'obi-lightning-sleet-showers-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningSleetShowersDayColour {
  private _el: ObiLightningSleetShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningSleetShowersDayColourElement>,
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

