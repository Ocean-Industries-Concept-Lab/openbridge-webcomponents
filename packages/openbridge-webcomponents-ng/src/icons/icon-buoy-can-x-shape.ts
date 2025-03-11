import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyCanXShape as ObiBuoyCanXShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-x-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-can-x-shape.js';

@Component({
  selector: 'obi-buoy-can-x-shape',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyCanXShape {
  private _el: ObiBuoyCanXShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyCanXShapeElement>,
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

