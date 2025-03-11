import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic01 as ObiLogic01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-01.js';

@Component({
  selector: 'obi-logic-01',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic01 {
  private _el: ObiLogic01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic01Element>,
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

