import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiRainShowersDayColour as ObiRainShowersDayColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-day-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-rain-showers-day-colour.js';

@Component({
  selector: 'obi-rain-showers-day-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiRainShowersDayColour {
  private _el: ObiRainShowersDayColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiRainShowersDayColourElement>,
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

