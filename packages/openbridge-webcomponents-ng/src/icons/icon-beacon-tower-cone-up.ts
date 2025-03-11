import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerConeUp as ObiBeaconTowerConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-cone-up.js';

@Component({
  selector: 'obi-beacon-tower-cone-up',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconTowerConeUp {
  private _el: ObiBeaconTowerConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerConeUpElement>,
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

