import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoySparSphere as ObiBuoySparSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-spar-sphere.js';

@Component({
  selector: 'obi-buoy-spar-sphere',
  template: '<ng-content></ng-content>',
})
export class ObiBuoySparSphere {
  private _el: ObiBuoySparSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoySparSphereElement>,
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

