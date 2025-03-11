import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiLogic06 as ObiLogic06Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-06.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-logic-06.js';

@Component({
  selector: 'obi-logic-06',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiLogic06 {
  private _el: ObiLogic06Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiLogic06Element>,
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

