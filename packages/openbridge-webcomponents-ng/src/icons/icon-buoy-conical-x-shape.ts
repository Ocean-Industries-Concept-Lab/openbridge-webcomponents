import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalXShape as ObiBuoyConicalXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-x-shape.js';

@Component({
  selector: 'obi-buoy-conical-x-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalXShape {
  private _el: ObiBuoyConicalXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalXShapeElement>,
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

