import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningRainShowersMon as ObiLightningRainShowersMonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-mon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-showers-mon.js';

@Component({
  selector: 'obi-lightning-rain-showers-mon',
  template: '<ng-content></ng-content>',
})
export class ObiLightningRainShowersMon {
  private _el: ObiLightningRainShowersMonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningRainShowersMonElement>,
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

