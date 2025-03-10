import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightLanternStbdColourOff as ObiLightLanternStbdColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-lantern-stbd-colour-off.js';

@Component({
  selector: 'obi-light-lantern-stbd-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightLanternStbdColourOff {
  private _el: ObiLightLanternStbdColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightLanternStbdColourOffElement>,
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

