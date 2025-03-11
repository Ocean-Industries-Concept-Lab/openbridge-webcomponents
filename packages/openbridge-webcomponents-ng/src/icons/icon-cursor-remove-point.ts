import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorRemovePoint as ObiCursorRemovePointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-remove-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-remove-point.js';

@Component({
  selector: 'obi-cursor-remove-point',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorRemovePoint {
  private _el: ObiCursorRemovePointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorRemovePointElement>,
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

