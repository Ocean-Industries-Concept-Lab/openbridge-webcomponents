import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntennaOff as ObiAntennaOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-off.js';

@Component({
  selector: 'obi-antenna-off',
  template: '<ng-content></ng-content>',
})
export class ObiAntennaOff {
  private _el: ObiAntennaOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntennaOffElement>,
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

