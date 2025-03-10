import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic05Off as ObiLogic05OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05-off.js';

@Component({
  selector: 'obi-logic-05-off',
  template: '<ng-content></ng-content>',
})
export class ObiLogic05Off {
  private _el: ObiLogic05OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic05OffElement>,
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

