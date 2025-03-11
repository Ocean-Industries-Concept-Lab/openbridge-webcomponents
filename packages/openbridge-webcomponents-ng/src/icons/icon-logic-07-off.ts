import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic07Off as ObiLogic07OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-07-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-07-off.js';

@Component({
  selector: 'obi-logic-07-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic07Off {
  private _el: ObiLogic07OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic07OffElement>,
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

