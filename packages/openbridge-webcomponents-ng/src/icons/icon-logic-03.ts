import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic03 as ObiLogic03Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-03.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-03.js';

@Component({
  selector: 'obi-logic-03',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic03 {
  private _el: ObiLogic03Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic03Element>,
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

