import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightFlashlightColourOff as ObiLightFlashlightColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-colour-off.js';

@Component({
  selector: 'obi-light-flashlight-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightFlashlightColourOff {
  private _el: ObiLightFlashlightColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightFlashlightColourOffElement>,
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

