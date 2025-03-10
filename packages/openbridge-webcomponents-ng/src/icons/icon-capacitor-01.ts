import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor01 as ObiCapacitor01Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01.js';

@Component({
  selector: 'obi-capacitor-01',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor01 {
  private _el: ObiCapacitor01Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor01Element>,
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

