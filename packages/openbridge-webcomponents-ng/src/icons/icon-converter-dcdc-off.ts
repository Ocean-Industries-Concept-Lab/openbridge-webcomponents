import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterDcdcOff as ObiConverterDcdcOffElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcdc-off.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-dcdc-off.js';

@Component({
  selector: 'obi-converter-dcdc-off',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: []
})
export class ObiConverterDcdcOff {
  private _el: ObiConverterDcdcOffElement;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterDcdcOffElement>,
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

