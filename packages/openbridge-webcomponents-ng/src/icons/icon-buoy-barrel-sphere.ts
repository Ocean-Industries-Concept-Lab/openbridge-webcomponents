import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBuoyBarrelSphere as ObiBuoyBarrelSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-buoy-barrel-sphere.js';

@Component({
  selector: 'obi-buoy-barrel-sphere',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBuoyBarrelSphere {
  private _el: ObiBuoyBarrelSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBuoyBarrelSphereElement>,
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

