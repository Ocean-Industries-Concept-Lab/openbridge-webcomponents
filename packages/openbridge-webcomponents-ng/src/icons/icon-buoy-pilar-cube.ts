import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarCube as ObiBuoyPilarCubeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cube.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-cube.js';

@Component({
  selector: 'obi-buoy-pilar-cube',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarCube {
  private _el: ObiBuoyPilarCubeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarCubeElement>,
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

