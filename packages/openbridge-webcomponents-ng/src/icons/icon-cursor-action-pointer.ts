import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorActionPointer as ObiCursorActionPointerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-action-pointer.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-action-pointer.js';

@Component({
  selector: 'obi-cursor-action-pointer',
  template: '<ng-content></ng-content>',
})
export class ObiCursorActionPointer {
  private _el: ObiCursorActionPointerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorActionPointerElement>,
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

