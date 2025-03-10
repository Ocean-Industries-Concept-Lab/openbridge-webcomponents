import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiWifistrengt4Google as ObiWifistrengt4GoogleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-4-google.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-wifistrengt-4-google.js';

@Component({
  selector: 'obi-wifistrengt-4-google',
  template: '<ng-content></ng-content>',
})
export class ObiWifistrengt4Google {
  private _el: ObiWifistrengt4GoogleElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiWifistrengt4GoogleElement>,
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

