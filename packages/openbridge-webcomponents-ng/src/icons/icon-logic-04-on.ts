import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic04On as ObiLogic04OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-04-on.js';

@Component({
  selector: 'obi-logic-04-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic04On {
  private _el: ObiLogic04OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic04OnElement>,
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

