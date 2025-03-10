import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterDcacOn as ObiConverterDcacOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcac-on.js';

@Component({
  selector: 'obi-converter-dcac-on',
  template: '<ng-content></ng-content>',
})
export class ObiConverterDcacOn {
  private _el: ObiConverterDcacOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterDcacOnElement>,
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

