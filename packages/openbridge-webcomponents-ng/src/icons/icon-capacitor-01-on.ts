import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor01On as ObiCapacitor01OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01-on.js';

@Component({
  selector: 'obi-capacitor-01-on',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor01On {
  private _el: ObiCapacitor01OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor01OnElement>,
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

