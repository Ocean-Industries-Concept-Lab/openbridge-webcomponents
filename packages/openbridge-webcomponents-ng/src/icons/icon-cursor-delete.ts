import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorDelete as ObiCursorDeleteElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-delete.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-delete.js';

@Component({
  selector: 'obi-cursor-delete',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCursorDelete {
  private _el: ObiCursorDeleteElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorDeleteElement>,
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

