import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparCube as ObiBuoySparCubeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cube.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cube.js';

@Component({
  selector: 'obi-buoy-spar-cube',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparCube {
  private _el: ObiBuoySparCubeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparCubeElement>,
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

