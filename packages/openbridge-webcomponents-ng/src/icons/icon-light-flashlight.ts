import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightFlashlight as ObiLightFlashlightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-flashlight.js';

@Component({
  selector: 'obi-light-flashlight',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightFlashlight {
  private _el: ObiLightFlashlightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightFlashlightElement>,
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

