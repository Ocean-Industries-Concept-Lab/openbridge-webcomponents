import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorDraw as ObiCursorDrawElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-draw.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-draw.js';

@Component({
  selector: 'obi-cursor-draw',
  template: '<ng-content></ng-content>',
})
export class ObiCursorDraw {
  private _el: ObiCursorDrawElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorDrawElement>,
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

