import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightRoofColourOff as ObiLightRoofColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-roof-colour-off.js';

@Component({
  selector: 'obi-light-roof-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightRoofColourOff {
  private _el: ObiLightRoofColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightRoofColourOffElement>,
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

