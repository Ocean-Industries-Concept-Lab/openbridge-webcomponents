import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarEast as ObiBuoyPilarEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-east.js';

@Component({
  selector: 'obi-buoy-pilar-east',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarEast {
  private _el: ObiBuoyPilarEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarEastElement>,
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

