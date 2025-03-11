import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorPointer as ObiCursorPointerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointer.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointer.js';

@Component({
  selector: 'obi-cursor-pointer',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorPointer {
  private _el: ObiCursorPointerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorPointerElement>,
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

