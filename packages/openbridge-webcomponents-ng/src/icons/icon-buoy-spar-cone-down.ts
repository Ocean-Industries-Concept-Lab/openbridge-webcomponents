import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparConeDown as ObiBuoySparConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-cone-down.js';

@Component({
  selector: 'obi-buoy-spar-cone-down',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparConeDown {
  private _el: ObiBuoySparConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparConeDownElement>,
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

