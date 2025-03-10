import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorPointingHandIcon as ObiCursorPointingHandIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointing-hand-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-pointing-hand-icon.js';

@Component({
  selector: 'obi-cursor-pointing-hand-icon',
  template: '<ng-content></ng-content>',
})
export class ObiCursorPointingHandIcon {
  private _el: ObiCursorPointingHandIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorPointingHandIconElement>,
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

