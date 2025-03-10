import {
  Component,
  ElementRef,
  NgZone,
  Input

} from '@angular/core';


import type {ObiConverterFilter1 as ObiConverterFilter1Element} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-filter-1.js';
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-converter-filter-1.js';

@Component({
  selector: 'obi-converter-filter-1',
  template: '<ng-content></ng-content>',
})
export class ObiConverterFilter1 {
  private _el: ObiConverterFilter1Element;
  private _ngZone: NgZone;

  constructor(
    e: ElementRef<ObiConverterFilter1Element>,
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

