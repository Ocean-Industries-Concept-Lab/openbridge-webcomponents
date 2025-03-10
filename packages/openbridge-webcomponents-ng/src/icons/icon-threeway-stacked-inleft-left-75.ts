import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedInleftLeft75 as ObiThreewayStackedInleftLeft75Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-left-75.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-inleft-left-75.js';

@Component({
  selector: 'obi-threeway-stacked-inleft-left-75',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedInleftLeft75 {
  private _el: ObiThreewayStackedInleftLeft75Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedInleftLeft75Element>,
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

