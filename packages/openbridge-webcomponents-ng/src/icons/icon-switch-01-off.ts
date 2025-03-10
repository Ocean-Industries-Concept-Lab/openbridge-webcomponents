import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch01Off as ObiSwitch01OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-01-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-01-off.js';

@Component({
  selector: 'obi-switch-01-off',
  template: '<ng-content></ng-content>',
})
export class ObiSwitch01Off {
  private _el: ObiSwitch01OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch01OffElement>,
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

