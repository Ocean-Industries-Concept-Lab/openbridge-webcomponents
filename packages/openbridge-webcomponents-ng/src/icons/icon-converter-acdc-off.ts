import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterAcdcOff as ObiConverterAcdcOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-acdc-off.js';

@Component({
  selector: 'obi-converter-acdc-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConverterAcdcOff {
  private _el: ObiConverterAcdcOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterAcdcOffElement>,
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

