import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedInleftBottom50 as ObiThreewayStackedInleftBottom50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-bottom-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-bottom-50.js';

@Component({
  selector: 'obi-threeway-stacked-inleft-bottom-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedInleftBottom50 {
  private _el: ObiThreewayStackedInleftBottom50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedInleftBottom50Element>,
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

