import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic05On as ObiLogic05OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05-on.js';

@Component({
  selector: 'obi-logic-05-on',
  template: '<ng-content></ng-content>',
})
export class ObiLogic05On {
  private _el: ObiLogic05OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic05OnElement>,
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

