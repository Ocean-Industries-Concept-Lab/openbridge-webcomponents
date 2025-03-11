import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyPilarSphere as ObiBuoyPilarSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-pilar-sphere.js';

@Component({
  selector: 'obi-buoy-pilar-sphere',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyPilarSphere {
  private _el: ObiBuoyPilarSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyPilarSphereElement>,
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

