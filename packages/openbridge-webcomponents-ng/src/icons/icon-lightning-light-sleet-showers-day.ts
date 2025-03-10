import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSleetShowersDay as ObiLightningLightSleetShowersDayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-day.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-sleet-showers-day.js';

@Component({
  selector: 'obi-lightning-light-sleet-showers-day',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSleetShowersDay {
  private _el: ObiLightningLightSleetShowersDayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSleetShowersDayElement>,
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

