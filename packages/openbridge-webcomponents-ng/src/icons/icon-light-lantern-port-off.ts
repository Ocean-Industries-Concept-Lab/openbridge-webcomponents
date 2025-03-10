import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternPortOff as ObiLightLanternPortOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port-off.js';

@Component({
  selector: 'obi-light-lantern-port-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternPortOff {
  private _el: ObiLightLanternPortOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternPortOffElement>,
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

