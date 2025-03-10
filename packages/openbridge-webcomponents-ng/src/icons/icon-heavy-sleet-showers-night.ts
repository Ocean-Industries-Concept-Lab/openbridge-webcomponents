import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleetShowersNight as ObiHeavySleetShowersNightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-night.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-night.js';

@Component({
  selector: 'obi-heavy-sleet-showers-night',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySleetShowersNight {
  private _el: ObiHeavySleetShowersNightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetShowersNightElement>,
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

