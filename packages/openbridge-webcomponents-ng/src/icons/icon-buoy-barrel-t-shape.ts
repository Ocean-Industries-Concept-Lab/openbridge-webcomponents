import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelTShape as ObiBuoyBarrelTShapeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-t-shape.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-t-shape.js';

@Component({
  selector: 'obi-buoy-barrel-t-shape',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyBarrelTShape {
  private _el: ObiBuoyBarrelTShapeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelTShapeElement>,
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

