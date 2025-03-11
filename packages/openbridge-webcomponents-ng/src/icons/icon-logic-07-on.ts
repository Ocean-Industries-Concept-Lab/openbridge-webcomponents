import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic07On as ObiLogic07OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-07-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-07-on.js';

@Component({
  selector: 'obi-logic-07-on',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic07On {
  private _el: ObiLogic07OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic07OnElement>,
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

