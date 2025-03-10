import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorActionPointerIcon as ObiCursorActionPointerIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-action-pointer-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-action-pointer-icon.js';

@Component({
  selector: 'obi-cursor-action-pointer-icon',
  template: '<ng-content></ng-content>',
})
export class ObiCursorActionPointerIcon {
  private _el: ObiCursorActionPointerIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorActionPointerIconElement>,
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

