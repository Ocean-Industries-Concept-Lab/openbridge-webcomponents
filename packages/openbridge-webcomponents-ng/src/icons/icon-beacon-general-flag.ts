import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralFlag as ObiBeaconGeneralFlagElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-flag.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-flag.js';

@Component({
  selector: 'obi-beacon-general-flag',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralFlag {
  private _el: ObiBeaconGeneralFlagElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralFlagElement>,
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

