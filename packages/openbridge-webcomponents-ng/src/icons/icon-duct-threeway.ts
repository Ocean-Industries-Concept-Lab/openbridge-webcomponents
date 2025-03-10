import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiDuctThreeway as ObiDuctThreewayElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-threeway.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-duct-threeway.js';

@Component({
  selector: 'obi-duct-threeway',
  template: '<ng-content></ng-content>',
})
export class ObiDuctThreeway {
  private _el: ObiDuctThreewayElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiDuctThreewayElement>,
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

