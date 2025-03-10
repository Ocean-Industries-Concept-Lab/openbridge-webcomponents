import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor02Off as ObiCapacitor02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02-off.js';

@Component({
  selector: 'obi-capacitor-02-off',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor02Off {
  private _el: ObiCapacitor02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor02OffElement>,
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

