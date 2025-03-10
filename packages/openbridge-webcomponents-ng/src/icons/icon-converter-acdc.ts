import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterAcdc as ObiConverterAcdcElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc.js';

@Component({
  selector: 'obi-converter-acdc',
  template: '<ng-content></ng-content>',
})
export class ObiConverterAcdc {
  private _el: ObiConverterAcdcElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterAcdcElement>,
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

