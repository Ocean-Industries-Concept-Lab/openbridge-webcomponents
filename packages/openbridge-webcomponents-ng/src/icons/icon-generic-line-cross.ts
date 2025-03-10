import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineCross as ObiGenericLineCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-cross.js';

@Component({
  selector: 'obi-generic-line-cross',
  template: '<ng-content></ng-content>',
})
export class ObiGenericLineCross {
  private _el: ObiGenericLineCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineCrossElement>,
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

