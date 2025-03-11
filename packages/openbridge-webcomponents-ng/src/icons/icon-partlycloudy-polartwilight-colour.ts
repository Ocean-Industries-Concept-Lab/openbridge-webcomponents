import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPartlycloudyPolartwilightColour as ObiPartlycloudyPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-polartwilight-colour.js';

@Component({
  selector: 'obi-partlycloudy-polartwilight-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiPartlycloudyPolartwilightColour {
  private _el: ObiPartlycloudyPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPartlycloudyPolartwilightColourElement>,
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

