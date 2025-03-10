import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorMap as ObiCursorMapElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map.js';

@Component({
  selector: 'obi-cursor-map',
  template: '<ng-content></ng-content>',
})
export class ObiCursorMap {
  private _el: ObiCursorMapElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorMapElement>,
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

