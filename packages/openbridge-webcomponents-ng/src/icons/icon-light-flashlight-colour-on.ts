import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightFlashlightColourOn as ObiLightFlashlightColourOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-colour-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-colour-on.js';

@Component({
  selector: 'obi-light-flashlight-colour-on',
  template: '<ng-content></ng-content>',
})
export class ObiLightFlashlightColourOn {
  private _el: ObiLightFlashlightColourOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightFlashlightColourOnElement>,
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

