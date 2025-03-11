import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic05 as ObiLogic05Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-05.js';

@Component({
  selector: 'obi-logic-05',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic05 {
  private _el: ObiLogic05Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic05Element>,
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

