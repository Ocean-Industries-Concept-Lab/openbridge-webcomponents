import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiThreewayStackedOpen as ObiThreewayStackedOpenElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-open.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-threeway-stacked-open.js';

@Component({
  selector: 'obi-threeway-stacked-open',
  template: '<ng-content></ng-content>',
})
export class ObiThreewayStackedOpen {
  private _el: ObiThreewayStackedOpenElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiThreewayStackedOpenElement>,
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

