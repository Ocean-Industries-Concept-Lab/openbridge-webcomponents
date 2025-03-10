import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternOnColourOff as ObiLightLanternOnColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-on-colour-off.js';

@Component({
  selector: 'obi-light-lantern-on-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternOnColourOff {
  private _el: ObiLightLanternOnColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternOnColourOffElement>,
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

