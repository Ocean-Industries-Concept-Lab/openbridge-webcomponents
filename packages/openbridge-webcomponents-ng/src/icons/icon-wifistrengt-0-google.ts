import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifistrengt0Google as ObiWifistrengt0GoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-0-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-0-google.js';

@Component({
  selector: 'obi-wifistrengt-0-google',
  template: '<ng-content></ng-content>',
})
export class ObiWifistrengt0Google {
  private _el: ObiWifistrengt0GoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifistrengt0GoogleElement>,
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

