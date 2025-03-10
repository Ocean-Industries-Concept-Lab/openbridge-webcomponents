import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic02 as ObiLogic02Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02.js';

@Component({
  selector: 'obi-logic-02',
  template: '<ng-content></ng-content>',
})
export class ObiLogic02 {
  private _el: ObiLogic02Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic02Element>,
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

