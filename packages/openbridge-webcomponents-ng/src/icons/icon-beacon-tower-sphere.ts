import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerSphere as ObiBeaconTowerSphereElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-sphere.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-sphere.js';

@Component({
  selector: 'obi-beacon-tower-sphere',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconTowerSphere {
  private _el: ObiBeaconTowerSphereElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerSphereElement>,
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

