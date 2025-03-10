import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconTowerSquare as ObiBeaconTowerSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-tower-square.js';

@Component({
  selector: 'obi-beacon-tower-square',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconTowerSquare {
  private _el: ObiBeaconTowerSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconTowerSquareElement>,
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

