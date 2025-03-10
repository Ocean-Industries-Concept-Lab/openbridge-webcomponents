import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSlightlycloudyPolartwilight as ObiSlightlycloudyPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-polartwilight.js';

@Component({
  selector: 'obi-slightlycloudy-polartwilight',
  template: '<ng-content></ng-content>',
})
export class ObiSlightlycloudyPolartwilight {
  private _el: ObiSlightlycloudyPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSlightlycloudyPolartwilightElement>,
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

