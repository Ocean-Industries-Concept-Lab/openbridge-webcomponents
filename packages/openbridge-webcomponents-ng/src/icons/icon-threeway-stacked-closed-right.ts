import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedClosedRight as ObiThreewayStackedClosedRightElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-right.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-right.js';

@Component({
  selector: 'obi-threeway-stacked-closed-right',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedClosedRight {
  private _el: ObiThreewayStackedClosedRightElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedClosedRightElement>,
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

