import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRain as ObiLightRainElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain.js';

@Component({
  selector: 'obi-light-rain',
  template: '<ng-content></ng-content>',
})
export class ObiLightRain {
  private _el: ObiLightRainElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainElement>,
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

