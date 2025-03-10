import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor04 as ObiCapacitor04Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-04.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-04.js';

@Component({
  selector: 'obi-capacitor-04',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor04 {
  private _el: ObiCapacitor04Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor04Element>,
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

