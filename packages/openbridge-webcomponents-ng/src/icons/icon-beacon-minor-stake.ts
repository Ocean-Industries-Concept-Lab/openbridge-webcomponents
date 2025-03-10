import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconMinorStake as ObiBeaconMinorStakeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-minor-stake.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-minor-stake.js';

@Component({
  selector: 'obi-beacon-minor-stake',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconMinorStake {
  private _el: ObiBeaconMinorStakeElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconMinorStakeElement>,
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

