import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorInsertPoint as ObiCursorInsertPointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-insert-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-insert-point.js';

@Component({
  selector: 'obi-cursor-insert-point',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorInsertPoint {
  private _el: ObiCursorInsertPointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorInsertPointElement>,
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

