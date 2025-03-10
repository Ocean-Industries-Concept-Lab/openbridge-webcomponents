import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterAcdcOn as ObiConverterAcdcOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc-on.js';

@Component({
  selector: 'obi-converter-acdc-on',
  template: '<ng-content></ng-content>',
})
export class ObiConverterAcdcOn {
  private _el: ObiConverterAcdcOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterAcdcOnElement>,
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

