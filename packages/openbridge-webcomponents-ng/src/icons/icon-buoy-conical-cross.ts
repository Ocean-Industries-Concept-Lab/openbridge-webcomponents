import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalCross as ObiBuoyConicalCrossElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cross.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-cross.js';

@Component({
  selector: 'obi-buoy-conical-cross',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyConicalCross {
  private _el: ObiBuoyConicalCrossElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalCrossElement>,
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

