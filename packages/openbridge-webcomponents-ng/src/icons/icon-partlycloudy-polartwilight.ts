import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPartlycloudyPolartwilight as ObiPartlycloudyPolartwilightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-polartwilight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-polartwilight.js';

@Component({
  selector: 'obi-partlycloudy-polartwilight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPartlycloudyPolartwilight {
  private _el: ObiPartlycloudyPolartwilightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPartlycloudyPolartwilightElement>,
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

