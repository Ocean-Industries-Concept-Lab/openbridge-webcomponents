import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic06Off as ObiLogic06OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-06-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-06-off.js';

@Component({
  selector: 'obi-logic-06-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic06Off {
  private _el: ObiLogic06OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic06OffElement>,
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

