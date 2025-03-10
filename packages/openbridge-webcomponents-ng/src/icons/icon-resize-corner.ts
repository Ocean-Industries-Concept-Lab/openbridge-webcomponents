import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiResizeCorner as ObiResizeCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-corner.js';

@Component({
  selector: 'obi-resize-corner',
  template: '<ng-content></ng-content>',
})
export class ObiResizeCorner {
  private _el: ObiResizeCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiResizeCornerElement>,
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

