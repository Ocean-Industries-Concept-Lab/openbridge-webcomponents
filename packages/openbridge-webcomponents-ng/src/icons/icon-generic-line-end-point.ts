import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineEndPoint as ObiGenericLineEndPointElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-end-point.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-end-point.js';

@Component({
  selector: 'obi-generic-line-end-point',
  template: '<ng-content></ng-content>',
})
export class ObiGenericLineEndPoint {
  private _el: ObiGenericLineEndPointElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineEndPointElement>,
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

