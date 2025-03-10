import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparConeUp as ObiBuoySparConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cone-up.js';

@Component({
  selector: 'obi-buoy-spar-cone-up',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparConeUp {
  private _el: ObiBuoySparConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparConeUpElement>,
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

