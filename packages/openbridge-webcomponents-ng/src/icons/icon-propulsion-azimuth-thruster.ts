import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiPropulsionAzimuthThruster as ObiPropulsionAzimuthThrusterElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-azimuth-thruster.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-propulsion-azimuth-thruster.js';

@Component({
  selector: 'obi-propulsion-azimuth-thruster',
  template: '<ng-content></ng-content>',
})
export class ObiPropulsionAzimuthThruster {
  private _el: ObiPropulsionAzimuthThrusterElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiPropulsionAzimuthThrusterElement>,
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

