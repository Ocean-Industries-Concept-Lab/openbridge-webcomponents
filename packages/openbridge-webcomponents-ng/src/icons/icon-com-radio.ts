import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiComRadio as ObiComRadioElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-radio.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-com-radio.js';

@Component({
  selector: 'obi-com-radio',
  template: '<ng-content></ng-content>',
})
export class ObiComRadio {
  private _el: ObiComRadioElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiComRadioElement>,
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

