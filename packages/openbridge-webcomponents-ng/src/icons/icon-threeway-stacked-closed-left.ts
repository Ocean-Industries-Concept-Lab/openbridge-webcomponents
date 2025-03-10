import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedClosedLeft as ObiThreewayStackedClosedLeftElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-left.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-closed-left.js';

@Component({
  selector: 'obi-threeway-stacked-closed-left',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedClosedLeft {
  private _el: ObiThreewayStackedClosedLeftElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedClosedLeftElement>,
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

