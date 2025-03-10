import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterDcacOff as ObiConverterDcacOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac-off.js';

@Component({
  selector: 'obi-converter-dcac-off',
  template: '<ng-content></ng-content>',
})
export class ObiConverterDcacOff {
  private _el: ObiConverterDcacOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterDcacOffElement>,
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

