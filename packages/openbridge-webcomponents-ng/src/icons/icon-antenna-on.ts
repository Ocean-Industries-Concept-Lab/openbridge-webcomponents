import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiAntennaOn as ObiAntennaOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-antenna-on.js';

@Component({
  selector: 'obi-antenna-on',
  template: '<ng-content></ng-content>',
})
export class ObiAntennaOn {
  private _el: ObiAntennaOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiAntennaOnElement>,
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

