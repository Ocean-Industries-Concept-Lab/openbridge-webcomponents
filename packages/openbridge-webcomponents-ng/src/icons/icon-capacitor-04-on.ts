import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor04On as ObiCapacitor04OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-04-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-04-on.js';

@Component({
  selector: 'obi-capacitor-04-on',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor04On {
  private _el: ObiCapacitor04OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor04OnElement>,
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

