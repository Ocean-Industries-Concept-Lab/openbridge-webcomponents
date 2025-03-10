import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralConeUp as ObiBeaconGeneralConeUpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-cone-up.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-cone-up.js';

@Component({
  selector: 'obi-beacon-general-cone-up',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralConeUp {
  private _el: ObiBeaconGeneralConeUpElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralConeUpElement>,
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

