import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparNorth as ObiBuoySparNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-north.js';

@Component({
  selector: 'obi-buoy-spar-north',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoySparNorth {
  private _el: ObiBuoySparNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparNorthElement>,
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

