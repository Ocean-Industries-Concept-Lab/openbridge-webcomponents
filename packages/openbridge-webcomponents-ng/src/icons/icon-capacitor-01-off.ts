import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor01Off as ObiCapacitor01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-01-off.js';

@Component({
  selector: 'obi-capacitor-01-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCapacitor01Off {
  private _el: ObiCapacitor01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor01OffElement>,
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

