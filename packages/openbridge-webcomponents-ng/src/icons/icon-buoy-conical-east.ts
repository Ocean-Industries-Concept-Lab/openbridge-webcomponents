import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalEast as ObiBuoyConicalEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-east.js';

@Component({
  selector: 'obi-buoy-conical-east',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyConicalEast {
  private _el: ObiBuoyConicalEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalEastElement>,
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

