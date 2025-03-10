import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireStraight as ObiWireStraightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-straight.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-straight.js';

@Component({
  selector: 'obi-wire-straight',
  template: '<ng-content></ng-content>',
})
export class ObiWireStraight {
  private _el: ObiWireStraightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireStraightElement>,
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

