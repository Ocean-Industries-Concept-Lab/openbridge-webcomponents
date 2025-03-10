import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarTShape as ObiBuoyPilarTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-t-shape.js';

@Component({
  selector: 'obi-buoy-pilar-t-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyPilarTShape {
  private _el: ObiBuoyPilarTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarTShapeElement>,
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

