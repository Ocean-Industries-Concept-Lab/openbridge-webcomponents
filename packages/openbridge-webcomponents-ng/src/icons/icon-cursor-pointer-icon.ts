import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorPointerIcon as ObiCursorPointerIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointer-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointer-icon.js';

@Component({
  selector: 'obi-cursor-pointer-icon',
  template: '<ng-content></ng-content>',
})
export class ObiCursorPointerIcon {
  private _el: ObiCursorPointerIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorPointerIconElement>,
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

