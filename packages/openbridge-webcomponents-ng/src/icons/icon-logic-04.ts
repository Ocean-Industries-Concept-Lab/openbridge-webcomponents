import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic04 as ObiLogic04Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04.js';

@Component({
  selector: 'obi-logic-04',
  template: '<ng-content></ng-content>',
})
export class ObiLogic04 {
  private _el: ObiLogic04Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic04Element>,
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

