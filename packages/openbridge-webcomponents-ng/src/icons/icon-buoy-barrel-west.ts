import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelWest as ObiBuoyBarrelWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-west.js';

@Component({
  selector: 'obi-buoy-barrel-west',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyBarrelWest {
  private _el: ObiBuoyBarrelWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelWestElement>,
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

