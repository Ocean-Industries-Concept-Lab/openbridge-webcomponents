import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiGenericLineCorner as ObiGenericLineCornerElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-corner.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-generic-line-corner.js';

@Component({
  selector: 'obi-generic-line-corner',
  template: '<ng-content></ng-content>',
})
export class ObiGenericLineCorner {
  private _el: ObiGenericLineCornerElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiGenericLineCornerElement>,
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

