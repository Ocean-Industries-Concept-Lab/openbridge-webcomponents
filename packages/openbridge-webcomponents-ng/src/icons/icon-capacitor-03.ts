import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor03 as ObiCapacitor03Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-03.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-03.js';

@Component({
  selector: 'obi-capacitor-03',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor03 {
  private _el: ObiCapacitor03Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor03Element>,
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

