import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerNorth as ObiBeaconTowerNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-north.js';

@Component({
  selector: 'obi-beacon-tower-north',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconTowerNorth {
  private _el: ObiBeaconTowerNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerNorthElement>,
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

