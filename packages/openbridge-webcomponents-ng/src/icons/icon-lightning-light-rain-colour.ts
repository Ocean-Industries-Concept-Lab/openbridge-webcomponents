import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightRainColour as ObiLightningLightRainColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-rain-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-rain-colour.js';

@Component({
  selector: 'obi-lightning-light-rain-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightRainColour {
  private _el: ObiLightningLightRainColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightRainColourElement>,
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

