import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralEast as ObiBeaconGeneralEastElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-east.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-east.js';

@Component({
  selector: 'obi-beacon-general-east',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralEast {
  private _el: ObiBeaconGeneralEastElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralEastElement>,
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

