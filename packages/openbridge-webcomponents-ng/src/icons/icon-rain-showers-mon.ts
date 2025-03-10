import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRainShowersMon as ObiRainShowersMonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-mon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-mon.js';

@Component({
  selector: 'obi-rain-showers-mon',
  template: '<ng-content></ng-content>',
})
export class ObiRainShowersMon {
  private _el: ObiRainShowersMonElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRainShowersMonElement>,
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

