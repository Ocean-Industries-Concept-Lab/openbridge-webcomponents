import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorClosedHandIcon as ObiCursorClosedHandIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-closed-hand-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-closed-hand-icon.js';

@Component({
  selector: 'obi-cursor-closed-hand-icon',
  template: '<ng-content></ng-content>',
})
export class ObiCursorClosedHandIcon {
  private _el: ObiCursorClosedHandIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorClosedHandIconElement>,
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

