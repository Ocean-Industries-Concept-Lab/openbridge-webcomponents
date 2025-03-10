import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiTemperature as ObiTemperatureElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temperature.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temperature.js';

@Component({
  selector: 'obi-temperature',
  template: '<ng-content></ng-content>',
})
export class ObiTemperature {
  private _el: ObiTemperatureElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiTemperatureElement>,
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

