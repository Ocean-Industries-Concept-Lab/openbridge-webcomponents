import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCursorMapIec as ObiCursorMapIecElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map-iec.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-cursor-map-iec.js';

@Component({
  selector: 'obi-cursor-map-iec',
  template: '<ng-content></ng-content>',
})
export class ObiCursorMapIec {
  private _el: ObiCursorMapIecElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCursorMapIecElement>,
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

