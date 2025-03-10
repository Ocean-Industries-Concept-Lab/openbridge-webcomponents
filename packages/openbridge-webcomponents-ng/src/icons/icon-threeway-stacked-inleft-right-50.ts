import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedInleftRight50 as ObiThreewayStackedInleftRight50Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-right-50.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-right-50.js';

@Component({
  selector: 'obi-threeway-stacked-inleft-right-50',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedInleftRight50 {
  private _el: ObiThreewayStackedInleftRight50Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedInleftRight50Element>,
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

