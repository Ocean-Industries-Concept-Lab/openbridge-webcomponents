import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerConeDown as ObiBeaconTowerConeDownElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cone-down.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cone-down.js';

@Component({
  selector: 'obi-beacon-tower-cone-down',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconTowerConeDown {
  private _el: ObiBeaconTowerConeDownElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerConeDownElement>,
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

