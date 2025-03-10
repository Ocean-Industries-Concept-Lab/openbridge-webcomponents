import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySphericalBoard as ObiBuoySphericalBoardElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-board.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spherical-board.js';

@Component({
  selector: 'obi-buoy-spherical-board',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySphericalBoard {
  private _el: ObiBuoySphericalBoardElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySphericalBoardElement>,
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

