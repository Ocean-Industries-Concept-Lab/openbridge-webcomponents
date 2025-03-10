import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalCube as ObiBuoyConicalCubeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cube.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cube.js';

@Component({
  selector: 'obi-buoy-conical-cube',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalCube {
  private _el: ObiBuoyConicalCubeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalCubeElement>,
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

