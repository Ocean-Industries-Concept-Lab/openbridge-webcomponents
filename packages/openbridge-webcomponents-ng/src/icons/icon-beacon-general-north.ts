import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralNorth as ObiBeaconGeneralNorthElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-north.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-north.js';

@Component({
  selector: 'obi-beacon-general-north',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiBeaconGeneralNorth {
  private _el: ObiBeaconGeneralNorthElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralNorthElement>,
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

