import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparXShape as ObiBuoySparXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-x-shape.js';

@Component({
  selector: 'obi-buoy-spar-x-shape',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparXShape {
  private _el: ObiBuoySparXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparXShapeElement>,
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

