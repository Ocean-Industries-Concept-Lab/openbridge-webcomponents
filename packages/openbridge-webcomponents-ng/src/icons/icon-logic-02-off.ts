import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic02Off as ObiLogic02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02-off.js';

@Component({
  selector: 'obi-logic-02-off',
  template: '<ng-content></ng-content>',
})
export class ObiLogic02Off {
  private _el: ObiLogic02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic02OffElement>,
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

