import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanTShape as ObiBuoyCanTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-t-shape.js';

@Component({
  selector: 'obi-buoy-can-t-shape',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyCanTShape {
  private _el: ObiBuoyCanTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanTShapeElement>,
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

