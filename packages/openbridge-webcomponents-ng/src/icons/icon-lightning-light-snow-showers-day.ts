import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSnowShowersDay as ObiLightningLightSnowShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-showers-day.js';

@Component({
  selector: 'obi-lightning-light-snow-showers-day',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightningLightSnowShowersDay {
  private _el: ObiLightningLightSnowShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSnowShowersDayElement>,
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

