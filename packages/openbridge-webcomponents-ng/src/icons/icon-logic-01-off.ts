import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic01Off as ObiLogic01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-01-off.js';

@Component({
  selector: 'obi-logic-01-off',
  template: '<ng-content></ng-content>',
})
export class ObiLogic01Off {
  private _el: ObiLogic01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic01OffElement>,
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

