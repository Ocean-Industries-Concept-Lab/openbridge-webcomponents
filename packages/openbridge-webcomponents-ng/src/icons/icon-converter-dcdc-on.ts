import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterDcdcOn as ObiConverterDcdcOnElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcdc-on.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcdc-on.js';

@Component({
  selector: 'obi-converter-dcdc-on',
  template: '<ng-content></ng-content>',
})
export class ObiConverterDcdcOn {
  private _el: ObiConverterDcdcOnElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterDcdcOnElement>,
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

