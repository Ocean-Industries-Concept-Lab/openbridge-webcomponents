import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerCube as ObiBeaconTowerCubeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cube.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cube.js';

@Component({
  selector: 'obi-beacon-tower-cube',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconTowerCube {
  private _el: ObiBeaconTowerCubeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerCubeElement>,
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

