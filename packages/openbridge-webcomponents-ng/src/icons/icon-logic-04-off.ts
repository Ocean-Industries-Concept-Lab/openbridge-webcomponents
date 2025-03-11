import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic04Off as ObiLogic04OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04-off.js';

@Component({
  selector: 'obi-logic-04-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic04Off {
  private _el: ObiLogic04OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic04OffElement>,
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

