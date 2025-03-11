import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRainColour as ObiLightRainColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-rain-colour.js';

@Component({
  selector: 'obi-light-rain-colour',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightRainColour {
  private _el: ObiLightRainColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRainColourElement>,
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

