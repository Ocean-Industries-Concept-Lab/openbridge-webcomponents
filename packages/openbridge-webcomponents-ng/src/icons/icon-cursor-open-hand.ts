import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorOpenHand as ObiCursorOpenHandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-open-hand.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-open-hand.js';

@Component({
  selector: 'obi-cursor-open-hand',
  template: '<ng-content></ng-content>',
})
export class ObiCursorOpenHand {
  private _el: ObiCursorOpenHandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorOpenHandElement>,
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

