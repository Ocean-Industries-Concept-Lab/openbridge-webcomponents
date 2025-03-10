import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightSleetShowersNightColour as ObiLightSleetShowersNightColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet-showers-night-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-sleet-showers-night-colour.js';

@Component({
  selector: 'obi-light-sleet-showers-night-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightSleetShowersNightColour {
  private _el: ObiLightSleetShowersNightColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightSleetShowersNightColourElement>,
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

