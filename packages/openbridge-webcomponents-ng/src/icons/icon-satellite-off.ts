import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSatelliteOff as ObiSatelliteOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-satellite-off.js';

@Component({
  selector: 'obi-satellite-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSatelliteOff {
  private _el: ObiSatelliteOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSatelliteOffElement>,
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

