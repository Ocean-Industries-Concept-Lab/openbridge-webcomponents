import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightningLightSnowColour as ObiLightningLightSnowColourElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-colour.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-lightning-light-snow-colour.js';

@Component({
  selector: 'obi-lightning-light-snow-colour',
  template: '<ng-content></ng-content>',
})
export class ObiLightningLightSnowColour {
  private _el: ObiLightningLightSnowColourElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightningLightSnowColourElement>,
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

