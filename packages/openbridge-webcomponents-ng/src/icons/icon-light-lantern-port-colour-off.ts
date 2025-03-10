import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternPortColourOff as ObiLightLanternPortColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-port-colour-off.js';

@Component({
  selector: 'obi-light-lantern-port-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternPortColourOff {
  private _el: ObiLightLanternPortColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternPortColourOffElement>,
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

