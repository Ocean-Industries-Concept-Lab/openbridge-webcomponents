import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningRainShowersDay as ObiLightningRainShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-day.js';

@Component({
  selector: 'obi-lightning-rain-showers-day',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningRainShowersDay {
  private _el: ObiLightningRainShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningRainShowersDayElement>,
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

