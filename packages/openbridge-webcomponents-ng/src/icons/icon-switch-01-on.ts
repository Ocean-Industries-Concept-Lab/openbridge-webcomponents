import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch01On as ObiSwitch01OnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-01-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-01-on.js';

@Component({
  selector: 'obi-switch-01-on',
  template: '<ng-content></ng-content>',
})
export class ObiSwitch01On {
  private _el: ObiSwitch01OnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch01OnElement>,
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

