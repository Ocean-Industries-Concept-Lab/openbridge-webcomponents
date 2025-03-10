import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerWest as ObiBeaconTowerWestElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-west.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-west.js';

@Component({
  selector: 'obi-beacon-tower-west',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconTowerWest {
  private _el: ObiBeaconTowerWestElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerWestElement>,
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

