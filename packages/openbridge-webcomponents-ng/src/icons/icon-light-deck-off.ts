import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLightDeckOff as ObiLightDeckOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-deck-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-light-deck-off.js';

@Component({
  selector: 'obi-light-deck-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLightDeckOff {
  private _el: ObiLightDeckOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLightDeckOffElement>,
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

