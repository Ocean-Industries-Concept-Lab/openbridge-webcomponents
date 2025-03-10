import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiSwitch02Off as ObiSwitch02OffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-02-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-switch-02-off.js';

@Component({
  selector: 'obi-switch-02-off',
  template: '<ng-content></ng-content>',
})
export class ObiSwitch02Off {
  private _el: ObiSwitch02OffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiSwitch02OffElement>,
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

