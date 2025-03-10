import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctEndPoint as ObiDuctEndPointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-end-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-end-point.js';

@Component({
  selector: 'obi-duct-end-point',
  template: '<ng-content></ng-content>',
})
export class ObiDuctEndPoint {
  private _el: ObiDuctEndPointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctEndPointElement>,
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

