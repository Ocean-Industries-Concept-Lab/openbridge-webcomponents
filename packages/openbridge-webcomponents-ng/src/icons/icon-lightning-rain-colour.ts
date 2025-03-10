import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningRainColour as ObiLightningRainColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-rain-colour.js';

@Component({
  selector: 'obi-lightning-rain-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningRainColour {
  private _el: ObiLightningRainColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningRainColourElement>,
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

