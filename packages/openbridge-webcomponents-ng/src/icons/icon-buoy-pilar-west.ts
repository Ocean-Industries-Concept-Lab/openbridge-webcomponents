import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarWest as ObiBuoyPilarWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-west.js';

@Component({
  selector: 'obi-buoy-pilar-west',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyPilarWest {
  private _el: ObiBuoyPilarWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarWestElement>,
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

