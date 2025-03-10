import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiBeaconGeneralSquare as ObiBeaconGeneralSquareElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-square.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-beacon-general-square.js';

@Component({
  selector: 'obi-beacon-general-square',
  template: '<ng-content></ng-content>',
})
export class ObiBeaconGeneralSquare {
  private _el: ObiBeaconGeneralSquareElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiBeaconGeneralSquareElement>,
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

