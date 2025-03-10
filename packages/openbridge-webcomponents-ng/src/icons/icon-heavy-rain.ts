import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavyRain as ObiHeavyRainElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-rain.js';

@Component({
  selector: 'obi-heavy-rain',
  template: '<ng-content></ng-content>',
})
export class ObiHeavyRain {
  private _el: ObiHeavyRainElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavyRainElement>,
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

