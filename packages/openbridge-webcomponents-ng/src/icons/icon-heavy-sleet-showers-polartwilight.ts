import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiHeavySleetShowersPolartwilight as ObiHeavySleetShowersPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-heavy-sleet-showers-polartwilight.js';

@Component({
  selector: 'obi-heavy-sleet-showers-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiHeavySleetShowersPolartwilight {
  private _el: ObiHeavySleetShowersPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiHeavySleetShowersPolartwilightElement>,
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

