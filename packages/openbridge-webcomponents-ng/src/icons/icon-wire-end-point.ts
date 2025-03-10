import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWireEndPoint as ObiWireEndPointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-end-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wire-end-point.js';

@Component({
  selector: 'obi-wire-end-point',
  template: '<ng-content></ng-content>',
})
export class ObiWireEndPoint {
  private _el: ObiWireEndPointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWireEndPointElement>,
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

