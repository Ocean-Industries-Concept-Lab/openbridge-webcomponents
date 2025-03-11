import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorClosedHand as ObiCursorClosedHandElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-closed-hand.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-closed-hand.js';

@Component({
  selector: 'obi-cursor-closed-hand',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorClosedHand {
  private _el: ObiCursorClosedHandElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorClosedHandElement>,
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

