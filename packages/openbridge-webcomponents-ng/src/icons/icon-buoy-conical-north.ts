import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalNorth as ObiBuoyConicalNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-north.js';

@Component({
  selector: 'obi-buoy-conical-north',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyConicalNorth {
  private _el: ObiBuoyConicalNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalNorthElement>,
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

