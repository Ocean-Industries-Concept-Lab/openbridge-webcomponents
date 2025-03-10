import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparWest as ObiBuoySparWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-west.js';

@Component({
  selector: 'obi-buoy-spar-west',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparWest {
  private _el: ObiBuoySparWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparWestElement>,
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

