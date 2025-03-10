import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedClosedBottom as ObiThreewayStackedClosedBottomElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-bottom.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-bottom.js';

@Component({
  selector: 'obi-threeway-stacked-closed-bottom',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedClosedBottom {
  private _el: ObiThreewayStackedClosedBottomElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedClosedBottomElement>,
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

