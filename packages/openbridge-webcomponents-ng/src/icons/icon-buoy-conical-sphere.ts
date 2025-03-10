import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyConicalSphere as ObiBuoyConicalSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-conical-sphere.js';

@Component({
  selector: 'obi-buoy-conical-sphere',
  template: '<ng-content></ng-content>',
})
export class ObiBuoyConicalSphere {
  private _el: ObiBuoyConicalSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyConicalSphereElement>,
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

