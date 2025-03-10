import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSleetShowersNightColour as ObiSleetShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-sleet-showers-night-colour.js';

@Component({
  selector: 'obi-sleet-showers-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiSleetShowersNightColour {
  private _el: ObiSleetShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSleetShowersNightColourElement>,
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

