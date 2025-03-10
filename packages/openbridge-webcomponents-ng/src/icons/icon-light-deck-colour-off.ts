import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightDeckColourOff as ObiLightDeckColourOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-deck-colour-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-deck-colour-off.js';

@Component({
  selector: 'obi-light-deck-colour-off',
  template: '<ng-content></ng-content>',
})
export class ObiLightDeckColourOff {
  private _el: ObiLightDeckColourOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightDeckColourOffElement>,
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

