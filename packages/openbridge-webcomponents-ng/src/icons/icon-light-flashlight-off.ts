import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightFlashlightOff as ObiLightFlashlightOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight-off.js';

@Component({
  selector: 'obi-light-flashlight-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightFlashlightOff {
  private _el: ObiLightFlashlightOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightFlashlightOffElement>,
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

