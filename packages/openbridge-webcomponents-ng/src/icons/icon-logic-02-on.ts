import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic02On as ObiLogic02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-02-on.js';

@Component({
  selector: 'obi-logic-02-on',
  template: '<ng-content></ng-content>',
})
export class ObiLogic02On {
  private _el: ObiLogic02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic02OnElement>,
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

