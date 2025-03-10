import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPartlycloudyNightColour as ObiPartlycloudyNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-partlycloudy-night-colour.js';

@Component({
  selector: 'obi-partlycloudy-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiPartlycloudyNightColour {
  private _el: ObiPartlycloudyNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPartlycloudyNightColourElement>,
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

