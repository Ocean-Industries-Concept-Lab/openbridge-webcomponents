import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRainShowersSun as ObiLightRainShowersSunElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-sun.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-showers-sun.js';

@Component({
  selector: 'obi-light-rain-showers-sun',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRainShowersSun {
  private _el: ObiLightRainShowersSunElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainShowersSunElement>,
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

