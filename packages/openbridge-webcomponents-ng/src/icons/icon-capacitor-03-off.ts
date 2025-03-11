import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor03Off as ObiCapacitor03OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-03-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-03-off.js';

@Component({
  selector: 'obi-capacitor-03-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiCapacitor03Off {
  private _el: ObiCapacitor03OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor03OffElement>,
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

