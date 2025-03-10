import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSleetShowersDayColour as ObiLightningLightSleetShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-day-colour.js';

@Component({
  selector: 'obi-lightning-light-sleet-showers-day-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSleetShowersDayColour {
  private _el: ObiLightningLightSleetShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSleetShowersDayColourElement>,
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

