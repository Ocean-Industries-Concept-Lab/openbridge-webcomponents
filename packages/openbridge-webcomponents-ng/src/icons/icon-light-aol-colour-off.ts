import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightAolColourOff as ObiLightAolColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-aol-colour-off.js';

@Component({
  selector: 'obi-light-aol-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightAolColourOff {
  private _el: ObiLightAolColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightAolColourOffElement>,
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

