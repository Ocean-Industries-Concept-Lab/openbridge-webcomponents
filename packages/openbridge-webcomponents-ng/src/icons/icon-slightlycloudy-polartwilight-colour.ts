import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSlightlycloudyPolartwilightColour as ObiSlightlycloudyPolartwilightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-polartwilight-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-slightlycloudy-polartwilight-colour.js';

@Component({
  selector: 'obi-slightlycloudy-polartwilight-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiSlightlycloudyPolartwilightColour {
  private _el: ObiSlightlycloudyPolartwilightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSlightlycloudyPolartwilightColourElement>,
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

