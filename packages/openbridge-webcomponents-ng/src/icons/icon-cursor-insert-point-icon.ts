import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorInsertPointIcon as ObiCursorInsertPointIconElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-insert-point-icon.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-insert-point-icon.js';

@Component({
  selector: 'obi-cursor-insert-point-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorInsertPointIcon {
  private _el: ObiCursorInsertPointIconElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorInsertPointIconElement>,
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

