import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiCapacitor02On as ObiCapacitor02OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-capacitor-02-on.js';

@Component({
  selector: 'obi-capacitor-02-on',
  template: '<ng-content></ng-content>',
})
export class ObiCapacitor02On {
  private _el: ObiCapacitor02OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiCapacitor02OnElement>,
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

